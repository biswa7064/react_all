import Image from "next/image"
import React from "react"
import png1 from "../../assets/biswa7064.png"

const page = () => {
	return (
		<div
			className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
			data-testid="profile-page-root"
		>
			<div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
				<div className="md:flex">
					<div className="md:flex-shrink-0 h-48 p-1 overflow-y-hidden">
						<Image
							className="w-full object-cover md:w-48 h-100"
							src={png1}
							alt="Profile picture"
							width={192}
							height={192}
						/>
					</div>
					<div className="p-8">
						<div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
							Premium Member
						</div>
						<h1 className="mt-1 text-3xl font-bold text-gray-900">
							Biswaranjan Das
						</h1>
						<p className="mt-2 text-gray-600">
							Software Engineer | Tech Enthusiast | Coffee Lover
						</p>
					</div>
				</div>
				<div className="px-8 py-6 border-t border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
					<p className="text-gray-600">
						{`I'm a passionate software engineer with 5 years of experience in web
						development. I love creating user-friendly applications and
						exploring new technologies. When I'm not coding, you can find me
						hiking in the mountains or trying out new coffee shops.`}
					</p>
				</div>
				<div className="px-8 py-6 border-t border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
					<div className="flex flex-wrap gap-2">
						{["JavaScript", "React", "Node.js", "Python", "Docker", "AWS"].map(
							(skill) => (
								<span
									key={skill}
									className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
								>
									{skill}
								</span>
							)
						)}
					</div>
				</div>
				<div className="px-8 py-6 border-t border-gray-200">
					<h2 className="text-xl font-semibold text-gray-900 mb-4">
						Contact Information
					</h2>
					<ul className="text-gray-600">
						<li className="mb-2">
							<span className="font-semibold">Email:</span> jane.doe@example.com
						</li>
						<li className="mb-2">
							<span className="font-semibold">Location:</span> San Francisco, CA
						</li>
						<li>
							<span className="font-semibold">GitHub:</span>{" "}
							<a
								href="https://github.com/janedoe"
								className="text-indigo-500 hover:underline"
							>
								github.com/janedoe
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default page
