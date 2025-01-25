import { GET } from "@/app/api/role/route"
import { NextRequest } from "next/server"
import { AxiosLib } from "@/lib/axios.lib"
import { AxiosError } from "axios"

jest.mock("axios", () => ({
	...jest.requireActual("axios"),
	AxiosError: function (message: string) {
		this.message = message
	}
}))
const mockResponseJson = jest.fn()
jest.mock("next/server", () => ({
	NextRequest: jest.fn(),
	NextResponse: {
		json: (val: string[]) => mockResponseJson(val)
	}
}))
describe("Role Route", () => {
	let spyAxiosLibGet: jest.SpyInstance
	let mockRequest: jest.Mocked<NextRequest>
	beforeEach(() => {
		jest.clearAllMocks()
		process.env.AUTH0_ISSUER_BASE_URL = "http://test.com"
		spyAxiosLibGet = jest.spyOn(AxiosLib.prototype, "get")
		mockRequest = {
			nextUrl: {
				searchParams: new URLSearchParams()
			}
		} as jest.Mocked<NextRequest>
	})
	afterEach(() => {
		jest.resetModules()
		jest.restoreAllMocks()
		delete process.env.AUTH0_ISSUER_BASE_URL
	})
	describe("GET /api/role", () => {
		it("should return user roles", async () => {
			mockRequest.nextUrl.searchParams.set("userId", "testUserId")
			const expectedUrl = "http://test.com/api/v2/users/testUserId/roles"
			spyAxiosLibGet.mockResolvedValue({ data: [{ name: "testRole" }] })
			await GET(mockRequest)
			expect(spyAxiosLibGet).toHaveBeenCalledWith(expectedUrl)
			expect(mockResponseJson).toHaveBeenCalledWith(["testRole"])
		})

		it("should return empty array if user roles not found", async () => {
			mockRequest.nextUrl.searchParams.set("userId", "testUserId")
			const expectedUrl = "http://test.com/api/v2/users/testUserId/roles"
			spyAxiosLibGet.mockResolvedValue({ data: undefined })
			await GET(mockRequest)
			expect(spyAxiosLibGet).toHaveBeenCalledWith(expectedUrl)
			expect(mockResponseJson).toHaveBeenCalledWith([])
		})
		it("should throw error and return empty response if no userId found", async () => {
			mockRequest.nextUrl.searchParams.set("userId", "")
			await GET(mockRequest)
			expect(spyAxiosLibGet).not.toHaveBeenCalled()
			expect(mockResponseJson).toHaveBeenCalledWith([])
		})
		it("should throw error if axiosLib call fails", async () => {
			mockRequest.nextUrl.searchParams.set("userId", "testUserId")
			const mockError = new AxiosError("Auth Fail")
			mockError.status = 401
			spyAxiosLibGet.mockRejectedValue(mockError)
			await GET(mockRequest)
			expect(mockResponseJson).toHaveBeenCalledWith({
				error: JSON.stringify(mockError),
				status: 401
			})
		})
	})
})
