"use client"
import React from "react"
import WithAuth from "./hoc/WithAuth"

const Dashboard = () => {
	return <div data-testid="dashboard-root">Dashboard</div>
}

export default WithAuth(["admin"])(Dashboard)
