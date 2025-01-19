import withRole from "@/components/hocs/withRoleFromSession"
import { getSession } from "@auth0/nextjs-auth0"
import { render, screen } from "@testing-library/react"
jest.mock("@auth0/nextjs-auth0")
jest.mock("next/config")
const MockComponent = () => {
	return <div>Mock Wrapped Component</div>
}
const AUTH0_NAMESPACE = "test-auth0-namespace"
describe("withRole", () => {
	let mockGetSession: jest.Mock
	beforeEach(() => {
		jest.clearAllMocks()
		process.env.AUTH0_NAMESPACE = AUTH0_NAMESPACE
		mockGetSession = getSession as jest.Mock
	})
	afterEach(() => {
		delete process.env.AUTH0_NAMESPACE
	})
	it("should render the component with HOC", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB",
				"test-auth0-namespace/roles": ["Admin"]
			}
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Mock Wrapped Component/i)).toBeInTheDocument()
	})
	it("should show denied component if user not found", async () => {
		mockGetSession.mockReturnValue(null)
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
	})

	it("should show denied component if user.sub not found", async () => {
		mockGetSession.mockReturnValue({
			user: {}
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
	})

	it("should show denied component if roles not found", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})

		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
	})

	it("should show denied component if unauthorized role found", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "User"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
	})

	it("should show denied component if got Axios error except 401", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})

		const WrappedComponent = withRole(MockComponent, {
			role: "User"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
	})
})
