import { AccessDeniedComponent } from "@/components/common"
import { redirectToUrl } from "@/utils/redirectToUrl"
import { fireEvent, render, screen, act } from "@testing-library/react"
jest.mock("@/utils/redirectToUrl", () => ({
	redirectToUrl: jest.fn()
}))
describe("AccessDeniedComponent", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should render the component with valid details", () => {
		render(<AccessDeniedComponent />)
		expect(screen.getByText("Access Denied")).toBeInTheDocument()
	})
	it("should test the child button component with valid message and action", () => {
		render(<AccessDeniedComponent />)
		expect(screen.getByText("Access Denied")).toBeInTheDocument()
		expect(screen.getByText("Go to Home")).toBeInTheDocument()
		act(() => fireEvent.click(screen.getByRole("button")))
		expect(redirectToUrl as jest.Mock).toHaveBeenCalledWith("/")
	})
})
