import { combineReducers } from "redux"
import { userReducer } from "./userReducer"
import { feedbackReducer } from "./feedbackReducer"
import { multipleAsyncReducer } from "./multipleAsyncReducer"

export interface RootReducerType {
	user: typeof userReducer
}
const rootReducer = combineReducers({
	user: userReducer,
	feedback: feedbackReducer,
	cartProducts: multipleAsyncReducer
})

export default rootReducer
