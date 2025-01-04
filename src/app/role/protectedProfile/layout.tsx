import { NextPage } from "next"
import React, { ReactNode } from "react"

const layout: NextPage<{ children: ReactNode }> = ({ children }) => {
	return (
		<div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
			{children}
		</div>
	)
}

export default layout
