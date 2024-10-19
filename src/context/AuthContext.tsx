"use client"
import React, { createContext, useContext, useState, useCallback } from "react"

interface AuthContextType {
	isAuthenticated: boolean
	login: () => void
	logout: () => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	const login = useCallback(() => {
		setIsAuthenticated(true)
	}, [])

	const logout = useCallback(() => {
		setIsAuthenticated(false)
	}, [])

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export function useAuth() {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
