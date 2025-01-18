import {
	getAuth0AccessToken,
	getLocalStorageItem,
	setLocalStorageItem
} from "@/utils/localStorageUtil"
import { NextRequest, NextResponse } from "next/server"

const mockGetAccessToken = jest.fn()
jest.mock("@auth0/nextjs-auth0", () => ({
	getAccessToken: jest.fn((...params) => mockGetAccessToken(...params))
}))

describe("localStorageUtil", () => {
	let spyLocalStorageGetItem: jest.SpyInstance
	let spyLocalStorageSetItem: jest.SpyInstance
	// getLocalStorageItem
	beforeEach(() => {
		spyLocalStorageGetItem = jest.spyOn(Storage.prototype, "getItem")
		spyLocalStorageSetItem = jest.spyOn(Storage.prototype, "setItem")
	})
	afterEach(() => {
		jest.restoreAllMocks()
	})

	describe("getLocalStorageItem", () => {
		it("should successfully run and get item using localStorage", () => {
			spyLocalStorageGetItem.mockReturnValue("targetToken")
			const response = getLocalStorageItem("accessToken")
			expect(spyLocalStorageGetItem).toHaveBeenCalledWith("accessToken")
			expect(response).toEqual("targetToken")
		})

		it("should successfully run and return undefined if no data found", () => {
			spyLocalStorageGetItem.mockReturnValue(undefined)
			const response = getLocalStorageItem("accessToken")
			expect(spyLocalStorageGetItem).toHaveBeenCalledWith("accessToken")
			expect(response).not.toBeDefined()
		})
	})
	// getAuth0AccessToken
	describe("getAuth0AccessToken", () => {
		it("should successfully run and get item using getAccessToken", async () => {
			const targetResponse = {
				accessToken: "targetToken"
			}
			mockGetAccessToken.mockReturnValue(targetResponse)
			const response = await getAuth0AccessToken(
				{} as NextRequest,
				{} as NextResponse
			)
			expect(mockGetAccessToken).toHaveBeenCalledWith({}, {}, {})
			expect(response).toEqual(targetResponse.accessToken)
		})

		it("should successfully run and return undefined if no data found", async () => {
			mockGetAccessToken.mockReturnValue({ accessToken: undefined })
			const response = await getAuth0AccessToken(
				{} as NextRequest,
				{} as NextResponse
			)
			expect(mockGetAccessToken).toHaveBeenCalledWith({}, {}, {})
			expect(response).toBeUndefined()
		})
	})
	// setLocalStorageItem
	describe("setLocalStorageItem", () => {
		it("should successfully set item using localStorage", () => {
			setLocalStorageItem("accessToken", "targetToken")
			expect(spyLocalStorageSetItem).toHaveBeenCalledWith(
				"accessToken",
				"targetToken"
			)
		})
	})
	// common validation for window object
	describe("common Test Scenario", () => {
		beforeAll(() => {
			Object.defineProperty(global, "window", { value: undefined })
		})
		it("should return null if window is not defined ", () => {
			const getResponse = getLocalStorageItem("accessToken")
			expect(spyLocalStorageGetItem).not.toHaveBeenCalled()
			expect(getResponse).toBeNull()
			expect(setLocalStorageItem("accessToken", "targetToken")).toBeNull()
			expect(spyLocalStorageSetItem).not.toHaveBeenCalled()
		})
		afterAll(() => {
			Object.defineProperty(global, "window", { value: global.window })
		})
	})
})
