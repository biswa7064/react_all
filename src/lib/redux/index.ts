import { composeWithDevTools } from "@redux-devtools/extension/lib/types/logOnly"
import { applyMiddleware, createStore } from "redux"
import rootSaga from "../sagas"
import createSagaMiddleware from "redux-saga"
import rootReducer from "./rootReducer"
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore
} from "react-redux"
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga)
export interface StoreType {
	AppStore: typeof store
	AppDispatch: (typeof store)["dispatch"]
	AppState: ReturnType<(typeof store)["getState"]>
}

export const useAppDispatch: () => StoreType["AppDispatch"] = useDispatch
export const useAppSelector: TypedUseSelectorHook<StoreType["AppState"]> =
	useSelector
export const useAppStore: () => StoreType["AppStore"] = useStore
export default store
