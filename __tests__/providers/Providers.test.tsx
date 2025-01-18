import Providers from "@/providers/Providers"
import { useUser } from "@auth0/nextjs-auth0/client"
import {
	cleanup,
	render,
	renderHook,
	screen,
	waitFor
} from "@testing-library/react"
import * as Auth0Client from "@auth0/nextjs-auth0/client"

const MockComponent = () => {
	const { user } = useUser()
	return (
		<div>
			<p>{user?.name ? "LoggedIn" : "Not LoggedIn"}</p>
		</div>
	)
}

describe("Providers", () => {
	let spyUseUser: jest.SpyInstance
	beforeEach(() => {
		jest.restoreAllMocks()
		spyUseUser = jest.spyOn(Auth0Client, "useUser")
	})
	afterEach(() => cleanup())
	it("should return values for wrapped component", () => {
		render(
			<Providers>
				<MockComponent />
			</Providers>
		)
		waitFor(() => {
			expect(screen.getByText("Not LoggedIn")).toBeInTheDocument()
		})
	})

	it("should test valid user functionality", () => {
		spyUseUser.mockReturnValue({
			user: { name: "Test Name" }
		} as Auth0Client.UserContext)
		render(
			<Providers>
				<MockComponent />
			</Providers>
		)
		waitFor(() => {
			expect(screen.queryByText("LoggedIn")).toBeInTheDocument()
		})
	})

	it("should return for undefined user details", () => {
		const { result } = renderHook(() => useUser(), { wrapper: Providers })
		waitFor(() => {
			expect(result.current.user).toBeUndefined()
		})
	})
})
