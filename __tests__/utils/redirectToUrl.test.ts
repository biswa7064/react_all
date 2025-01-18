import { redirectToUrl } from "@/utils/redirectToUrl"
import { RedirectType } from "next/navigation"
const mockRedirect = jest.fn()
jest.mock("next/navigation", () => ({
	redirect: (url: string, replace: RedirectType) => mockRedirect(url, replace),
	RedirectType: {
		replace: "replace",
		push: "push"
	}
}))
describe("redirectToUrl", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should successful call redirectToUrl method with proper endpoints", async () => {
		const mockUrl = "example/target-url"
		await redirectToUrl(mockUrl)
		const encodedReturnUrl = encodeURIComponent(mockUrl)
		// should take the default RedirectType="replace"
		expect(mockRedirect).toHaveBeenCalledWith(
			`${decodeURIComponent(encodedReturnUrl)}`,
			RedirectType.replace
		)
	})

	it("should successful call redirectToUrl method with proper endpoints and RedirectType", async () => {
		const mockUrl = "example/target-url"
		await redirectToUrl(mockUrl)
		const encodedReturnUrl = encodeURIComponent(mockUrl)
		// should take the RedirectType="push"
		expect(mockRedirect).toHaveBeenCalledWith(
			`${decodeURIComponent(encodedReturnUrl)}`,
			RedirectType.replace
		)
	})
})
