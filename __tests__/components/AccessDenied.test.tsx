import AccessDenied from "@/components/shared/AccessDenied"
import { render, screen, fireEvent } from "@testing-library/react"
import * as AuthUtil from "@/utils/auth"
const mockUsePathName = jest.fn()
jest.mock("next/navigation", () => ({
	...jest.requireActual("next/navigation"),
	usePathname: () => mockUsePathName(),
	redirect: jest.fn()
}))
jest.mock("@/utils/auth", () => ({
	redirectToLogin: jest.fn()
}))
describe("AccessDenied", () => {
	let spyRedirectLogin: jest.SpyInstance
	beforeEach(() => {
		spyRedirectLogin = jest.spyOn(AuthUtil, "redirectToLogin")
	})
	afterEach(() => {
		jest.clearAllMocks()
		jest.resetAllMocks()
		spyRedirectLogin.mockRestore()
	})
	// should test for successful render of component
	it("should test successful render of AccessDenied Component", () => {
		render(<AccessDenied />)
		expect(screen.getByTestId("denied-root")).toBeInTheDocument()
		expect(screen.getByText("Access Denied")).toBeInTheDocument()
	})
	// check the redirect login function
	it("should test to redirect to login page", () => {
		mockUsePathName.mockReturnValue("/return-url")
		render(<AccessDenied />)
		const loginBtn = screen.getByRole("button")
		expect(screen.getByText("Access Denied")).toBeInTheDocument()
		expect(loginBtn).toBeInTheDocument()
		fireEvent.click(loginBtn)
		expect(spyRedirectLogin).toHaveBeenCalledWith("/return-url")
	})
})
