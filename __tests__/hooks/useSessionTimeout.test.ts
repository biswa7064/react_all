import { AuthProvider } from "@/context"
import { useSessionTimeout } from "@/hooks"
import {
	SESSION_TIMEOUT,
	UPDATE_INTERVAL,
	userEvents,
	WARNING_TIME
} from "@/hooks/useSessionTimeout"
import { act, cleanup, fireEvent, renderHook } from "@testing-library/react"
import React from "react"

const mockAuthFn = jest.fn()
jest.mock("@/context", () => ({
	useAuth: () => mockAuthFn()
}))
describe("useSessionTimeout hook", () => {
	let dateSpy: jest.SpyInstance
	let addEventSpy: jest.SpyInstance
	let removeEventSpy: jest.SpyInstance
	let setTimeoutSpy: jest.SpyInstance
	let clearTimeoutSpy: jest.SpyInstance
	let setIntervalSpy: jest.SpyInstance
	let clearIntervalSpy: jest.SpyInstance
	beforeEach(() => {
		jest.useFakeTimers()
		mockAuthFn.mockReturnValue({ isAuthenticated: true })
		addEventSpy = jest.spyOn(window, "addEventListener")
		removeEventSpy = jest.spyOn(window, "removeEventListener")
		setTimeoutSpy = jest.spyOn(global, "setTimeout")
		clearTimeoutSpy = jest.spyOn(window, "clearTimeout")
		setIntervalSpy = jest.spyOn(global, "setInterval")
		clearIntervalSpy = jest.spyOn(global, "clearInterval")
		dateSpy = jest.spyOn(Date, "now")
		dateSpy.mockReturnValue(SESSION_TIMEOUT)
	})
	afterEach(() => {
		jest.clearAllMocks()
		jest.restoreAllMocks()
		cleanup()
		jest.clearAllTimers()
		dateSpy.mockRestore()
	})
	it("should return default values after rendering the hook", () => {
		const { result } = renderHook(() => useSessionTimeout(), {
			wrapper: AuthProvider
		})
		expect(result.current).toMatchObject({
			showWarning: false,
			timeRemaining: SESSION_TIMEOUT,
			resetTimer: expect.any(Function),
			setShowWarning: expect.any(Function)
		})
	})

	it("should test interval for warning snd set remaining time to Zero", async () => {
		jest.spyOn(React, "useRef").mockImplementation(() => ({ current: 0 }))
		const { result: sessionTimeoutRes } = renderHook(
			() => useSessionTimeout(),
			{
				wrapper: AuthProvider
			}
		)
		act(() => {
			sessionTimeoutRes.current.resetTimer()
			jest.advanceTimersByTime(SESSION_TIMEOUT - WARNING_TIME)
		})
		expect(sessionTimeoutRes.current.showWarning).toEqual(true)
		act(() => {
			jest.advanceTimersByTime(UPDATE_INTERVAL)
		})
		expect(sessionTimeoutRes.current.timeRemaining).toEqual(0)
	})

	it("should test interval for warning snd set remaining time is not Zero", async () => {
		jest.spyOn(React, "useRef").mockImplementation(() => ({ current: 10000 }))
		const expectedAdvanceTime = SESSION_TIMEOUT - WARNING_TIME
		const { result: sessionTimeoutRes } = renderHook(
			() => useSessionTimeout(),
			{
				wrapper: AuthProvider
			}
		)
		act(() => {
			sessionTimeoutRes.current.resetTimer()
			jest.advanceTimersByTime(expectedAdvanceTime)
		})
		expect(sessionTimeoutRes.current.showWarning).toEqual(true)
		// advance time for one UPDATE_INTERVAL time
		act(() => {
			jest.advanceTimersByTime(expectedAdvanceTime + UPDATE_INTERVAL)
		})
		// check if setInterval is calling once and having remaining time - (SESSION_TIMEOUT-(SESSION_TIMEOUT-10000)) = 10000
		expect(setIntervalSpy).toHaveBeenCalledTimes(1)
		expect(sessionTimeoutRes.current.timeRemaining).toEqual(10000)
	})

	it("should reset session timer on activity event", () => {
		const { result } = renderHook(() => useSessionTimeout())
		act(() => {
			result.current.resetTimer()
		})
		act(() => {
			jest.advanceTimersByTime(SESSION_TIMEOUT - WARNING_TIME)
		})
		userEvents.forEach((ev) => {
			expect(addEventSpy).toHaveBeenCalledWith(ev, expect.any(Function))
		})
		expect(addEventSpy).toHaveBeenCalledTimes(userEvents.length)
		expect(setTimeoutSpy).toHaveBeenCalledTimes(2) // For warning and session timeout
		// Advance time to reach session timeout
		act(() => {
			jest.advanceTimersByTime(SESSION_TIMEOUT)
		})
		expect(result.current.timeRemaining).toBe(0)
	})

	it("should clear timers and event listeners on session timeout", () => {
		jest
			.spyOn(React, "useRef")
			.mockImplementation(() => ({ current: setInterval(() => true, 1000) }))
		const { unmount } = renderHook(() => useSessionTimeout())
		act(() => {
			fireEvent(window, new Event(userEvents[0]))
		})
		expect(addEventSpy).toHaveBeenCalledWith(
			userEvents[0],
			expect.any(Function)
		)
		unmount()
		expect(removeEventSpy).toHaveBeenCalledWith(
			userEvents[0],
			expect.any(Function)
		)
	})

	it("should test if authentication is false then showWarning should be also false", () => {
		mockAuthFn.mockReturnValue({ isAuthenticated: false })
		jest.spyOn(React, "useRef").mockImplementation(() => ({
			current: () => setTimeout(() => true, 100)
		}))
		const { result: sessionTimeoutRes } = renderHook(
			() => useSessionTimeout(),
			{
				wrapper: AuthProvider
			}
		)
		expect(sessionTimeoutRes.current.showWarning).toEqual(false)
		expect(clearTimeoutSpy).toHaveBeenCalledTimes(2)
		expect(clearIntervalSpy).toHaveBeenCalledTimes(1)
	})
})
