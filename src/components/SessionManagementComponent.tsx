"use client"
import { useSessionTimeout } from "@/hooks"
import React, { FC, ReactNode } from "react"
import SessionWarningPopup from "./SessionWarningPopup"
import { useAuth } from "@/context"

const SessionManagementComponent: FC<{ children: ReactNode }> = ({
	children
}) => {
	const { showWarning, timeRemaining, setShowWarning, resetTimer } =
		useSessionTimeout()
	const { login, logout } = useAuth()
	const handleStayLoggedIn = () => {
		login()
		resetTimer()
	}

	const handleLogout = () => {
		logout()
	}
	return (
		<>
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
			{children}
		</>
	)
}

export default SessionManagementComponent
