// app/api/auth/[auth0]/route.js
import {
	AfterCallbackAppRoute,
	handleAuth,
	handleCallback,
	handleLogin,
	handleLogout
} from "@auth0/nextjs-auth0"
import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
// can use for server actions like store in localstorage,session and all.
const afterCallback: AfterCallbackAppRoute = async (_req, session) => {
	// Edit the session here
	return session
}
export const GET = handleAuth({
	custom_logout: handleLogout({ returnTo: "/" }),
	custom_login: handleLogin({ returnTo: "/profile/customs" }),
	// success callback method
	async callback(req: NextApiRequest, ctx: NextApiResponse) {
		const res = (await handleCallback(req, ctx, {
			afterCallback
		})) as NextResponse
		const userExists = false
		if (!userExists) {
			// Redirect user to onboarding page
			const url = new URL(res.headers.get("location") as string)
			const returnTo = url.searchParams.get("returnTo")
			if (returnTo) {
				const url = new URL(returnTo)
				const rel = url.toString().substring(url.origin.length)
				res.headers.set("location", `/profile?returnTo=${rel}`)
			} else {
				res.headers.set("location", "/profile")
			}
		}
		return res
	}
})
