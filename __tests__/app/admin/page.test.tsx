import AdminPage from "@/app/profile/admin/page"
import { render, screen, waitFor } from "@testing-library/react"
import { Suspense } from "react"
jest.mock("@/components/common", () => ({
	LoadingComponent: () => <div data-testid="loading-comp">Loading...</div>
}))
jest.mock(
	"@/components/hocs/withRole",
	() =>
		(Component: React.FC, { role }: { role: string }) => {
			const WithRole = (props: React.ComponentProps<typeof Component>) => (
				<div data-testid="with-role-comp" data-role={role}>
					<Component {...props} />
				</div>
			)
			return WithRole
		}
)
describe("AdminPage", () => {
	it("should render AdminPage", async () => {
		const AdminProfilePage = await AdminPage({})
		render(AdminProfilePage, { wrapper: Suspense })
		waitFor(() => {
			expect(screen.findByTestId("loading-comp")).toBeInTheDocument()
			expect(screen.findByTestId("with-role-comp")).not.toBeInTheDocument()
		})
		expect(screen.getByTestId("with-role-comp")).toBeInTheDocument()
		expect(screen.queryByTestId("loading-comp")).toBeNull()
		expect(screen.getByTestId("with-role-comp")).toHaveAttribute(
			"data-role",
			"admin"
		)
	})
})
