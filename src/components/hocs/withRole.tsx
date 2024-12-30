import { getSession, Session } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import React from "react"
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
	const RoleBasedComponent = async <PT extends Record<string, unknown>>(
		props: PT
	): Promise<React.ReactNode> => {
		const session = (await getSession()) as UserSession
		if (!session || !session?.user) {
			return <p>Access Denied</p>
		}
		const roles = await fetch(
			`${process.env.AUTH0_BASE_URL}/api/role?userId=${session.user.sub}`
		).then((res) => res?.json())
		if (!roles.includes(role)) {
			return <p>Access Denied</p>
		}
		return <Component {...props} />
	}
	return RoleBasedComponent
}
