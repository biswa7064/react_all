import { render } from "@testing-library/react"
import ProtectProfileLayout from "@/app/role/protectedProfile/layout"
describe("ProtectedProfileLayout", () => {
	it("should render the layout for protected profile", () => {
		render(
			<ProtectProfileLayout>
				<div>
					<h1>Protected profile</h1>
				</div>
			</ProtectProfileLayout>
		)
		const heading = document.querySelector("h1")
		expect(heading).toHaveTextContent(/Protected profile/i)
	})
})
