// test react redux with saga calling inside useEffect to retrieve details.
// test the component and check if that useEffect and related Action has called successfully.

import Home from "@/app/page"
import * as rootRedux from "redux"
import { cleanup, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import rootReducer from "@/lib/redux/rootReducer"
const mockAppSelector = jest.fn()
const mockDispatch = jest.fn()

const rootState = {
	user: {
		users: [],
		loading: true,
		error: undefined
	},
	feedback: {
		isLoading: false,
		message: "",
		error: undefined
	}
}

jest.mock("@/lib/redux", () => ({
	...jest.requireActual("@/lib/redux"),
	useAppSelector: jest
		.fn()
		.mockImplementation((state) => mockAppSelector(state)),
	useAppDispatch: jest.fn().mockImplementation(() => mockDispatch)
}))
const createTestStore = (initialState: any) => {
	return rootRedux.createStore(rootReducer, initialState)
}
describe("Home", () => {
	let mockStore: rootRedux.Store
	beforeEach(() => {
		jest.restoreAllMocks()
		mockStore = createTestStore(rootState)
	})
	afterEach(() => {
		cleanup()
		jest.clearAllMocks()
	})
	it("should test success render of Home page with selector and dispatch", () => {
		mockAppSelector.mockImplementation((selector) => {
			return selector(rootState)
		})
		render(
			<Provider store={mockStore}>
				<Home />
			</Provider>
		)
		const homeContainer = screen.getByTestId("home-container")
		expect(homeContainer).toBeInTheDocument()
		expect(mockDispatch).toHaveBeenCalledWith({
			type: "FETCH_USERS_REQUEST"
		})
	})
})
