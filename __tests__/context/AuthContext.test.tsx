import React from "react"
import { render, screen, act, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AuthProvider, useAuthContext } from "@/context/AuthContext"

// Test component that uses the AuthContext
const TestComponent: React.FC = () => {
	const { user, login, logout } = useAuthContext()
	return (
		<div>
			<div data-testid="auth-status">
				{user?.role !== "guest" ? "Authenticated" : "Not authenticated"}
			</div>
			<div data-testid="user">{user?.role || "No user"}</div>
			<button type="button" onClick={() => login("admin")}>
				Login
			</button>
			<button type="button" onClick={logout}>
				Logout
			</button>
		</div>
	)
}

describe("AuthContext", () => {
	it("provides the correct initial values with no auth", () => {
		render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>
		)

		expect(screen.getByTestId("auth-status")).toHaveTextContent(
			"Not authenticated"
		)
		expect(screen.getByTestId("user")).toHaveTextContent("guest")
	})

	it("updates authentication status and user on login", async () => {
		render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>
		)
		fireEvent.click(screen.getByText("Login"))
		expect(screen.getByTestId("auth-status")).toHaveTextContent("Authenticated")
		expect(screen.getByTestId("user")).toHaveTextContent("admin")
	})

	it("clears authentication status and user on logout", async () => {
		render(
			<AuthProvider>
				<TestComponent />
			</AuthProvider>
		)

		// Login first
		await act(async () => {
			await userEvent.click(screen.getByText("Login"))
		})

		// Then logout
		await act(async () => {
			await userEvent.click(screen.getByText("Logout"))
		})
		expect(screen.getByTestId("auth-status")).toHaveTextContent(
			"Not authenticated"
		)
		expect(screen.getByTestId("user")).toHaveTextContent("guest")
	})

	it("throws an error when useAuth is used outside of AuthProvider", () => {
		// Suppress console.error for this test to avoid noisy output
		const consoleErrSpy = jest
			.spyOn(console, "error")
			.mockImplementation(() => {
				return {}
			})

		expect(() => render(<TestComponent />)).toThrow(
			"useAuthContext must be used within an AuthProvider"
		)

		// Restore spyInstance
		consoleErrSpy.mockRestore()
	})
})
