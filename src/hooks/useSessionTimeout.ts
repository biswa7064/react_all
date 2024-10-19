"use client"
import { useAuth } from "@/context"
import { useState, useEffect, useCallback, useRef, useMemo } from "react"

const SESSION_TIMEOUT = 2 * 60 * 1000 // 5 minutes
const WARNING_TIME = 60 * 1000 // 1 minute
const userEvents = ["mousemove", "keydown", "click"]

const useSessionTimeout = () => {
	const { isAuthenticated } = useAuth()
	const [showWarning, setShowWarning] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT)
	const lastActivityRef = useRef(Date.now())
	const timerRef = useRef<number | null>(null)

	const resetTimer = useCallback(() => {
		lastActivityRef.current = Date.now()
		setShowWarning(false)
		setTimeRemaining(SESSION_TIMEOUT)
		timerRef.current && clearInterval(timerRef.current)
		timerRef.current = window.setInterval(() => {
			const now = Date.now()
			const timeSinceLastActivity = now - lastActivityRef.current
			const remainingTime = SESSION_TIMEOUT - timeSinceLastActivity

			if (remainingTime <= 0) {
				timerRef.current && clearInterval(timerRef.current)
				setTimeRemaining(0)
			} else {
				setTimeRemaining(remainingTime)
			}

			if (!showWarning && remainingTime <= WARNING_TIME) {
				setShowWarning(true)
			}
		}, 1000)
	}, [showWarning])

	useEffect(() => {
		let isMount = true
		const handleActivity = () => {
			resetTimer()
		}
		if (isAuthenticated && !showWarning && isMount) {
			userEvents.forEach((event) => {
				window.addEventListener(event, handleActivity)
			})
		}
		return () => {
			userEvents.forEach((event) => {
				window.removeEventListener(event, handleActivity)
			})
			isMount = false
		}
	}, [resetTimer, showWarning, isAuthenticated])

	const isTimeToShowWarning = useMemo(() => {
		return timeRemaining <= WARNING_TIME && !showWarning
	}, [timeRemaining, showWarning])
	useEffect(() => {
		let isMount = true
		if (!isAuthenticated) {
			isMount && setShowWarning(false)
		}
		if (isAuthenticated && isTimeToShowWarning) {
			isMount && setShowWarning(true)
		}
		return () => {
			isMount = false
		}
	}, [timeRemaining, isTimeToShowWarning, isAuthenticated])

	useEffect(() => {
		if (!isAuthenticated && timerRef.current) {
			clearInterval(timerRef.current)
		}
	}, [isAuthenticated, timerRef])

	return {
		showWarning,
		timeRemaining,
		resetTimer,
		setShowWarning
	}
}

export default useSessionTimeout
