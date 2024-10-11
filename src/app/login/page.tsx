"use client"
import { useAuthContext, UserRole } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
export default function LoginPage() {
	const { login, logout } = useAuthContext()
	const [isLoggingOut, setIsLoggingOut] = useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()
	const [returnUrl, setReturnUrl] = useState("")
	useEffect(() => {
		const params = new URLSearchParams(searchParams)
		const returnUrlParam = params.get("returnUrl")
		setReturnUrl(returnUrlParam || "/")
	}, [searchParams])
	const handleLogin = (role: UserRole) => {
		// Here you would typically handle the login logic
		console.log(`Logging in as ${role}`)
		login(role)
		// For demonstration, we'll just redirect to the return URL
		router.push(returnUrl)
	}

	const handleLogout = () => {
		setIsLoggingOut(true)
		// Here you would typically handle the logout logic
		console.log("Logging out")
		logout()
		// Simulate logout process
		setTimeout(() => {
			setIsLoggingOut(false)
			// For demonstration, we'll just reload the page
			window.location.reload()
		}, 1000)
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
					Login to your account
				</h2>
			</div>

			<div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
					<div className="space-y-6">
						<button
							onClick={() => handleLogin("admin")}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Login as Admin
						</button>
						<button
							onClick={() => handleLogin("user")}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
						>
							Login as User
						</button>
						<button
							onClick={handleLogout}
							disabled={isLoggingOut}
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
						>
							{isLoggingOut ? "Logging out..." : "Logout"}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
