import { redirectToPage } from "@/utils/redirect"
import { RedirectType } from "next/navigation"
const mockRedirect = jest.fn()
jest.mock("next/navigation", () => ({
	redirect: (url: string, replace: RedirectType) => mockRedirect(url, replace),
	RedirectType: {
		replace: "replace",
		push: "push"
	}
}))
describe("redirectToPage", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should successful call redirectToPage for default endpoint and RedirectType", async () => {
		await redirectToPage()
		const encodedReturnUrl = encodeURIComponent("")
		// should take the default RedirectType="replace" and endpoint=""
		expect(mockRedirect).toHaveBeenCalledWith(
			`/${encodedReturnUrl}`,
			RedirectType.replace
		)
	})
	it("should successful call redirectToPage method with proper endpoints", async () => {
		const mockUrl = "example/target-url"
		await redirectToPage(mockUrl)
		const encodedReturnUrl = encodeURIComponent(mockUrl)
		// should take the default RedirectType="replace"
		expect(mockRedirect).toHaveBeenCalledWith(
			`/${encodedReturnUrl}`,
			RedirectType.replace
		)
	})

	it("should successful call redirectToPage method with proper endpoints and RedirectType", async () => {
		const mockUrl = "example/target-url"
		await redirectToPage(mockUrl, RedirectType.push)
		const encodedReturnUrl = encodeURIComponent(mockUrl)
		// should take the RedirectType="push"
		expect(mockRedirect).toHaveBeenCalledWith(
			`/${encodedReturnUrl}`,
			RedirectType.push
		)
	})
})
