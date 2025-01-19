import { ProfileButton } from "@/components/home"
import { redirectToUrl } from "@/utils/redirectToUrl"
import { act, fireEvent, render, screen } from "@testing-library/react"
import { beforeEach } from "node:test"

jest.mock("@/utils/redirectToUrl", () => ({
	redirectToUrl: jest.fn()
}))
describe("ProfileButton", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should test profile button for message and url", () => {
		render(<ProfileButton btnMsg="Test Message" url="/test-url" />)
		expect(screen.getByText("Test Message")).toBeInTheDocument()
		act(() => fireEvent.click(screen.getByRole("button")))
		expect(redirectToUrl as jest.Mock).toHaveBeenCalledWith("/test-url")
	})
	it("should test profile button for default message and url", () => {
		render(<ProfileButton />)
		expect(screen.getByText("Go to Profile")).toBeInTheDocument()
		act(() => fireEvent.click(screen.getByRole("button")))
		expect(redirectToUrl as jest.Mock).toHaveBeenCalledWith("/profile")
	})
})
