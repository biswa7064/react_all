"use client"
import React from "react"
import WithAuth from "./hoc/WithAuth"

const Profile = () => {
	return <div data-testid="profile-root">Profile</div>
}

export default WithAuth(["user"])(Profile)
