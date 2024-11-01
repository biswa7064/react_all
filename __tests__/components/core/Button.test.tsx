import { Button } from "@/components/core/Button"
import { render, screen } from "@testing-library/react"

const baseStyles =
	"inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"

const variantStyles = {
	primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
	secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",
	outline:
		"border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500"
}

const sizeStyles = {
	sm: "px-3 py-1.5 text-sm",
	md: "px-4 py-2 text-base",
	lg: "px-6 py-3 text-lg"
}

describe("Button Component", () => {
	it("should return properly button component with default props", () => {
		const combinedClassName = `${baseStyles} ${
			variantStyles["primary" as keyof typeof variantStyles]
		} ${sizeStyles["md"]}`

		render(<Button />)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveClass(combinedClassName)
	})
	it("should render button component with provided props", () => {
		const mockCLassName = "test-class"
		const mockVariant = "secondary" as keyof typeof variantStyles
		const mockSize = "sm" as keyof typeof sizeStyles
		const combinedClassName = `${baseStyles} ${variantStyles[mockVariant]} ${sizeStyles[mockSize]} ${mockCLassName}`

		render(
			<Button className={mockCLassName} variant={mockVariant} size={mockSize} />
		)
		expect(screen.getByRole("button")).toBeInTheDocument()
		expect(screen.getByRole("button")).toHaveClass(combinedClassName)
	})
})
