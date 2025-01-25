import { GET } from "@/app/api/management-api/route"
import { AxiosLib } from "@/lib/axios.lib"
const mockResponseJson = jest.fn()
jest.mock("next/server", () => ({
	NextRequest: jest.fn(),
	NextResponse: {
		json: (val: string[]) => mockResponseJson(val)
	}
}))

const requestPayload = {
	url: "https://dev-cdv32mus7iljpox6.us.auth0.com/oauth/token",
	payload: JSON.stringify({
		client_id: "testClientId",
		client_secret: "testClientSecret",
		audience: `https://example.com/api/v2/`,
		grant_type: "client_credentials"
	})
}
describe("Management Route", () => {
	let spyAxiosPost: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		spyAxiosPost = jest.spyOn(AxiosLib.prototype, "post")
		process.env.AUTH0_CLIENT_ID_M2M = "testClientId"
		process.env.AUTH0_CLIENT_SECRET_M2M = "testClientSecret"
		process.env.AUTH0_ISSUER_BASE_URL = "https://example.com"
	})
	afterEach(() => {
		delete process.env.AUTH0_CLIENT_ID_M2M
		delete process.env.AUTH0_CLIENT_SECRET_M2M
		delete process.env.AUTH0_ISSUER_BASE_URL
	})
	describe("GET /api/management-api", () => {
		it("should return access token", async () => {
			spyAxiosPost.mockResolvedValue({ data: { access_token: "testToken" } })
			await GET({} as any)
			expect(mockResponseJson).toHaveBeenCalledWith({
				accessToken: "testToken"
			})
			expect(spyAxiosPost).toHaveBeenCalledWith(
				requestPayload.url,
				requestPayload.payload
			)
		})
		it("should throw error if no response found", async () => {
			spyAxiosPost.mockResolvedValue({ data: undefined })
			await GET({} as any)
			expect(mockResponseJson).toHaveBeenCalledWith({
				error: "Error fetching token"
			})
			expect(spyAxiosPost).toHaveBeenCalledWith(
				requestPayload.url,
				requestPayload.payload
			)
		})
		it("should throw error if response has no access token", async () => {
			spyAxiosPost.mockResolvedValue({ data: { key: "value" } })
			await GET({} as any)
			expect(mockResponseJson).toHaveBeenCalledWith({
				error: "Error fetching token"
			})
			expect(spyAxiosPost).toHaveBeenCalledWith(
				requestPayload.url,
				requestPayload.payload
			)
		})
	})
})
