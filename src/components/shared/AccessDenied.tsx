import { XCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { redirectToLogin } from "@/utils/auth"

export default function AccessDenied() {
	const pathName = usePathname()
	return (
		<div
			className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8"
			data-testid="denied-root"
		>
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<XCircle className="mx-auto h-16 w-16 text-red-600" />
					<h2 className="mt-6 text-3xl font-extrabold text-gray-900">
						Access Denied
					</h2>
					<p className="mt-2 text-sm text-gray-600">
						{"Sorry, you don't have permission to access this page."}
					</p>
				</div>
				<div className="mt-8">
					<button
						type="button"
						onClick={() => redirectToLogin(pathName)}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Go to Login Page
					</button>
				</div>
			</div>
		</div>
	)
}
