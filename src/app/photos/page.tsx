"use client"
import Photo from "@/components/Photo"
import { fetchWithRetry } from "@/utils/fetchWithRetry"
import {
  Alert,
  Card,
  CardContent,
  Container,
  Skeleton,
  Typography,
} from "@mui/material"
import { useEffect, useState } from "react"

export interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}
export default function DataFetcher() {
  const [data, setData] = useState<Photo[] | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMount = true
    const fetchData = async () => {
      try {
        // Try with wrong api to trigger "retry" logic 3 times
        // After maximum retries, it will throw error
        const response = await fetchWithRetry("https://api.example.com/data")
        const json = await response.json()
        isMount && setData(json)
      } catch (err) {
        isMount &&
          setError(
            (err as Error)?.message ||
              "Failed to fetch data, max retries exceeded."
          )
      } finally {
        isMount && setLoading(false)
      }
    }

    fetchData()
    return () => {
      isMount = false
    }
  }, [])

  if (error) {
    return (
      <Container maxWidth="xl" className="py-6">
        <div className="text-center mb-8">
          <Typography variant="h3" component="h1" className="font-bold mb-4">
            Photo Gallery
          </Typography>
          <Alert severity="error" className="max-w-md mx-auto mt-[2rem]">
            Error: {error}
          </Alert>
        </div>
      </Container>
    )
  }

  return (
    <Container maxWidth="xl" className="py-6">
      {loading ? (
        <>
          <div className="text-center mb-8">
            <Typography variant="h3" component="h1" className="font-bold mb-2">
              Photo Gallery
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" width="80%" height={24} />
                  <Skeleton variant="text" width="60%" height={20} />
                  <div className="flex justify-between items-center mt-3">
                    <Skeleton variant="rectangular" width={80} height={24} />
                    <Skeleton variant="rectangular" width={60} height={20} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="text-center mb-8">
            <Typography variant="h3" component="h1" className="font-bold mb-2">
              Photo Gallery
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Displaying photos from JSONPlaceholder API
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data &&
              data.map((photo) => <Photo key={photo.id} photo={photo} />)}
          </div>

          <div className="text-center mt-8">
            <Typography variant="body2" color="text.secondary">
              Showing {data?.length} photos from the JSONPlaceholder API
            </Typography>
          </div>
        </>
      )}
    </Container>
  )
}
