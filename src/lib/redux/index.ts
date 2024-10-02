import { applyMiddleware, createStore, Store } from "redux"
import rootSaga from "../sagas"
import createSagaMiddleware from "redux-saga"
import rootReducer, { RootReducerType } from "./rootReducer"
import {
	TypedUseSelectorHook,
	useDispatch,
	useSelector,
	useStore
} from "react-redux"
const sagaMiddleware = createSagaMiddleware()
const store: Store<Partial<RootReducerType>, any> = createStore(
	rootReducer,
	applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
export interface StoreType {
	AppStore: typeof store
	AppDispatch: (typeof store)["dispatch"]
	AppState: ReturnType<(typeof store)["getState"]>
	RootReducerType: ReturnType<typeof rootReducer>
}

export const useAppDispatch: () => StoreType["AppDispatch"] = useDispatch
export const useAppSelector: TypedUseSelectorHook<{
	[K in keyof StoreType["RootReducerType"]]-?: StoreType["RootReducerType"][K]
}> = useSelector
export const useAppStore: () => StoreType["AppStore"] = useStore
export default store
