import Home from "@/app/page"
import { render, screen } from "@testing-library/react"

describe("app:page", () => {
	it("should render App page", async () => {
		const HomeServerComponent = await Home()
		render(HomeServerComponent)
		expect(screen.getByTestId("home-root")).toBeInTheDocument()
	})
})
