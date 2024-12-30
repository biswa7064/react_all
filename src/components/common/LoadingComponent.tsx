export default function Loading() {
	return (
		<div className="flex items-center justify-center w-full h-full">
			<div className="relative w-12 h-12">
				<div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
				<div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
			</div>
			<span className="sr-only">Loading...</span>
		</div>
	)
}
