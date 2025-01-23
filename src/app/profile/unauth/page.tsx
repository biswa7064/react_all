import Link from "next/link"
import { AlertCircle } from "lucide-react"
import ProfileButton from "@/components/home/ProfileButton"

export default function Unauthorized() {
	return (
		<div
			className="min-h-screen flex items-center justify-center bg-gray-100"
			data-testid="unauth-page"
		>
			<div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
				<div className="text-center">
					<AlertCircle className="mx-auto h-12 w-12 text-red-500" />
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Unauthorized Access
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{`Your access token is invalid or you don't have permission to view this page.`}
					</p>
				</div>
				<div className="mt-8 flex flex-col items-center">
					<div className="text-sm text-center">
						<p className="font-medium text-gray-700">
							Please log in with valid credentials to access this page.
						</p>
					</div>
					<div>
						<Link href="/profile" passHref>
							<ProfileButton btnMsg="Go to Login Page" />
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
