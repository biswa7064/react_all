import { delay } from "@/utils/helper"
import { useEffect, useRef } from "react"

const useCancelableFetch = () => {
  const controllerRef = useRef<AbortController | null>(null)

  const cancelableFetch = async (
    url: string,
    init?: Record<string, unknown>
  ) => {
    if (controllerRef.current) {
      console.log("Aborting ongoing fetch request")
      controllerRef.current.abort()
    }
    const abortController = new AbortController()
    controllerRef.current = abortController
    try {
      await delay(5000)
      const response = await fetch(url, {
        ...(init && init),
        signal: abortController.signal,
      })
      return response
    } catch (error) {
      return Promise.reject(error)
    } finally {
      controllerRef.current === abortController &&
        (controllerRef.current = null)
    }
  }

  useEffect(() => {
    //  cleanup on unmount
    return () => {
      if (controllerRef.current) {
        console.log("Aborting ongoing fetch request")
        controllerRef.current.abort()
      }
    }
  }, [])

  return cancelableFetch
}

export default useCancelableFetch
