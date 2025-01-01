import { getAccessToken } from "@auth0/nextjs-auth0"

export const getLocalStorageItem = (key: string) => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(key)
	}
	return null
}

export const getAuth0AccessToken = async () => {
	const { accessToken } = await getAccessToken()
	return accessToken ?? undefined
}

export const setLocalStorageItem = (key: string, value: string) => {
	typeof window !== "undefined" && localStorage.setItem(key, value)
}
