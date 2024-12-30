import React from "react"

const AccessDeniedComponent = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			<div className="flex flex-col items-center justify-center w-full h-screen text-red-600 text-xl">
				<h1>Access Denied</h1>
				<p>You must have the correct role to view this page</p>
			</div>
		</div>
	)
}

export default AccessDeniedComponent
