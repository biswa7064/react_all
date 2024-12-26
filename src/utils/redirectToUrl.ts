"use server"
import { redirect, RedirectType } from "next/navigation"

// make util function to redirect to url
export async function redirectToUrl(url: string) {
	const encodedUrl = encodeURIComponent(url)
	const decodedUrl = decodeURIComponent(encodedUrl)
	redirect(`${decodedUrl}`, RedirectType.replace)
}
