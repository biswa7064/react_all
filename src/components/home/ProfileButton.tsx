"use client"
import { redirectToUrl } from "@/utils/redirectToUrl"

export default function ProfileButton<
	PT extends { url?: string; btnMsg?: string }
>(props: PT) {
	return (
		<button
			className="mt-8 px-3 py-2 text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700"
			onClick={async () =>
				props?.url ? redirectToUrl(props?.url) : redirectToUrl("/profile")
			}
			type="button"
		>
			{props?.btnMsg ? props.btnMsg : "Go to Profile"}
		</button>
	)
}
