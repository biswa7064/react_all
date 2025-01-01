import { getSession, Session } from "@auth0/nextjs-auth0"
import { NextPage } from "next"
import React from "react"
import { AccessDeniedComponent } from "@/components/common"
import getConfig from "next/config"
import { AxiosLib } from "@/lib/axios.lib"

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
const axiosLib = new AxiosLib()
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
			const response = await axiosLib.get(
				`${publicRuntimeConfig.apiBaseUrl}/api/role?userId=${session.user.sub}`
			)
			roles = response?.data
		} catch (error) {
			roles = []
		}
		if (
			!Array.isArray(roles) ||
			(Array.isArray(roles) && !roles.includes(role))
		) {
			return <AccessDeniedComponent />
		}
		return <Component {...props} />
	}
}
