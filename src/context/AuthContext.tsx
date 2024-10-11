"use client"
import { UserRoles } from "@/utils/constants"
import {
	createContext,
	FC,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState
} from "react"

export type UserRole = keyof typeof UserRoles
export interface UseAuthType {
	user: {
		role: UserRole
		isAuthenticated: boolean
	}
	login: (role: UserRole) => void
	logout: () => void
	userLoading: boolean
}
const defaultValue: UseAuthType = {
	user: {
		role: "guest",
		isAuthenticated: true
	},
	login: () => {},
	logout: () => {},
	userLoading: true
}
export const AuthContext = createContext(defaultValue)

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<(typeof defaultValue)["user"]>({
		role: "guest",
		isAuthenticated: true
	})
	const [userLoading, setUserLoading] = useState(true)
	const login = (role: UserRole) => {
		localStorage.setItem(
			"user",
			JSON.stringify({ role, isAuthenticated: true })
		)
		setUser((pre) => ({ ...pre, role, isAuthenticated: true }))
	}
	const logout = () => {
		localStorage.setItem(
			"user",
			JSON.stringify({ role: "guest", isAuthenticated: true })
		)
		setUser({ role: "guest", isAuthenticated: true })
	}
	useEffect(() => {
		let isMount = true
		const userFromStorage = JSON.parse(
			localStorage.getItem("user") ?? JSON.stringify({})
		)
		isMount &&
			setUser((pre) => ({
				...pre,
				role: userFromStorage?.role ?? user?.role,
				isAuthenticated:
					userFromStorage?.isAuthenticated ?? user?.isAuthenticated
			}))
		isMount && setUserLoading(false)
		return () => {
			isMount = false
		}
	}, [user?.role, user?.isAuthenticated, userLoading])
	const value: UseAuthType = useMemo(
		() => ({ user, login, logout, userLoading }),
		[user, userLoading]
	)
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)
