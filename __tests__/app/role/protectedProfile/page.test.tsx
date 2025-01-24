import ProtectedProfilePage from "@/app/role/protectedProfile/page"
import Layout from "@/app/role/protectedProfile/layout"
import { cleanup, render, screen, waitFor } from "@testing-library/react"
import React from "react"
jest.mock("@auth0/nextjs-auth0", () => ({
	getSession: jest.fn()
}))
jest.mock("@/app/role/protectedProfile/layout", () => {
	return function MockLayout({ children }: { children: React.ReactNode }) {
		return <div data-testid="protected-layout">{children}</div>
	}
})
jest.mock("@/components/home/ProfileButton", () => {
	return function ProfileBtn() {
		return (
			<div>
				<button type="button">Profile</button>
			</div>
		)
	}
})

jest.mock("@/components/hocs", () => ({
	withRoleFromSession: (
		Component: () => Promise<React.JSX.Element>,
		{ role }: { role: string }
	) => {
		const WithRoleFromSession = async () => {
			const RenderedComp = await Component()
			return (
				<div data-testid="protected-profile-page">
					{!["admin"].includes(role) ? <div>Access Denied</div> : RenderedComp}
				</div>
			)
		}
		return WithRoleFromSession
	}
}))

describe("ProtectedProfilePage", () => {
	beforeEach(() => {
		jest.clearAllMocks()
		cleanup()
		process.env.AUTH0_NAMESPACE = "test-namespace"
	})
	afterEach(() => {
		delete process.env.AUTH0_NAMESPACE
	})
	it("should render the protected profile page with hoc", async () => {
		const Page = await ProtectedProfilePage({ role: "admin" })
		render(Page, { wrapper: Layout })
		await waitFor(() => {
			expect(screen.getByTestId("protected-profile-page")).toBeInTheDocument()
			expect(screen.getByTestId("protected-layout")).toBeInTheDocument()
		})
	})
})
