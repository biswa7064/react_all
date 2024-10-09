"use client"
import { useAuthContext, UserRole } from "@/context/AuthContext"
import { UserRoles } from "@/utils/constants"
import Link from "next/link"
import { useMemo } from "react"

export default function Navbar() {
	const { user, logout } = useAuthContext()
	const isValidLogin = useMemo(() => {
		const validRoles = Object.keys(UserRoles).filter((i) => i !== "guest")
		return validRoles.includes(user?.role)
	}, [user?.role])
	return (
		<nav className="bg-gray-800 p-4">
			<div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
				<div className="text-white font-bold text-xl mb-4 sm:mb-0">
					<Link href="/">MyApp</Link>
				</div>
				<ul className="flex space-x-4 items-center">
					<li>
						<Link
							href="/dashboard"
							className="text-gray-300 hover:text-white transition duration-300"
						>
							Dashboard
						</Link>
					</li>
					<li>
						<Link
							href="/profile"
							className="text-gray-300 hover:text-white transition duration-300"
						>
							Profile
						</Link>
					</li>
					<li>
						<Link
							href="/settings"
							className="text-gray-300 hover:text-white transition duration-300"
						>
							Settings
						</Link>
					</li>
					{isValidLogin ? (
						<li>
							<button
								type="button"
								onClick={logout}
								className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
							>
								Logout
							</button>
						</li>
					) : (
						<li>
							<Link
								href="/login"
								className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
							>
								Login
							</Link>
						</li>
					)}
				</ul>
			</div>
		</nav>
	)
}
