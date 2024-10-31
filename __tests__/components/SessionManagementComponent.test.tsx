import SessionManagementComponent from "@/components/SessionManagementComponent"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
jest.mock("@/utils/redirect", () => ({
	redirectToPage: jest.fn()
}))
const mockLoggedIn = jest.fn()
const mockLogout = jest.fn()
jest.mock("@/context", () => ({
	useAuth: jest.fn().mockReturnValue({
		isAuthenticated: true,
		login: () => mockLoggedIn(),
		logout: () => mockLogout()
	})
}))
const mockSessionTimeout = jest.fn()
jest.mock("@/hooks", () => ({
	useSessionTimeout: () => mockSessionTimeout()
}))

jest.mock("@/components/SessionWarningPopup", () => {
	return function MockSessionWarningPopup({
		timeRemaining,
		onStayLoggedIn,
		onLogout
	}: {
		timeRemaining: number
		onStayLoggedIn: () => void
		onLogout: () => void
	}) {
		return (
			<div data-testid="warning-popup-root">
				<p>{timeRemaining ? "Close Warning Popup" : "Open Warning Popup"}</p>
				<button
					type="button"
					onClick={onStayLoggedIn}
					data-testid="stay-loggedIn-btn"
				>
					Stay LoggedIn
				</button>
				<button type="button" onClick={onLogout} data-testid="logout-btn">
					Logout
				</button>
			</div>
		)
	}
})

const MockChildren = () => {
	return (
		<div>
			<p>SessionManagementComponent Children</p>
		</div>
	)
}

const SessionManagementWithChildren = () => {
	return (
		<SessionManagementComponent>
			<MockChildren />
		</SessionManagementComponent>
	)
}
describe("SessionManagementComponent", () => {
	const mockSetShowWarning = jest.fn()
	beforeEach(() => {
		mockSessionTimeout.mockReturnValue({
			showWarning: true,
			timeRemaining: 1000,
			onStayLoggedIn: jest.fn(),
			resetTimer: jest.fn(),
			setShowWarning: (val: boolean) => mockSetShowWarning(val)
		})
	})
	afterEach(() => {
		jest.restoreAllMocks()
		jest.clearAllMocks()
		mockSetShowWarning.mockReset()
	})
	it("should render component properly", () => {
		render(
			<SessionManagementComponent>
				<MockChildren />
			</SessionManagementComponent>
		)
		expect(
			screen.getByTestId("session-management-comp-root")
		).toBeInTheDocument()
		expect(
			screen.getByText(/SessionManagementComponent Children/i)
		).toBeInTheDocument()
	})

	it("should render warning popup with valid state and actions", async () => {
		render(<SessionManagementWithChildren />)

		await waitFor(() => {
			expect(screen.getByText(/Close Warning Popup/i)).toBeInTheDocument()
		})
		const loggedInBtn = screen.getByTestId("stay-loggedIn-btn")
		fireEvent.click(loggedInBtn)
		expect(mockLoggedIn).toHaveBeenCalledTimes(1)
		expect(mockSetShowWarning).toHaveBeenCalledWith(false)
		const logoutBtn = screen.getByTestId("logout-btn")
		fireEvent.click(logoutBtn)
		expect(mockLogout).toHaveBeenCalledTimes(1)
		expect(mockSetShowWarning).toHaveBeenCalledWith(false)
	})

	it("should handle not to show the warning popup", () => {
		mockSessionTimeout.mockReturnValue({ showWarning: false })
		render(<SessionManagementWithChildren />)
		expect(
			screen.getByText(/SessionManagementComponent Children/i)
		).toBeInTheDocument()
		expect(screen.queryByTestId("warning-popup-root")).not.toBeInTheDocument()
	})
})
