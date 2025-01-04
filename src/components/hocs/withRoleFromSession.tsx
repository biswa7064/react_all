import { getSession, Session } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import React from "react"
import { AccessDeniedComponent } from "@/components/common"

export interface WithRoleProps {
	role: string
}
export interface UserSession extends Session {
	user: {
		[key: string]: string | string[] | boolean
		sub: string
	}
}
export default function withRole(Component: NextPage, { role }: WithRoleProps) {
	return async function RoleBasedComponent(
		props: React.ComponentProps<typeof Component>
	): Promise<React.ReactNode> {
		const session = (await getSession()) as UserSession

		if (!session || !session?.user || !session.user.sub) {
			return <AccessDeniedComponent />
		}
		const { user } = session
		const roles = user[`${process.env.AUTH0_NAMESPACE}/roles`] ?? []
		if (
			!Array.isArray(roles) ||
			(Array.isArray(roles) && !roles.includes(role))
		) {
			return <AccessDeniedComponent />
		}
		return <Component {...props} />
	}
}
