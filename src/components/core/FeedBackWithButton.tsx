"use client"

import { useState } from "react"
import { Button, Label, Textarea, Input } from "@/components/ui"
import { useAppDispatch, useAppSelector } from "@/lib/redux"

export default function FeedbackButton() {
	const { isLoading, message } = useAppSelector((state) => state.feedback)
	const dispatch = useAppDispatch()
	const [isOpen, setIsOpen] = useState(false)
	const [rating, setRating] = useState("5")
	const [feedback, setFeedback] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch({ type: "START_OPERATION" })
		console.log("Submitted:", { rating, feedback })
		// setIsOpen(false)
		setRating("5")
		setFeedback("")
	}

	return (
		<div className="relative">
			<Button onClick={() => setIsOpen(true)}>Give Feedback</Button>

			{isOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white rounded-lg p-8 max-w-md w-full">
						<h2 className="text-2xl font-bold mb-4 text-black">
							Provide Feedback
						</h2>
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<Label htmlFor="rating" className="block mb-2 text-black">
									Rating
								</Label>
								<Input
									type="number"
									id="rating"
									min="1"
									max="5"
									value={rating}
									onChange={(e) => {
										let val = e.target.value
										if (Number(val) > 5) {
											val = "5"
										}
										setRating(val)
									}}
									className="w-full text-black"
								/>
							</div>
							<div className="mb-4">
								<Label htmlFor="feedback" className="block mb-2 text-black">
									Feedback
								</Label>
								<Textarea
									id="feedback"
									value={feedback}
									onChange={(e) => setFeedback(e.target.value)}
									className="w-full text-black"
									rows={4}
								/>
							</div>
							<div className="flex justify-end space-x-2">
								<Button
									type="button"
									variant="outline"
									onClick={() => dispatch({ type: "CANCEL_OPERATION" })}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={isLoading}>
									{isLoading ? "Submitting..." : "Submit"}
								</Button>
							</div>
							<div className="flex justify-end space-x-2">
								{message && (
									<Label htmlFor="feedback" className="block mb-2 text-black">
										{message}
									</Label>
								)}
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	)
}
