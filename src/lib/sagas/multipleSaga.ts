import {
	all,
	AllEffect,
	call,
	CallEffect,
	put,
	PutEffect,
	takeLatest
} from "redux-saga/effects"
import {
	getCart,
	getProducts,
	ProductType
} from "@/services/products/productCartService"

export type GetProductGeneratorType = Generator<
	AllEffect<CallEffect<ProductType[] | any[]>> | PutEffect<any>
>
export function* fetchProductCartSaga(): GetProductGeneratorType {
	try {
		// multiple API call
		const [products, cartData] = yield all([call(getProducts), call(getCart)])
		// set the payload for both results
		yield put({
			type: "OPERATION_SUCCESS_PRODUCTS",
			payload: { products, cartData }
		})
	} catch (error) {
		const errorMsg = (error as Error).message
		yield put({
			type: "OPERATION_FAILURE_PRODUCTS",
			payload: errorMsg
		})
	}
}

export function* watchCartProducts() {
	yield takeLatest("START_OPERATION_PRODUCTS", fetchProductCartSaga)
}
