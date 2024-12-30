import withRole from "@/components/hocs/withRole"
import React from "react"

const AdminPage = () => {
	return <div>AdminPage</div>
}

export default withRole(AdminPage, { role: "admin" })
