"use client"
import { Button } from "@/components/core/Button"
import { useAuth } from "@/context"
import { useSessionTimeout } from "@/hooks"
import { useRouter } from "next/navigation"
import React from "react"

export default function Component() {
	const { push } = useRouter()
	const { isAuthenticated, login, logout } = useAuth()
	const { resetTimer } = useSessionTimeout()

	const handleStayLoggedIn = () => {
		login()
		resetTimer()
	}

	if (!isAuthenticated) {
		return (
			<div
				className="flex  flex-col items-center justify-center h-screen"
				data-testid="unauth-home-page-root"
			>
				<h1 className="text-2xl font-bold mb-4 !text-gray-300">
					Welcome, Please Login to the Dashboard
				</h1>
				<Button
					onClick={() => handleStayLoggedIn()}
					data-testid="stay-login-btn"
				>
					Login
				</Button>
			</div>
		)
	}

	return (
		<div
			className="flex flex-col items-center justify-center h-screen text-gray-300 w-full"
			data-testid="home-page-root"
		>
			<h1 className="text-2xl font-bold mb-4 !text-gray-300">
				Welcome to the Dashboard
			</h1>
			<p className="mb-4 text-gray-300">You are logged in.</p>
			<div className="flex gap-4">
				<Button onClick={logout} data-testid="logout-btn">
					Logout
				</Button>
				<Button onClick={() => push("/profile")} data-testid="push-profile-btn">
					Goto Profile
				</Button>
			</div>
		</div>
	)
}
