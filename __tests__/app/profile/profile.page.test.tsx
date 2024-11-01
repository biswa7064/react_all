import { render, screen } from "@testing-library/react"
import ProfilePage from "@/app/profile/page"

describe("Profile Page", () => {
	it("should render profile page", () => {
		render(<ProfilePage />)
		expect(screen.getByTestId("profile-page-root")).toBeInTheDocument()
	})
})
