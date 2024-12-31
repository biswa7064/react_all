import { getSession, Session } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import React from "react"
import { AccessDeniedComponent } from "@/components/common"
import getConfig from "next/config"

const { publicRuntimeConfig } = getConfig()
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
	return async function RoleBasedComponent(
		props: React.ComponentProps<typeof Component>
	): Promise<React.ReactNode> {
		const session = (await getSession()) as UserSession
		if (!session || !session?.user || !session.user.sub) {
			return <AccessDeniedComponent />
		}
		let roles: string[] | { error: string }
		try {
			roles = await fetch(
				`${publicRuntimeConfig.apiBaseUrl}/api/role?userId=${session.user.sub}`
			).then((res) => res.json())
		} catch (error) {
			roles = []
		}
		if (
			!(roles instanceof Array) ||
			(roles instanceof Array && !roles.includes(role))
		) {
			return <AccessDeniedComponent />
		}
		return <Component {...props} />
	}
}
