import {
	MultipleActionType,
	multipleApiAction
} from "@/lib/redux/multipleAsyncReducer"
import {
	fetchProductCartSaga,
	watchCartProducts
} from "@/lib/sagas/multipleSaga"
import * as productService from "@/services/products/productCartService"
import { all, call, put, takeLatest } from "redux-saga/effects"

const mockProductResponseFromApi = [
	{
		id: 1,
		title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		price: 109.95,
		description:
			"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		category: "men's clothing",
		image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
		rating: {
			rate: 3.9,
			count: 120
		}
	}
]
const mockCartResponseFromApi = [
	{
		id: 1,
		userId: 1,
		date: "2020-03-02T00:00:00.000Z",
		products: [
			{
				productId: 1,
				quantity: 4
			},
			{
				productId: 2,
				quantity: 1
			},
			{
				productId: 3,
				quantity: 6
			}
		]
	}
]
const mockUserServiceGet = jest.fn()
jest.mock("@/services/user", () => ({
	getUsers: () => mockUserServiceGet
}))

describe("userSaga", () => {
	let action: MultipleActionType<any>
	let generator: Generator
	let takeLatestGenerator: Generator
	beforeEach(() => {
		jest.restoreAllMocks()
		action = { type: multipleApiAction["START_OPERATION_PRODUCTS"] }
		generator = fetchProductCartSaga()
		takeLatestGenerator = watchCartProducts()
	})
	it("should test the saga successfully with multiple api call", () => {
		expect(generator.next().value).toEqual(
			all([call(productService.getProducts), call(productService.getCart)])
		)
	})
	it(`should test ${multipleApiAction.OPERATION_SUCCESS_PRODUCTS} successfully`, () => {
		generator.next() // for first method which is "call" from saga-effect
		expect(
			generator.next([mockProductResponseFromApi, mockCartResponseFromApi])
				.value
		).toEqual(
			put({
				type: multipleApiAction.OPERATION_SUCCESS_PRODUCTS,
				payload: {
					products: mockProductResponseFromApi,
					cartData: mockCartResponseFromApi
				}
			})
		)
		expect(generator.next().done).toBe(true) // always done after one successful implementation
	})
	it(`should test ${multipleApiAction.OPERATION_FAILURE_PRODUCTS} successfully`, () => {
		const expectedError = new Error("something went wrong!")
		generator.next() // for first method which is "call" from saga-effect
		const throwGenerator = generator.throw(expectedError)
		expect(throwGenerator.value).toEqual(
			put({
				type: multipleApiAction.OPERATION_FAILURE_PRODUCTS,
				payload: expectedError.message
			})
		)
		expect(generator.next().done).toBe(true) // always done after one successful implementation
	})

	it("should successfully call the root watchCartProducts saga", () => {
		expect(takeLatestGenerator.next().value).toEqual(
			takeLatest(action.type, fetchProductCartSaga)
		)
		expect(generator.next().done).toBe(false) // all calls are not done here
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
})
