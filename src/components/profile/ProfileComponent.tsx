"use client"
import Image from "next/image"
import Link from "next/link"

interface ProfileComponentProps {
	user: any
	isLoading?: boolean
	isLoggedIn?: boolean
	loggedInRoute?: string
	loggedOutRoute?: string
	isCustom?: boolean
	customLogout?: () => void
	customLogin?: () => void
}
// make all keys optional except user
type PartialProfileComponentProps = Partial<
	Omit<ProfileComponentProps, "user">
> & {
	user: ProfileComponentProps["user"]
}
export default function ProfileComponent({
	isLoading,
	user,
	isLoggedIn,
	loggedInRoute,
	loggedOutRoute,
	isCustom = false,
	customLogout,
	customLogin
}: PartialProfileComponentProps) {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
			{isLoading ? (
				<div className="flex items-center justify-center w-full h-full text-blue-600 text-xl">
					Loading...
				</div>
			) : (
				<div className="bg-white rounded-lg shadow-md w-full max-w-md overflow-hidden">
					<div className="text-center p-6 bg-gray-50">
						<div className="w-24 h-24 rounded-full bg-gray-300 mx-auto mb-4 overflow-hidden">
							{user?.picture && (
								<Image
									src={user?.picture}
									alt="User avatar"
									className="w-full h-full object-cover"
									width={96}
									height={96}
								/>
							)}
						</div>
						<h2 className="text-2xl font-bold text-gray-800">
							{user?.name || "Your Name"}
						</h2>
						<p className="text-gray-500">
							{user?.email || "example@gmail.com"}
						</p>
					</div>
					<div className="p-6 space-y-6">
						<div>
							<h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
							<p className="text-gray-600">
								Frontend developer passionate about creating beautiful and
								functional user interfaces.
							</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Location
							</h3>
							<p className="text-gray-600">San Francisco, CA</p>
						</div>
						<div>
							<h3 className="text-lg font-semibold text-gray-800 mb-2">
								Skills
							</h3>
							<div className="flex flex-wrap gap-2">
								{["React", "TypeScript", "Tailwind CSS", "Next.js"].map(
									(skill) => (
										<span
											key={skill}
											className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded"
										>
											{skill}
										</span>
									)
								)}
							</div>
						</div>
					</div>
					<div className="px-6 py-4 bg-gray-50 flex justify-center">
						{!isCustom && loggedInRoute && loggedOutRoute ? (
							<Link href={isLoggedIn ? loggedOutRoute : loggedInRoute}>
								<button
									type="button"
									disabled={isLoading}
									className={`px-4 py-2 ${
										isLoggedIn
											? "bg-red-600 hover:bg-red-700"
											: "bg-blue-600 hover:bg-blue-700"
									} text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
								>
									{isLoggedIn ? "Logout" : "Login"}
								</button>
							</Link>
						) : (
							<button
								type="button"
								disabled={isLoading}
								className={`px-4 py-2 ${
									isLoggedIn
										? "bg-red-600 hover:bg-red-700"
										: "bg-blue-600 hover:bg-blue-700"
								} text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out`}
								onClick={
									isLoggedIn
										? customLogout && customLogout
										: customLogin && customLogin
								}
							>
								{isLoggedIn ? "Logout" : "Login"}
							</button>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
