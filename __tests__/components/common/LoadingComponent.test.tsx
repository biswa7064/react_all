import { LoadingComponent } from "@/components/common"
import { render, screen } from "@testing-library/react"

describe("LoadingComponent", () => {
	it("should render the component with valid details", () => {
		render(<LoadingComponent />)
		expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
	})
})
