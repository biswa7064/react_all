import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"
import { useMemo } from "react"

const routes = {
	loggedIn: "/api/auth/login?returnTo=/profile"
}
export default function withAuth(Component: React.ComponentType) {
	return function AuthComponent<PT extends Record<string, unknown>>(props: PT) {
		const { user, isLoading } = useUser()
		const isUserFound = useMemo(
			() => !isLoading && Boolean(user),
			[user, isLoading]
		)
		return (
			<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
				{isLoading ? (
					<div className="flex items-center justify-center w-full h-screen text-blue-600 text-xl">
						Loading...
					</div>
				) : !isUserFound ? (
					<div className="flex flex-col items-center justify-center w-full h-screen text-red-600 text-xl">
						<h1>Access Denied</h1>
						<p>You must be signed in to view this page</p>
						<Link href={routes.loggedIn}>
							<button
								type="button"
								disabled={isLoading}
								className={`px-5 py-1 mt-2 ${"bg-blue-600 hover:bg-blue-700"} text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
							>
								Login
							</button>
						</Link>
					</div>
				) : (
					<Component {...props} />
				)}
			</div>
		)
	}
}
