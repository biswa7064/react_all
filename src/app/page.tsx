"use client"
import { SessionWarningPopup } from "@/components"
import { Button } from "@/components/core/Button"
import { useAuth } from "@/context"
import { useSessionTimeout } from "@/hooks"
import React from "react"

export default function Component() {
	const { isAuthenticated, login, logout } = useAuth()
	const { showWarning, timeRemaining, resetTimer, setShowWarning } =
		useSessionTimeout()

	console.log({
		showWarning,
		timeRemaining,
		isAuthenticated
	})

	const handleStayLoggedIn = () => {
		login()
		resetTimer()
	}

	const handleLogout = () => {
		logout()
	}

	if (!isAuthenticated) {
		return (
			<div className="flex  flex-col items-center justify-center h-screen">
				<h1 className="text-2xl font-bold mb-4 !text-gray-300">
					Welcome, Please Login to the Dashboard
				</h1>
				<Button onClick={() => handleStayLoggedIn()}>Login</Button>
			</div>
		)
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen text-gray-300 w-full">
			<h1 className="text-2xl font-bold mb-4 !text-gray-300">
				Welcome to the Dashboard
			</h1>
			<p className="mb-4 text-gray-300">You are logged in.</p>
			<Button onClick={logout}>Logout</Button>

			{showWarning && (
				<SessionWarningPopup
					timeRemaining={timeRemaining}
					onStayLoggedIn={() => {
						handleStayLoggedIn()
						setShowWarning(false)
					}}
					onLogout={() => {
						handleLogout()
						setShowWarning(false)
					}}
				/>
			)}
		</div>
	)
}
