import { getSession } from "@auth0/nextjs-auth0"
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
	const response = new NextResponse()
	try {
		const session = await getSession(req, response)
		console.log({ session })
		if (!session || !session?.user || !session.user.sub) {
			throw new Error("User session not found")
		}
		const userRoles =
			session?.user[process.env.AUTH0_NAMESPACE + "/roles"] || []
		return NextResponse.json(userRoles, response)
	} catch (error) {
		console.log({ error })
		return NextResponse.json([], response)
	}
}
