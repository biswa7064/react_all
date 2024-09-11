import { userAction, UserActionType } from "@/lib/redux/userReducer"
import userSaga, { fetchUserLists } from "@/lib/sagas/userSaga"
import * as userService from "@/services/user"
import { call, put, takeLatest } from "redux-saga/effects"

const mockResponseFromApi = [
	{
		address: {
			geolocation: {
				lat: "-37.3159",
				long: "81.1496"
			},
			city: "kilcoole",
			street: "new road",
			number: 7682,
			zipcode: "12926-3874"
		},
		id: 1,
		email: "john@gmail.com",
		username: "johnd",
		password: "m38rmF$",
		name: {
			firstname: "john",
			lastname: "doe"
		},
		phone: "1-570-236-7033"
	}
]
const mockUserServiceGet = jest.fn()
jest.mock("@/services/user", () => ({
	getUsers: () => mockUserServiceGet
}))

describe("userSaga", () => {
	let action: UserActionType<any>
	let generator: Generator
	let takeLatestGenerator: Generator
	beforeEach(() => {
		jest.restoreAllMocks()
		mockUserServiceGet.mockResolvedValue(mockResponseFromApi)
		action = { type: "FETCH_USERS_REQUEST" }
		generator = fetchUserLists()
		takeLatestGenerator = userSaga()
	})
	it("should test the saga successfully with api call", () => {
		expect(generator.next().value).toEqual(call(userService.getUsers))
	})
	it(`should test ${userAction.FETCH_USERS_SUCCESS} successfully`, () => {
		generator.next() // for first method which is "call" from saga-effect
		expect(generator.next(mockResponseFromApi).value).toEqual(
			put({
				type: userAction.FETCH_USERS_SUCCESS,
				payload: mockResponseFromApi
			})
		)
		expect(generator.next().done).toBe(true) // always done after one successful implementation
	})
	it(`should test ${userAction.FETCH_USERS_FAILURE} successfully`, () => {
		const expectedError = new Error("something went wrong!")
		generator.next() // for first method which is "call" from saga-effect
		const throwGenerator = generator.throw(expectedError)
		expect(throwGenerator.value).toEqual(
			put({
				type: userAction.FETCH_USERS_FAILURE,
				payload: expectedError
			})
		)
		expect(generator.next().done).toBe(true) // always done after one successful implementation
	})

	it("should successfully call the root userSaga", () => {
		expect(takeLatestGenerator.next().value).toEqual(
			takeLatest(action.type, fetchUserLists)
		)
		expect(generator.next().done).toBe(false) // all calls are not done here
	})
	afterEach(() => {
		jest.clearAllMocks()
	})
})
