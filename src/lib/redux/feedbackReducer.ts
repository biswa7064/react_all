import { Action } from "redux"

export const feedBackAction = {
	START_OPERATION: "START_OPERATION",
	CANCEL_OPERATION: "CANCEL_OPERATION",
	OPERATION_SUCCESS: "OPERATION_SUCCESS",
	OPERATION_FAILURE: "OPERATION_FAILURE",
	OPERATION_CANCELLED: "OPERATION_CANCELLED"
} as const

interface FeedbackStateType {
	isLoading: boolean
	message: string
	error?: string
}

const feedbackState: FeedbackStateType = {
	isLoading: false,
	message: "",
	error: undefined
}

export const feedbackReducer = (
	state: FeedbackStateType = feedbackState,
	action: Action<keyof typeof feedBackAction> & { payload?: any }
) => {
	switch (action.type) {
		case "START_OPERATION":
			return { ...state, isLoading: true, message: null, error: null }
		case "OPERATION_SUCCESS":
			return {
				...state,
				isLoading: false,
				message: action.payload,
				error: null
			}
		case "OPERATION_FAILURE":
			return {
				...state,
				isLoading: false,
				message: null,
				error: action.payload
			}
		case "OPERATION_CANCELLED":
			return {
				...state,
				isLoading: false,
				message: "Operation Cancelled",
				error: null
			}
		default:
			return state
	}
}
