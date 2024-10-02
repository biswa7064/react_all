import { combineReducers, Reducer } from "redux"
import { userReducer } from "./userReducer"
import { feedbackReducer } from "./feedbackReducer"
import { multipleAsyncReducer } from "./multipleAsyncReducer"

export interface RootReducerType {
	user: typeof userReducer
	feedback: typeof feedbackReducer
	cartProducts: typeof multipleAsyncReducer
}
const rootReducer = combineReducers<Partial<RootReducerType>>({
	user: userReducer,
	feedback: feedbackReducer,
	cartProducts: multipleAsyncReducer
})

export default rootReducer
