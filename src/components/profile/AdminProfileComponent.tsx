import React from "react"
import ProfileButton from "@/components/home/ProfileButton"

const AdminProfileComponent = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 flex-col">
			<p className="text-2xl font-bold text-center text-gray-800">
				Admin Profile Component
			</p>
			<ProfileButton btnMsg="Go to Home" url="/" />
		</div>
	)
}

export default AdminProfileComponent
