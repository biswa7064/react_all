"use server"
import { redirect, RedirectType } from "next/navigation"

export async function redirectToLogin(returnUrl = "") {
	const encodedReturnUrl = encodeURIComponent(returnUrl)
	redirect(`/login?returnUrl=${encodedReturnUrl}`, RedirectType.replace)
}
