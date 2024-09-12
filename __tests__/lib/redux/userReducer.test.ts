import { UserActionType, userReducer, UserState } from "@/lib/redux/userReducer"

const mockInitialState: UserState = {
	users: [],
	loading: false,
	error: undefined
}
const mockUserData = [
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
describe("userReducer", () => {
	it("should return initial state", () => {
		expect(userReducer(undefined, {} as UserActionType<any>)).toEqual(
			mockInitialState
		)
	})

	it("should return state with loading when start fetching request", () => {
		expect(
			userReducer(mockInitialState, { type: "FETCH_USERS_REQUEST" })
		).toEqual({
			...mockInitialState,
			loading: true
		})
	})
	it("should return state for success response", () => {
		expect(
			userReducer(mockInitialState, {
				type: "FETCH_USERS_SUCCESS",
				payload: mockUserData
			})
		).toEqual({
			...mockInitialState,
			users: mockUserData
		})
	})
	it("should return state for failure response", () => {
		const expectedErr = new Error("Something went wrong!")
		expect(
			userReducer(mockInitialState, {
				type: "FETCH_USERS_FAILURE",
				payload: expectedErr
			})
		).toEqual({
			...mockInitialState,
			users: [],
			error: expectedErr
		})
	})
})
