"use client"
import React from "react"
import WithAuth from "./hoc/WithAuth"

const Settings = () => {
	return <div>Settings</div>
}

export default WithAuth(["admin"])(Settings)
