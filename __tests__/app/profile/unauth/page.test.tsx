import Unauthorized from "@/app/profile/unauth/page"
import { render, screen, waitFor } from "@testing-library/react"
jest.mock("@/components/home/ProfileButton", () => {
	const MockProfileBtn = () => {
		return (
			<div>
				<button type="button" data-testid="profile-btn-root">
					Login Page
				</button>
			</div>
		)
	}
	return MockProfileBtn
})
describe("Unauthorized", () => {
	it("should render", () => {
		const { container } = render(<Unauthorized />)
		expect(container).toBeInTheDocument()
		expect(screen.getByTestId("unauth-page")).toBeInTheDocument()
		expect(screen.getByText("Unauthorized Access")).toBeInTheDocument()
		expect(screen.getByTestId("profile-btn-root")).toBeInTheDocument()
		expect(screen.getByText("Login Page")).toBeInTheDocument()
		waitFor(() => {
			const linkAtt = screen.getByRole("link")
			expect(linkAtt).toHaveAttribute("href", "/profile")
		})
	})
})
