import HomePage from "@/app/page"
import { fireEvent, render, screen } from "@testing-library/react"
const mockLoggedIn = jest.fn()
const mockLogout = jest.fn()
const mockUseAuth = jest.fn()
jest.mock("@/context", () => ({
	useAuth: () => mockUseAuth()
}))
const mockPush = jest.fn()
jest.mock("next/navigation", () => ({
	useRouter: jest
		.fn()
		.mockImplementation(() => ({ push: (url: string) => mockPush(url) }))
}))
describe("Home Page", () => {
	beforeEach(() => {
		mockUseAuth.mockReturnValue({
			isAuthenticated: true,
			login: () => mockLoggedIn(),
			logout: () => mockLogout()
		})
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should render the homepage for authenticated user", () => {
		render(<HomePage />)
		expect(screen.getByTestId("home-page-root")).toBeInTheDocument()
		expect(screen.getByText(/Welcome to the Dashboard/i)).toBeInTheDocument()
	})
	it("should render the homepage for unauthenticated user", () => {
		mockUseAuth.mockReturnValue({
			isAuthenticated: false,
			login: () => mockLoggedIn(),
			logout: () => mockLogout()
		})
		render(<HomePage />)
		expect(screen.queryByTestId("home-page-root")).not.toBeInTheDocument()
		expect(screen.getByTestId("unauth-home-page-root")).toBeInTheDocument()
		expect(
			screen.getByText(/Welcome, Please Login to the Dashboard/i)
		).toBeInTheDocument()
	})

	it("should handle actions for authenticated user", () => {
		render(<HomePage />)
		const logoutBtn = screen.getByTestId("logout-btn")
		fireEvent.click(logoutBtn)
		expect(mockLogout).toHaveBeenCalledTimes(1)
		fireEvent.click(screen.getByTestId("push-profile-btn"))
		expect(mockPush).toHaveBeenCalledWith("/profile")
	})

	it("should handle actions for unauthenticated user", () => {
		mockUseAuth.mockReturnValue({
			isAuthenticated: false,
			login: () => mockLoggedIn(),
			logout: () => mockLogout()
		})
		render(<HomePage />)
		const loginBtn = screen.getByTestId("stay-login-btn")
		fireEvent.click(loginBtn)
		expect(mockLoggedIn).toHaveBeenCalledTimes(1)
	})
})
