import { GET } from "@/app/api/auth/[auth0]/route"
import * as nextAuth from "@auth0/nextjs-auth0"
const mockCallback = jest.fn()
jest.mock("@auth0/nextjs-auth0", () => ({
	handleAuth: jest.fn().mockImplementation(() => ({
		callback: (req: any, res: any) => mockCallback(req, res)
	})),
	handleCallback: jest.fn(),
	handleLogin: jest.fn(),
	handleLogout: jest.fn()
}))
describe("Auth Route", () => {
	let spyHandleAuth: jest.SpyInstance
	let spyHandleLogin: jest.SpyInstance
	let spyHandleLogout: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		spyHandleAuth = jest.spyOn(nextAuth, "handleAuth")
		spyHandleLogin = jest.spyOn(nextAuth, "handleLogin")
		spyHandleLogout = jest.spyOn(nextAuth, "handleLogout")
	})
	afterAll(() => {
		jest.clearAllMocks()
	})
	it("should call the auth api", async () => {
		await GET
		expect(spyHandleAuth).toHaveBeenCalledWith({
			custom_logout: undefined,
			custom_login: undefined,
			callback: expect.any(Function)
		})
		expect(spyHandleLogout).toHaveBeenCalledWith({ returnTo: "/" })
		expect(spyHandleLogin).toHaveBeenCalledWith({
			returnTo: "/profile/customs"
		})
	})
})
