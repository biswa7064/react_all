import { Action, Reducer } from "redux"

export const userAction = {
	FETCH_USERS_REQUEST: "FETCH_USERS_REQUEST",
	FETCH_USERS_SUCCESS: "FETCH_USERS_SUCCESS",
	FETCH_USERS_FAILURE: "FETCH_USERS_FAILURE"
} as const

export interface UserState {
	users: any[]
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

export const userReducer: Reducer<UserState, UserActionType<any>> = (
	state = initialState,
	action
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
