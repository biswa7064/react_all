import getConfig from "next/config"
export const mockGetConfig = jest.fn()
jest.mock("next/config", () => () => ({
	getConfig: mockGetConfig.mockReturnValue({
		publicRuntimeConfig: {
			apiBaseUrl: "/"
		}
	})
}))

export default getConfig
