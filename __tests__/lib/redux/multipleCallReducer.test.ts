import {
	CartProductStateType,
	MultipleActionType,
	multipleAsyncReducer
} from "@/lib/redux/multipleAsyncReducer"

const mockCartProductInitialState: CartProductStateType = {
	isLoading_products: false,
	productsDetails: { products: [], cartData: [] },
	error_products: undefined
}
const mockProductResponse = [
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
const mockCartResponse = [
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
describe(multipleAsyncReducer, () => {
	it("should return initial state", () => {
		expect(
			multipleAsyncReducer(undefined, {} as MultipleActionType<any>)
		).toEqual(mockCartProductInitialState)
	})

	it("should return state with loading when start fetching request", () => {
		expect(
			multipleAsyncReducer(mockCartProductInitialState, {
				type: "START_OPERATION_PRODUCTS"
			})
		).toEqual({
			...mockCartProductInitialState,
			isLoading_products: true
		})
	})
	it("should return state for success response", () => {
		expect(
			multipleAsyncReducer(mockCartProductInitialState, {
				type: "OPERATION_SUCCESS_PRODUCTS",
				payload: { products: mockProductResponse, cartData: mockCartResponse }
			})
		).toEqual({
			...mockCartProductInitialState,
			productsDetails: {
				...mockCartProductInitialState.productsDetails,
				products: mockProductResponse,
				cartData: mockCartResponse
			}
		})
	})
	it("should return state for failure response", () => {
		const expectedErr = new Error("Something went wrong!")
		expect(
			multipleAsyncReducer(mockCartProductInitialState, {
				type: "OPERATION_FAILURE_PRODUCTS",
				payload: expectedErr.message
			})
		).toEqual({
			...mockCartProductInitialState,
			error_products: expectedErr.message
		})
	})
})
