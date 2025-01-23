import RootProfilePage from "@/app/profile/page"
import { useUser } from "@auth0/nextjs-auth0/client"
import { render, screen } from "@testing-library/react"
import { beforeEach } from "node:test"
import React from "react"

jest.mock(
	"@/components/hocs/withAuth",
	() => (Component: React.ComponentType) => {
		return function WithAuthProfile(props: any) {
			const { isLoading } = useUser()
			return (
				<div data-testid="with-auth-profile">
					{isLoading ? <div>Loading...</div> : <Component {...props} />}
				</div>
			)
		}
	}
)
const mockUseUser = jest
	.fn()
	.mockImplementation(() => ({ user: undefined, isLoading: false }))
jest.mock("@auth0/nextjs-auth0/client", () => ({
	useUser: () => mockUseUser()
}))

jest.mock("@/components/profile/ProfileComponent", () => {
	return {
		__esModule: true,
		default: function ProfileComponent({
			isLoggedIn
		}: {
			isLoggedIn: boolean
		}) {
			return (
				<div data-testid="profile-component">
					{isLoggedIn ? "Profile Component" : "Not Logged In"}
				</div>
			)
		}
	}
})

describe("RootProfilePage", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should render the profile page with auth hoc", () => {
		render(<RootProfilePage />)
		expect(screen.getByTestId("with-auth-profile")).toBeInTheDocument()
	})

	it("should show not logged-in UI", () => {
		mockUseUser.mockReturnValueOnce({ user: undefined })
		render(<RootProfilePage />)
		expect(screen.getByText(/Not Logged In/i)).toBeInTheDocument()
	})
	it("should show loading UI", () => {
		mockUseUser.mockReturnValueOnce({ user: undefined, isLoading: true })
		render(<RootProfilePage />)
		expect(screen.getByText(/Loading/i)).toBeInTheDocument()
	})
})
