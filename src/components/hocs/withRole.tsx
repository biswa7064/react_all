import { getSession, Session } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import React from "react"
import { AccessDeniedComponent } from "@/components/common"
export interface WithRoleProps {
	role: string
}
export interface UserSession extends Session {
	user: {
		[key: string]: string
		sub: string
	}
}
export default function withRole(Component: NextPage, { role }: WithRoleProps) {
	return async function RoleBasedComponent<PT extends Record<string, unknown>>(
		props: PT
	): Promise<React.ReactNode> {
		const session = (await getSession()) as UserSession
		if (!session || !session?.user) {
			return <AccessDeniedComponent />
		}
		const response = await fetch(
			`${process.env.AUTH0_BASE_URL}/api/role?userId=${session.user.sub}`
		)
		const roles = (await response.json()) || []
		if (!roles.includes(role)) {
			return <AccessDeniedComponent />
		}
		return <Component {...props} />
	}
}
