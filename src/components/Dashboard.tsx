"use client"
import React from "react"
import WithAuth from "./hoc/WithAuth"

const Dashboard = () => {
	return <div>Dashboard</div>
}

export default WithAuth(["admin"])(Dashboard)
