import React from "react"
import HomePage from "@/app/page"
import { UseAuthType } from "@/context/AuthContext"
import { render, screen } from "@testing-library/react"
import AdminDashboard from "@/app/dashboard/page"

const mockAuthContext = jest.fn()
const mockUseAuthType: Partial<UseAuthType> = {
	user: {
		role: "guest",
		isAuthenticated: true
	},
	userLoading: false
}

describe("Guest Navigation", () => {
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
	// test which pages role:guest could visit
	it("should test successful access of pages for role:guest", () => {
		render(<HomePage />)
		expect(screen.getByTestId("home-page-root")).toBeInTheDocument()
	})
	it("should test successful restriction of pages for role:guest if not authenticated", () => {
		mockAuthContext.mockImplementationOnce(() => ({
			...mockUseAuthType,
			user: { ...mockUseAuthType.user, isAuthenticated: false }
		}))
		render(<HomePage />)
		const deniedComp = screen.getByTestId("denied-root")
		expect(deniedComp).toBeInTheDocument()
		expect(screen.queryByTestId("home-page-root")).not.toBeInTheDocument()
	})
	it("should test successful loading contents of pages for role:guest", () => {
		mockAuthContext.mockReturnValueOnce({
			...mockUseAuthType,
			userLoading: true
		})
		render(<HomePage />)
		expect(screen.queryByTestId("home-page-root")).not.toBeInTheDocument()
		expect(screen.getByText("Loading...")).toBeInTheDocument()
	})
	// test restricted pages for role:guest
	it("should show denied component if try to render restricted page with role:guest", () => {
		render(<AdminDashboard />)
		const dashboardComp = screen.queryByTestId("dashboard-root")
		const deniedComp = screen.getByTestId("denied-root")
		const loginBtn = screen.getByRole("button")
		expect(dashboardComp).not.toBeInTheDocument()
		expect(deniedComp).toBeInTheDocument()
		expect(loginBtn).toBeInTheDocument()
	})
})
