import { render, screen } from "@testing-library/react"
import ErrorBoundary from "../../../src/components/core/ErrorBoundary"

describe("ErrorBoundary component", () => {
	let consoleLogSpy: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		console.error = jest.fn()
		consoleLogSpy = jest.spyOn(console, "log")
		consoleLogSpy.mockImplementation(jest.fn())
	})
	afterEach(() => {
		jest.clearAllMocks()
		console.error = console.error
		consoleLogSpy.mockRestore()
	})
	it("should properly handle error and show error UI", () => {
		const TestComp = () => {
			throw new Error("Error happened")
		}
		render(
			<ErrorBoundary>
				<TestComp />
			</ErrorBoundary>
		)
		expect(screen.getByText(/Error:/i)).toBeInTheDocument()
	})
	it("should properly handle component/page render if no error", () => {
		render(
			<ErrorBoundary>
				<p>Everything is fine</p>
			</ErrorBoundary>
		)
		expect(screen.queryByText(/Error:/i)).not.toBeInTheDocument()
		expect(screen.getByText(/Everything is fine/i)).toBeInTheDocument()
	})
})
