import { AxiosLib } from "@/lib/axios.lib"
import axios from "axios"
import mockAxios from "../../__mocks__/axios"

jest.mock("axios")
const mockGetLocalStorage = jest.fn().mockReturnValue("test-token")
jest.mock("@/utils/localStorageUtil", () => ({
	__esModule: true,
	getLocalStorageItem: () => mockGetLocalStorage()
}))
describe("AxiosLib", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		process.env.AUTH0_MANAGEMENT_API_TOKEN = "test-token1"
	})
	afterEach(() => {
		delete process.env.AUTH0_MANAGEMENT_API_TOKEN
	})
	it("should construct a new instance of AxiosLib with valid properties", () => {
		const axiosLib = new AxiosLib()
		expect(axiosLib).toBeInstanceOf(AxiosLib)
		expect(axiosLib.isAuthRequired).toBeFalsy()
		expect(axiosLib).toHaveProperty("newAxiosInstance")
	})
	describe("get", () => {
		it("should call axios get method with correct URL and default config", async () => {
			const mockAxiosGet = axios.get as jest.Mock
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const response = { data: "test data" }
			mockAxiosGet.mockResolvedValue(response)
			const result = await axiosLib.get(url)
			expect(axios.get).toHaveBeenCalledWith(url, {})
			expect(result).toEqual(response)
		})
		it("should call axios get method with correct URL and provided config", async () => {
			const mockAxiosGet = axios.get as jest.Mock
			const axiosLib = new AxiosLib(true)
			const url = "/test-url"
			const config = { params: { id: 1 }, headers: {} }
			const response = { data: "test data" }
			mockAxiosGet.mockResolvedValue(response)
			const result = await axiosLib.get(url, config)
			expect(axios.get).toHaveBeenCalledWith(url, config)
			expect(result).toEqual(response)
		})
	})
	describe("post", () => {
		it("should call axios post method with correct URL, data, and default config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const data = { name: "test" }
			const response = { data: "test data" }
			mockAxios.post.mockResolvedValue(response)
			const result = await axiosLib.post(url, data)
			expect(axios.post).toHaveBeenCalledWith(url, data, {})
			expect(result).toEqual(response)
		})
		it("should call axios post method with correct URL, default data and config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const response = { data: "test data" }
			mockAxios.post.mockResolvedValue(response)
			const result = await axiosLib.post(url)
			expect(axios.post).toHaveBeenCalledWith(url, {}, {})
			expect(result).toEqual(response)
		})
		it("should call axios post method with correct URL, provided data, and config", async () => {
			const mockAxiosPost = axios.post as jest.Mock
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const data = { name: "test" }
			const config = { headers: { "Content-Type": "application/json" } }
			const response = { data: "test data" }
			mockAxiosPost.mockResolvedValue(response)
			const result = await axiosLib.post(url, data, config)
			expect(axios.post).toHaveBeenCalledWith(url, data, config)
			expect(result).toEqual(response)
		})
	})
	describe("put", () => {
		it("should call axios put method with correct URL, data, and config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const data = { name: "test" }
			const config = { headers: { "Content-Type": "application/json" } }
			const response = { data: "test data" }
			mockAxios.put.mockResolvedValue(response)
			const result = await axiosLib.put(url, data, config)
			expect(axios.put).toHaveBeenCalledWith(url, data, config)
			expect(result).toEqual(response)
		})
		it("should call axios put method with correct URL, data, and default config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const data = { name: "test" }
			const response = { data: "test data" }
			mockAxios.put.mockResolvedValue(response)
			const result = await axiosLib.put(url, data)
			expect(axios.put).toHaveBeenCalledWith(url, data, {})
			expect(result).toEqual(response)
		})
		it("should call axios put method with correct URL, default data and config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const response = { data: "test data" }
			mockAxios.put.mockResolvedValue(response)
			const result = await axiosLib.put(url)
			expect(axios.put).toHaveBeenCalledWith(url, {}, {})
			expect(result).toEqual(response)
		})
	})
	describe("delete", () => {
		it("should call axios delete method with correct URL and config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const config = { params: { id: 1 } }
			const response = { data: "test data" }
			mockAxios.delete.mockResolvedValue(response)
			const result = await axiosLib.delete(url, config)
			expect(axios.delete).toHaveBeenCalledWith(url, config)
			expect(result).toEqual(response)
		})
		it("should call axios delete method with correct URL and default config", async () => {
			const axiosLib = new AxiosLib()
			const url = "/test-url"
			const response = { data: "test data" }
			mockAxios.delete.mockResolvedValue(response)
			const result = await axiosLib.delete(url)
			expect(axios.delete).toHaveBeenCalledWith(url, {})
			expect(result).toEqual(response)
		})
	})

	describe("setInterceptor", () => {
		it("should set Authorization header if isAuthRequired is true and localstorage has auth token", async () => {
			const axiosLib = new AxiosLib(true)
			const mockConfig = { headers: {} }
			const mockInterceptorUse = axiosLib["newAxiosInstance"].interceptors
				.request.use as jest.Mock
			mockInterceptorUse.mock.calls[0][0](mockConfig)
			expect(mockConfig.headers).toHaveProperty("Authorization", "test-token")
		})
		it("should set Authorization header if isAuthRequired is true and localstorage has no auth token", async () => {
			mockGetLocalStorage.mockReturnValue(null)
			const axiosLib = new AxiosLib(true)
			const mockConfig = { headers: {} }
			const mockInterceptorUse = axiosLib["newAxiosInstance"].interceptors
				.request.use as jest.Mock
			mockInterceptorUse.mock.calls[0][0](mockConfig)
			expect(mockConfig.headers).toHaveProperty(
				"Authorization",
				"Bearer test-token1"
			)
		})
	})
})
