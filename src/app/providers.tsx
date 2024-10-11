"use client"
import { AuthProvider } from "@/context/AuthContext"
import React, { FC, ReactNode } from "react"

const Providers: FC<{ children: ReactNode }> = ({ children }) => {
	return <AuthProvider>{children}</AuthProvider>
}

export default Providers
