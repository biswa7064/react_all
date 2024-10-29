import ErrorBoundary from "@/components/core/ErrorBoundary"
import { AuthProvider, useAuth } from "@/context"
import { fireEvent, render, renderHook, screen } from "@testing-library/react"

const MockComponent = () => {
	const { isAuthenticated, login, logout } = useAuth()
	return (
		<div>
			<p>{isAuthenticated ? "LoggedIn" : "Not LoggedIn"}</p>
			<button type="button" onClick={login} data-testid="loggedin-btn">
				Login
			</button>
			<button type="button" onClick={logout} data-testid="logout-btn">
				Logout
			</button>
		</div>
	)
}
describe("AuthContext", () => {
	beforeEach(() => {
		console.error = jest.fn()
	})

	afterEach(() => {
		console.error = console.error
	})
	it("should return values for wrapped component", () => {
		render(
			<AuthProvider>
				<MockComponent />
			</AuthProvider>
		)
		expect(screen.getByText("Not LoggedIn")).toBeInTheDocument()
	})
	it("should test login functionality", () => {
		render(
			<AuthProvider>
				<MockComponent />
			</AuthProvider>
		)
		expect(screen.getByText("Not LoggedIn")).toBeInTheDocument()
		fireEvent.click(screen.getByTestId("loggedin-btn"))
		expect(screen.queryByText("Not LoggedIn")).not.toBeInTheDocument()
		expect(screen.queryByText("LoggedIn")).toBeInTheDocument()
	})

	it("should test logout functionality", () => {
		render(
			<AuthProvider>
				<MockComponent />
			</AuthProvider>
		)
		expect(screen.getByText("Not LoggedIn")).toBeInTheDocument()
		fireEvent.click(screen.getByTestId("loggedin-btn"))
		expect(screen.queryByText("LoggedIn")).toBeInTheDocument()
		fireEvent.click(screen.getByTestId("logout-btn"))
		expect(screen.queryByText("Not LoggedIn")).toBeInTheDocument()
	})

	it("should throw error if not wrapped with AuthProvider", async () => {
		const { result } = renderHook(() => useAuth(), { wrapper: ErrorBoundary })
		expect(result.current).toBeNull()
		expect(screen.queryByTestId("err-msg")).toBeInTheDocument()
	})
})
