interface LoadingUIPropType {
	isLoading: boolean
}
export default function LoadingUI({ isLoading }: LoadingUIPropType) {
	if (!isLoading) return
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-inherit w-full">
			<div className="p-8 bg-white dark:bg-gray-900 rounded-lg shadow-md">
				<p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
					Loading...
				</p>
				<p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
					Please wait while we fetch your data.
				</p>
			</div>
		</div>
	)
}
