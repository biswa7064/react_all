"use client"
import { fetchWithRetry } from "@/utils/fetchWithRetry"
import { useEffect, useState } from "react"

export default function DataFetcher() {
  const [data, setData] = useState(null)
  const [error, setError] = useState<string | undefined>(undefined)

  useEffect(() => {
    let isMount = true
    const fetchData = async () => {
      try {
        const response = await fetchWithRetry("https://api.example.com/data")
        const json = await response.json()
        isMount && setData(json)
      } catch (err) {
        isMount && setError((err as Error)?.message || "Failed to fetch data")
      }
    }

    fetchData()
    return () => {
      isMount = false
    }
  }, [])
  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}
