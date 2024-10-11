"use client"
import React from "react"
import WithAuth from "./hoc/WithAuth"

const Profile = () => {
	return <div>Profile</div>
}

export default WithAuth(["admin", "user"])(Profile)
