import HomePage from "@/app/page"
import { render, screen, waitFor } from "@testing-library/react"
describe("Guest Navigation", () => {
	// before/after test scenarios
	// test which pages role:guest could visit
	it("should test successful access of pages for role:guest", () => {
		render(<HomePage />)
		waitFor(() => {
			expect(screen.getByTestId("home-page-root")).toBeInTheDocument()
		})
	})
	// test restricted pages for role:guest
	// test redirect to login page if role:guest try to access the restricted pages
})
