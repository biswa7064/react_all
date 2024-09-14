import { combineReducers } from "redux"
import { userReducer } from "./userReducer"
import { feedbackReducer } from "./feedbackReducer"

export interface RootReducerType {
	user: typeof userReducer
}
const rootReducer = combineReducers({
	user: userReducer,
	feedback: feedbackReducer
})

export default rootReducer
