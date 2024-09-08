import { combineReducers } from "redux"
import { userReducer } from "./userReducer"

export interface RootReducerType {
	user: typeof userReducer
}
const rootReducer = combineReducers({
	user: userReducer
})

export default rootReducer
