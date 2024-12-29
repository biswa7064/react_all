import { UserProvider } from "@auth0/nextjs-auth0/client"
import React, { ReactNode } from "react"

const Providers = ({ children }: { children: ReactNode }) => {
	return <UserProvider>{children}</UserProvider>
}

export default Providers
