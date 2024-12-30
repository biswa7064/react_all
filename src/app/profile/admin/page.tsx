import { LoadingComponent } from "@/components/common"
import withRole from "@/components/hocs/withRole"
import { AdminProfileComponent } from "@/components/profile"
import React, { Suspense } from "react"

const AdminPage = () => {
	return (
		<Suspense fallback={<LoadingComponent />}>
			<AdminProfileComponent />
		</Suspense>
	)
}

export default withRole(AdminPage, { role: "admin" })
