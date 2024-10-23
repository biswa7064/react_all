"use server"
import { redirect, RedirectType } from "next/navigation"

export async function redirectToPage(
	returnUrl = "",
	replace = RedirectType.replace
) {
	const encodedReturnUrl = encodeURIComponent(returnUrl)
	redirect(`/${encodedReturnUrl}`, replace)
}
