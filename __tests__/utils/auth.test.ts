import { redirectToLogin } from "@/utils/auth"
import { act, waitFor } from "@testing-library/react"
import { redirect, RedirectType } from "next/navigation"
jest.mock("next/navigation")
const mockRedirect = jest.mocked(redirect)
describe("util:redirectToLogin", () => {
	beforeEach(() => {
		jest.resetAllMocks()
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
	it("should call redirect method with returnUrl", async () => {
		const returnUrl = "/return-url"
		await act(async () => {
			redirectToLogin(returnUrl)
		})
		await waitFor(() => {
			expect(mockRedirect).toHaveBeenCalledTimes(1)
			expect(mockRedirect).toHaveBeenCalledWith(
				`/login?returnUrl=${encodeURIComponent(returnUrl)}`,
				RedirectType.replace
			)
		})
	})
})
