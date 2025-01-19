import { AdminProfileComponent } from "@/components/profile"
import { redirectToUrl } from "@/utils/redirectToUrl"
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
jest.mock("@/utils/redirectToUrl", () => ({
	redirectToUrl: jest.fn()
}))
describe("AdminProfileComponent", () => {
	let spyRedirect: jest.Mock
	beforeEach(() => {
		jest.clearAllMocks()
		spyRedirect = redirectToUrl as jest.Mock
	})
	it("should render the component", () => {
		render(<AdminProfileComponent />)
		expect(screen.getByTestId("admin-component-root")).toBeInTheDocument()
		waitFor(() => {
			expect(screen.queryByTestId("profile-btn-root")).toBeInTheDocument()
			expect(screen.queryByText("Go to Home")).toBeInTheDocument()
		})
		act(() => fireEvent.click(screen.getByRole("button")))
		expect(spyRedirect).toHaveBeenCalledWith("/")
	})
})
