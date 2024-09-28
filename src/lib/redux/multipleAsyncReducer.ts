import { ProductType } from "@/services/products/productCartService"
import { Action } from "redux"

export const multipleApiAction = {
	START_OPERATION_PRODUCTS: "START_OPERATION_PRODUCTS",
	OPERATION_SUCCESS_PRODUCTS: "OPERATION_SUCCESS_PRODUCTS",
	OPERATION_FAILURE_PRODUCTS: "OPERATION_FAILURE_PRODUCTS"
} as const

export interface CartProductStateType {
	isLoading_products: boolean
	productsDetails: { products: ProductType[]; cartData: any[] }
	error_products?: string
}

const cartProductState: CartProductStateType = {
	isLoading_products: false,
	productsDetails: { products: [], cartData: [] },
	error_products: undefined
}

export const multipleAsyncReducer = (
	state: CartProductStateType = cartProductState,
	action: Action<keyof typeof multipleApiAction> & { payload?: any }
) => {
	switch (action.type) {
		case "START_OPERATION_PRODUCTS":
			return {
				...state,
				isLoading_products: true,
				productsDetails: { products: [], cartData: [] },
				error_products: undefined
			}
		case "OPERATION_SUCCESS_PRODUCTS":
			return {
				...state,
				isLoading_products: false,
				productsDetails: {
					...state.productsDetails,
					products: action.payload.products,
					cartData: action.payload.cartData
				},
				error_products: null
			}
		case "OPERATION_FAILURE_PRODUCTS":
			return {
				...state,
				isLoading_products: true,
				productsDetails: { products: [], cartData: [] },
				error_products: action.payload
			}

		default:
			return state
	}
}
