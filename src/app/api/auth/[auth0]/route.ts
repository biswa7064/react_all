// app/api/auth/[auth0]/route.js
import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

export const GET = handleAuth({
	custom_logout: handleLogout({ returnTo: "/" }),
	custom_login: handleLogin({ returnTo: "/profile/customs" })
})
