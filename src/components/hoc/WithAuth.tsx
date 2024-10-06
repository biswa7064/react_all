"use client"
import { useAuthContext } from "@/context/AuthContext"
import { UserRoles } from "@/utils/constants"
import React, { FC } from "react"

const WithAuth =
	(roles: Array<keyof typeof UserRoles>) => (WrappedComponent: FC) => {
		const UpdatedComponent = (props: any) => {
			const { user, userLoading } = useAuthContext()
			console.log({ user })
			if (userLoading) return <h1> Loading...</h1>
			return (
				<>
					{!user?.isAuthenticated || !roles.includes(user?.role) ? (
						<h1> Access Denied</h1>
					) : (
						<WrappedComponent {...props} />
					)}
				</>
			)
		}
		return UpdatedComponent
	}

export default WithAuth
