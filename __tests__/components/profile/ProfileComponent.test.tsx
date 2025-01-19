import { fireEvent, render, screen } from "@testing-library/react"
import ProfileComponent from "@/components/profile/ProfileComponent"
const mockUseUser = jest.fn()
jest.mock("@auth0/nextjs-auth0/client", () => ({
	useUser: () => mockUseUser
}))

describe("ProfileComponent", () => {
	const mockUser = {
		name: "John Doe",
		email: "john.doe@example.com",
		picture: "https://example.com/john-doe.jpg"
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it("should display user information when user is logged in", () => {
		mockUseUser.mockReturnValue({
			user: mockUser,
			isLoading: false
		})

		render(<ProfileComponent user={mockUser} isLoggedIn={true} />)

		expect(screen.getByText("John Doe")).toBeInTheDocument()
		expect(screen.getByText("john.doe@example.com")).toBeInTheDocument()
		expect(screen.getByRole("img")).toHaveAttribute("src", expect.any(String))
		expect(screen.getByText("Logout")).toBeInTheDocument()
	})

	it("should display loading state when loading", () => {
		mockUseUser.mockReturnValue({
			user: null,
			isLoading: true
		})

		render(<ProfileComponent user={null} isLoading={true} />)

		expect(screen.getByText("Loading...")).toBeInTheDocument()
	})

	it("should display login button when user is not logged in", () => {
		mockUseUser.mockReturnValue({
			user: null,
			isLoading: false
		})

		render(<ProfileComponent user={null} isLoggedIn={false} />)

		expect(screen.getByText("Login")).toBeInTheDocument()
	})

	it("should navigate to loggedInRoute when login button is clicked", () => {
		const loggedInRoute = "/dashboard"
		const loggedOutRoute = "/logout"

		render(
			<ProfileComponent
				user={mockUser}
				isLoggedIn={false}
				loggedInRoute={loggedInRoute}
				loggedOutRoute={loggedOutRoute}
			/>
		)

		const loginButton = screen.getByText("Login")
		expect(loginButton.closest("a")).toHaveAttribute("href", loggedInRoute)
	})

	it("should navigate to loggedOutRoute when logout button is clicked", () => {
		const loggedInRoute = "/dashboard"
		const loggedOutRoute = "/logout"

		render(
			<ProfileComponent
				user={mockUser}
				isLoggedIn={true}
				loggedInRoute={loggedInRoute}
				loggedOutRoute={loggedOutRoute}
			/>
		)

		const logoutButton = screen.getByText("Logout")
		expect(logoutButton.closest("a")).toHaveAttribute("href", loggedOutRoute)
	})

	it("should call customLogin function when custom login button is clicked", () => {
		const customLogin = jest.fn()

		render(
			<ProfileComponent
				user={mockUser}
				isLoggedIn={false}
				isCustom={true}
				customLogin={customLogin}
			/>
		)

		const loginButton = screen.getByText("Login")
		fireEvent.click(loginButton)
		expect(customLogin).toHaveBeenCalled()
	})

	it("should call customLogout function when custom logout button is clicked", () => {
		const customLogout = jest.fn()

		render(
			<ProfileComponent
				user={mockUser}
				isLoggedIn={true}
				isCustom={true}
				customLogout={customLogout}
			/>
		)

		const logoutButton = screen.getByText("Logout")
		fireEvent.click(logoutButton)
		expect(customLogout).toHaveBeenCalled()
	})
})
