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
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)
export interface StoreType {
	AppStore: typeof store
	AppDispatch: (typeof store)["dispatch"]
	AppState: ReturnType<(typeof store)["getState"]>
	RootReducerType: ReturnType<typeof rootReducer>
}

export const useAppDispatch: () => StoreType["AppDispatch"] = useDispatch
export const useAppSelector: TypedUseSelectorHook<
	StoreType["RootReducerType"]
> = useSelector
export const useAppStore: () => StoreType["AppStore"] = useStore
export default store
