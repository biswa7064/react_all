"use client"
import ProfileComponent from "@/components/profile/ProfileComponent"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useMemo } from "react"

const routes = {
	loggedOut: "/api/auth/logout",
	loggedIn: "/api/auth/login?returnTo=/profile"
}
export default function ProfilePage() {
	const { user, isLoading } = useUser()
	const isLoggedIn = useMemo(() => Boolean(user), [user])
	return (
		<ProfileComponent
			isLoading={isLoading}
			user={user}
			isLoggedIn={isLoggedIn}
			loggedInRoute={routes.loggedIn}
			loggedOutRoute={routes.loggedOut}
		/>
	)
}
