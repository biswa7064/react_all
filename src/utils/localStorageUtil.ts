import { getAccessToken } from "@auth0/nextjs-auth0"
import { NextRequest, NextResponse } from "next/server"

export const getLocalStorageItem = (key: string) => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(key)
	}
	return null
}

export const getAuth0AccessToken = async (
	req: NextRequest,
	res: NextResponse,
	config = {}
) => {
	const { accessToken } = await getAccessToken(req, res, config)
	return accessToken ?? undefined
}

export const setLocalStorageItem = (key: string, value: string) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, value)
	}
	return null
}
