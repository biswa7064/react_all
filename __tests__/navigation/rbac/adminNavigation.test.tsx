import React from "react"
import ProfilePage from "@/app/profile/page"
import HomePage from "@/app/page"
import { UseAuthType } from "@/context/AuthContext"
import { render, screen } from "@testing-library/react"
import AdminDashboard from "@/app/dashboard/page"

const mockAuthContext = jest.fn()
const mockUseAuthType: Partial<UseAuthType> = {
	user: {
		role: "admin",
		isAuthenticated: true
	},
	userLoading: false
}

describe("User Navigation", () => {
	// before/after test scenarios
	let contextSpy: jest.SpyInstance
	beforeEach(() => {
		jest.resetAllMocks()
		contextSpy = jest
			.spyOn(React, "useContext")
			.mockImplementation(mockAuthContext)
		mockAuthContext.mockImplementation(() => mockUseAuthType)
	})
	afterEach(() => {
		jest.clearAllMocks()
		contextSpy.mockRestore()
	})
	// test for home page as it is accessible for all roles
	it("should test successful access of pages for role:admin", () => {
		render(<HomePage />)
		expect(screen.getByTestId("home-page-root")).toBeInTheDocument()
	})
	// test which pages role:admin could visit
	it("should test successful access of pages for role:admin", () => {
		render(<AdminDashboard />)
		expect(screen.getByTestId("dashboard-root")).toBeInTheDocument()
	})
	it("should test successful restriction of pages for role:admin if not authenticated", () => {
		mockAuthContext.mockImplementationOnce(() => ({
			...mockUseAuthType,
			user: { ...mockUseAuthType.user, isAuthenticated: false }
		}))
		render(<AdminDashboard />)
		const deniedComp = screen.getByTestId("denied-root")
		expect(deniedComp).toBeInTheDocument()
		expect(screen.queryByTestId("dashboard-root")).not.toBeInTheDocument()
	})
	it("should test successful loading contents of pages for role:admin", () => {
		mockAuthContext.mockReturnValueOnce({
			...mockUseAuthType,
			userLoading: true
		})
		render(<AdminDashboard />)
		expect(screen.queryByTestId("dashboard-root")).not.toBeInTheDocument()
		expect(screen.getByText("Loading...")).toBeInTheDocument()
	})
	// test restricted pages for role:admin
	it("should show denied component if try to render restricted page with role:admin", () => {
		render(<ProfilePage />)
		const dashboardComp = screen.queryByTestId("dashboard-root")
		const deniedComp = screen.getByTestId("denied-root")
		const loginBtn = screen.getByRole("button")
		expect(dashboardComp).not.toBeInTheDocument()
		expect(deniedComp).toBeInTheDocument()
		expect(loginBtn).toBeInTheDocument()
	})
})
