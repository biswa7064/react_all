import withRole from "@/components/hocs/withRole"
import { getSession } from "@auth0/nextjs-auth0"
import { render, screen } from "@testing-library/react"
import mockAxios from "../../../__mocks__/axios"
import { redirectToUrl } from "@/utils/redirectToUrl"
jest.mock("@auth0/nextjs-auth0")
jest.mock("next/config")
jest.mock("axios")
jest.mock("@/utils/redirectToUrl", () => ({
	redirectToUrl: jest.fn()
}))
const MockComponent = () => {
	return <div>Mock Wrapped Component</div>
}
describe("withRole", () => {
	let mockGetSession: jest.Mock
	let mockAxiosGet: jest.Mock
	beforeEach(() => {
		jest.clearAllMocks()
		mockGetSession = getSession as jest.Mock
		mockAxiosGet = mockAxios.get.mockImplementation(async () => ({
			data: ["Admin"]
		}))
	})
	it("should render the component with HOC", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Mock Wrapped Component/i)).toBeInTheDocument()
		expect(mockAxiosGet).toHaveBeenCalledTimes(1)
	})
	it("should show denied component if user not found", async () => {
		mockGetSession.mockReturnValue(null)
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
		expect(mockAxiosGet).not.toHaveBeenCalled()
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
		expect(mockAxiosGet).not.toHaveBeenCalled()
	})

	it("should show denied component if roles not found", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})
		mockAxiosGet.mockImplementationOnce(async () => ({
			data: []
		}))
		const WrappedComponent = withRole(MockComponent, {
			role: "Admin"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
		expect(mockAxiosGet).toHaveBeenCalledTimes(1)
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
		expect(mockAxiosGet).toHaveBeenCalledTimes(1)
	})

	it("should call redirectToUrl if got 401 error", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})
		mockAxiosGet.mockRejectedValue({
			status: 401
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "User"
		})
		render(await WrappedComponent({}))
		expect(mockAxiosGet).toHaveBeenCalledTimes(1)
		expect(redirectToUrl as jest.Mock).toHaveBeenCalledWith("/profile/unauth")
	})

	it("should show denied component if got Axios error except 401", async () => {
		mockGetSession.mockReturnValue({
			user: {
				sub: "TestSUB"
			}
		})
		mockAxiosGet.mockRejectedValue({
			status: 400
		})
		const WrappedComponent = withRole(MockComponent, {
			role: "User"
		})
		render(await WrappedComponent({}))
		expect(screen.getByText(/Access Denied/i)).toBeInTheDocument()
		expect(mockAxiosGet).toHaveBeenCalledTimes(1)
	})
})
