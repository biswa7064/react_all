import { withAuth } from "@/components/hocs"
import { render, screen } from "@testing-library/react"
const mockUseUser = jest.fn()
jest.mock("@auth0/nextjs-auth0/client", () => ({
	useUser: () => mockUseUser()
}))
jest.mock("next/config")
const MockComponent = () => {
	return <div>Mock Wrapped Component</div>
}
describe("HOC: withAuth", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		mockUseUser.mockReturnValue({ user: {}, isLoading: false })
	})
	it("should render the component with HOC", () => {
		const WrappedComponent = withAuth(MockComponent)
		render(<WrappedComponent />)
		expect(screen.getByText(/Mock Wrapped Component/i)).toBeInTheDocument()
	})
	it("should show loading UI and not render the component for user data loading with HOC", () => {
		mockUseUser.mockReturnValue({ isLoading: true })
		const WrappedComponent = withAuth(MockComponent)
		render(<WrappedComponent />)
		expect(
			screen.queryByText(/Mock Wrapped Component/i)
		).not.toBeInTheDocument()
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
	})

	it("should show denied message and not render the component for no user found with HOC", () => {
		mockUseUser.mockReturnValue({ isLoading: false, user: undefined })
		const WrappedComponent = withAuth(MockComponent)
		render(<WrappedComponent />)
		expect(screen.getByText("Access Denied")).toBeInTheDocument()
		expect(screen.getByRole("button").closest("a")).toHaveAttribute(
			"href",
			"/api/auth/login?returnTo=/profile"
		)
	})
})
