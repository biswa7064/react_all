import { withRoleFromSession } from "@/components/hocs"
import ProfileButton from "@/components/home/ProfileButton"
import React from "react"

const page = async () => {
	return (
		<div className="p-4 text-gray-700 flex flex-col">
			<h1 className="text-4xl font-bold text-center">Protected Profile</h1>
			<p className="text-center">This is a protected profile page</p>
			<ProfileButton />
		</div>
	)
}

export default withRoleFromSession(page, { role: "admin" })
