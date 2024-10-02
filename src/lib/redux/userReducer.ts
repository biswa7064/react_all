import { Action } from "redux"

export const userAction = {
	FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
	FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
	FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE"
} as const

export interface UserType {
	address: {
		geolocation: any
		city: string
		street: string
		number: number
		zipcode: string
	}
	email: string
	id: number
	name: {
		firstname: string
		lastname: string
	}
	password: string
	phone: string
	username: string
}

export interface UserState {
	users: UserType[]
	loading: boolean
	error?: Error
}

const initialState: UserState = {
	users: [],
	loading: false,
	error: undefined
}

export type UserActionType<PT> = Action<keyof typeof userAction> & {
	payload?: PT
}

export const userReducer = (
	state: UserState = initialState,
	action: UserActionType<any>
) => {
	switch (action.type) {
		case "FETCH_USERS_REQUEST":
			return { ...state, loading: true }
		case "FETCH_USERS_SUCCESS":
			return { ...state, loading: false, users: action.payload }
		case "FETCH_USERS_FAILURE":
			return { ...state, loading: false, error: action.payload as Error }
		default:
			return state
	}
}
