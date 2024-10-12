import { redirectToLogin } from "@/utils/auth"
import { redirect, RedirectType } from "next/navigation"
jest.mock("next/navigation")
const mockRedirect = jest.mocked(redirect)
describe("util:redirectToLogin", () => {
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should redirect to login page without returnUrl", async () => {
		await redirectToLogin()
		expect(redirect).toHaveBeenCalledWith("/login?returnUrl=", "replace")
	})
	it("should call redirect method with returnUrl", async () => {
		const returnUrl = "/return-url"
		await redirectToLogin(returnUrl)
		expect(mockRedirect).toHaveBeenCalledTimes(1)
		expect(mockRedirect).toHaveBeenCalledWith(
			`/login?returnUrl=${encodeURIComponent(returnUrl)}`,
			RedirectType.replace
		)
	})

	it("should handle empty string returnUrl", async () => {
		await redirectToLogin("")
		expect(redirect).toHaveBeenCalledWith("/login?returnUrl=", "replace")
	})
})
