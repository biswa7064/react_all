import getConfig from "next/config"
export const mockGetConfig = jest.fn().mockReturnValue({
	publicRuntimeConfig: {
		apiBaseUrl: "/"
	}
})
jest.mock("next/config", () => () => mockGetConfig())

export default getConfig
