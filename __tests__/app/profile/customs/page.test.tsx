import CustomPage from "@/app/profile/customs/page"
import { render, screen } from "@testing-library/react"
import * as Next from "next/navigation"
import { FC } from "react"
const mockUseUser = jest
	.fn()
	.mockImplementation(() => ({ user: undefined, isLoading: false }))
jest.mock("@auth0/nextjs-auth0/client", () => ({
	useUser: () => mockUseUser()
}))
jest.mock("next/navigation", () => ({
	useRouter: jest.fn()
}))

jest.mock("@/components/profile/ProfileComponent", () => {
	const MockedProfile: FC<{
		isLoggedIn: boolean
		isLoading: boolean
		user: Record<string, unknown>
		customLogin: () => void
		customLogout: () => void
	}> = ({ isLoggedIn, isLoading, customLogin, customLogout }) => {
		return (
			<div data-testid="mock-profile-component">
				{isLoading ? (
					<div>Loading...</div>
				) : (
					<>
						Profile Component
						<button
							type="button"
							onClick={() => {
								isLoggedIn ? customLogout() : customLogin()
							}}
						>
							{isLoggedIn ? "Logout" : "Login"}
						</button>
					</>
				)}
			</div>
		)
	}
	return MockedProfile
})

describe("CustomPage", () => {
	let useRouterSpy: jest.SpyInstance
	beforeEach(() => {
		useRouterSpy = jest.spyOn(Next, "useRouter")
		jest.clearAllMocks()
	})
	it("should render CustomPage", () => {
		useRouterSpy.mockReturnValue({ push: jest.fn() })
		render(<CustomPage />)
		expect(screen.getByTestId("custom-profile-page")).toBeInTheDocument()
		expect(screen.getByTestId("mock-profile-component")).toBeInTheDocument()
	})
	it("should navigate to custom login on button click", () => {
		const pushMock = jest.fn()
		useRouterSpy.mockReturnValue({ push: pushMock })
		render(<CustomPage />)
		const loginButton = screen.getByRole("button")
		expect(screen.getByText("Login")).toBeInTheDocument()
		expect(loginButton).toBeInTheDocument()
		loginButton.click()
		expect(pushMock).toHaveBeenCalledWith("/api/auth/custom_login")
	})
	it("should navigate to custom logout on button click", () => {
		const pushMock = jest.fn()
		useRouterSpy.mockReturnValue({ push: pushMock })
		mockUseUser.mockReturnValue({
			user: { name: "test user" },
			isLoading: false
		})
		render(<CustomPage />)
		const logoutButton = screen.getByRole("button")
		expect(screen.getByText("Logout")).toBeInTheDocument()
		expect(logoutButton).toBeInTheDocument()
		logoutButton.click()
		expect(pushMock).toHaveBeenCalledWith("/api/auth/custom_logout")
	})
})
