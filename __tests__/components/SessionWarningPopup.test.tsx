import { SessionWarningPopup } from "@/components"
import { render, screen } from "@testing-library/react"

const mockSessionWarningProps = {
	timeRemaining: 1000,
	onStayLoggedIn: jest.fn(),
	onLogout: jest.fn()
}

describe("SessionWarningPopup", () => {
	it("should properly handle UI if no remaining time", () => {
		const mockWarningPropsWithoutRemainingTime = {
			...mockSessionWarningProps,
			timeRemaining: 0
		}
		render(<SessionWarningPopup {...mockWarningPropsWithoutRemainingTime} />)
		expect(screen.getByText("Session has expired")).toBeInTheDocument()
		expect(
			screen.getByText(/Your session has expired, please Logout and re-login/i)
		).toBeInTheDocument()
		expect(screen.getByTestId("alert-cancel-btn-root")).toBeInTheDocument()
		expect(
			screen.queryByTestId("alert-action-btn-root")
		).not.toBeInTheDocument()
	})
	it("should properly handle UI if having remaining time", () => {
		render(<SessionWarningPopup {...mockSessionWarningProps} />)
		expect(screen.getByText(/Session Expiring Soon/i)).toBeInTheDocument()
		expect(
			screen.getByText(
				/Your session will expire in 1 seconds. Do you want to stay logged in?/i
			)
		).toBeInTheDocument()
		expect(screen.getByTestId("alert-action-btn-root")).toBeInTheDocument()
	})
})
