"use client"
import { useAuth } from "@/context"
import { useState, useEffect, useCallback, useRef } from "react"

export const SESSION_TIMEOUT = 3 * 60 * 1000 // 3 minutes
export const WARNING_TIME = 60 * 1000 // 1 minute
export const UPDATE_INTERVAL = 1000
export const userEvents = ["mousemove", "keydown", "click"]

const useSessionTimeout = () => {
	const { isAuthenticated } = useAuth()
	const [showWarning, setShowWarning] = useState(false)
	const [timeRemaining, setTimeRemaining] = useState(SESSION_TIMEOUT)
	const lastActivityRef = useRef(Date.now())
	const timerRef = useRef<number | null>(null)
	const warningTimeoutRef = useRef<number | null>(null)
	const sessionTimeoutRef = useRef<number | null>(null)

	const clearTimers = () => {
		if (warningTimeoutRef.current) {
			clearTimeout(warningTimeoutRef.current)
		}
		if (sessionTimeoutRef.current) {
			clearTimeout(sessionTimeoutRef.current)
		}
		timerRef.current && clearInterval(timerRef.current)
	}

	const resetTimer = useCallback(() => {
		lastActivityRef.current = Date.now()
		setShowWarning(false)
		setTimeRemaining(SESSION_TIMEOUT)
		clearTimers()
		warningTimeoutRef.current = window.setTimeout(() => {
			!showWarning && setShowWarning(true)
		}, SESSION_TIMEOUT - WARNING_TIME) // run showWarning after certain time period
		sessionTimeoutRef.current = window.setTimeout(() => {
			setTimeRemaining(0)
			clearTimers() // Clear both timers when the session expires
		}, SESSION_TIMEOUT) // run clear timeout and set remaining time to 0 after session expired
	}, [showWarning])

	useEffect(() => {
		let isMount = true
		if (showWarning && isMount) {
			timerRef.current && clearInterval(timerRef.current)
			timerRef.current = window.setInterval(() => {
				const now = Date.now()
				const timeSinceLastActivity = now - lastActivityRef.current
				const remainingTime = SESSION_TIMEOUT - timeSinceLastActivity
				if (remainingTime <= 0) {
					setTimeRemaining(0)
					clearTimers()
				} else {
					setTimeRemaining(remainingTime)
				}
			}, UPDATE_INTERVAL)
		}
		return () => {
			timerRef.current && clearInterval(timerRef.current)
			isMount = false
		}
	}, [showWarning])

	useEffect(() => {
		let isMount = true
		const handleActivity = () => {
			resetTimer()
		}
		if (isMount && isAuthenticated && !showWarning) {
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

	useEffect(() => {
		if (!isAuthenticated) {
			setShowWarning(false)
			clearTimers()
		}
	}, [isAuthenticated])

	return {
		showWarning,
		timeRemaining,
		resetTimer,
		setShowWarning
	}
}

export default useSessionTimeout
