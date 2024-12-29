"use client"
import withAuth from "@/components/hocs/withAuth"
import ProfileComponent from "@/components/profile/ProfileComponent"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useMemo } from "react"

const routes = {
	loggedOut: "/api/auth/logout",
	loggedIn: "/api/auth/login?returnTo=/profile"
}

function ProfilePage() {
	const { user } = useUser()
	const isLoggedIn = useMemo(() => Boolean(user), [user])
	return (
		<ProfileComponent
			user={user}
			isLoggedIn={isLoggedIn}
			loggedInRoute={routes.loggedIn}
			loggedOutRoute={routes.loggedOut}
		/>
	)
}

export default withAuth(ProfilePage)
