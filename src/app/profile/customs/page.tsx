"use client"
import ProfileComponent from "@/components/profile/ProfileComponent"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useRouter } from "next/navigation"
import { useMemo } from "react"

const routes = {
	loggedIn: "/api/auth/custom_login",
	loggedOut: "/api/auth/custom_logout"
}
function ProfilePage() {
	const router = useRouter()
	const { user, isLoading } = useUser()
	const isLoggedIn = useMemo(() => Boolean(user), [user])

	return (
		<ProfileComponent
			isLoading={isLoading}
			user={user}
			isLoggedIn={isLoggedIn}
			isCustom={true}
			customLogin={() => router.push(routes.loggedIn)}
			customLogout={() => {
				router.push(routes.loggedOut)
			}}
		/>
	)
}

export default ProfilePage
