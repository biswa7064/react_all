"use client"
import FeedbackButton from "@/components/core/FeedBackWithButton"
import LoadingUI from "@/components/core/LoadingUI"
import { useAppDispatch, useAppSelector } from "@/lib/redux"
import { useEffect } from "react"

function Home() {
	const { loading, users } = useAppSelector((state) => state.user)
	const dispatch = useAppDispatch()
	useEffect(() => {
		let isMount = true
		isMount && dispatch({ type: "FETCH_USERS_REQUEST" })
		return () => {
			isMount = false
		}
	}, [dispatch])

	console.log({ users })

	return (
		<main className="flex min-h-screen flex-col items-center p-2">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
					React All Features&nbsp;
					<code className="font-mono font-bold">ReactApp</code>
				</p>
				<FeedbackButton />
			</div>
			{loading ? (
				<LoadingUI isLoading={loading} />
			) : (
				<div className="mb-32 mt-10 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
					{users?.map((item) => (
						<div
							className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 flex flex-col overflow-clip overflow-y-auto"
							key={item?.id}
						>
							<h2 className="mb-3 text-2xl font-semibold">
								{`${item?.name?.firstname} ${item?.name?.lastname}`}{" "}
							</h2>
							<p className="m-0 max-w-[30ch] text-sm opacity-50">
								Email: {item?.email}
							</p>
							<p className="m-0 max-w-[30ch] text-sm opacity-50">
								Address:{" "}
								{`${item?.address?.city}, ${item?.address?.street}, ${item?.address?.zipcode}`}
							</p>
						</div>
					))}
				</div>
			)}
		</main>
	)
}

export default Home
