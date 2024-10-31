"use client"
import { useSessionTimeout } from "@/hooks"
import React, { FC, ReactNode } from "react"
import SessionWarningPopup from "./SessionWarningPopup"
import { useAuth } from "@/context"
import { redirectToPage } from "@/utils/redirect"

const SessionManagementComponent: FC<{ children: ReactNode }> = ({
	children
}) => {
	const { showWarning, timeRemaining, setShowWarning, resetTimer } =
		useSessionTimeout()
	const { login, logout } = useAuth()
	const handleStayLoggedIn = () => {
		login()
		resetTimer()
		setShowWarning(false)
	}

	const handleLogout = () => {
		logout()
		setShowWarning(false)
		redirectToPage()
	}
	return (
		<div data-testid="session-management-comp-root">
			{showWarning && (
				<SessionWarningPopup
					timeRemaining={timeRemaining}
					onStayLoggedIn={() => handleStayLoggedIn()}
					onLogout={() => handleLogout()}
				/>
			)}
			{children}
		</div>
	)
}

export default SessionManagementComponent
