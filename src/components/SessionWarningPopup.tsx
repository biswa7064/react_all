import React from "react"
import * as AlertDialog from "@radix-ui/react-alert-dialog"

interface SessionWarningPopupProps {
	timeRemaining: number
	onStayLoggedIn: () => void
	onLogout: () => void
}

export default function SessionWarningPopup({
	timeRemaining,
	onStayLoggedIn,
	onLogout
}: SessionWarningPopupProps) {
	const formattedTime = Math.ceil(timeRemaining / 1000)

	return (
		<AlertDialog.Root open={true}>
			<AlertDialog.Portal>
				<AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
				<AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
					<AlertDialog.Title className="text-lg font-semibold mb-2 text-gray-500">
						{formattedTime ? "Session Expiring Soon" : "Session has expired"}
					</AlertDialog.Title>
					{formattedTime ? (
						<AlertDialog.Description className="text-sm text-gray-500 mb-4">
							Your session will expire in {formattedTime} seconds. Do you want
							to stay logged in?
						</AlertDialog.Description>
					) : (
						<AlertDialog.Description className="text-sm text-gray-500 mb-4">
							Your session has expired, please Logout and re-login
						</AlertDialog.Description>
					)}
					<div
						className={`flex gap-4 ${
							formattedTime ? "justify-end" : "justify-start"
						}`}
					>
						<AlertDialog.Cancel asChild>
							<button
								onClick={onLogout}
								className={
									"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								}
							>
								Logout
							</button>
						</AlertDialog.Cancel>
						{formattedTime && (
							<AlertDialog.Action asChild>
								<button
									onClick={onStayLoggedIn}
									className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Stay Logged In
								</button>
							</AlertDialog.Action>
						)}
					</div>
				</AlertDialog.Content>
			</AlertDialog.Portal>
		</AlertDialog.Root>
	)
}
