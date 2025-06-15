"use client"

import type React from "react"

import useCancelableFetch from "@/hooks/useCancelableFetch"
import {
  CalendarToday,
  FilterList,
  Mail,
  VerifiedUserOutlined,
} from "@mui/icons-material"
import {
  Alert,
  Badge,
  Box,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material"
import { useCallback, useEffect, useState } from "react"

interface Photo {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

enum TabType {
  PHOTOS = "photos",
  POSTS = "posts",
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      className="mt-6"
    >
      {value === index && <Box>{children}</Box>}
    </div>
  )
}

export default function TabbedApiPage() {
  const [activeTab, setActiveTab] = useState<{
    active: TabType
    activeIndex: number
  }>({
    active: TabType.PHOTOS,
    activeIndex: 0,
  })
  const [photos, setPhotos] = useState<Photo[]>([])
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const cancelableFetch = useCancelableFetch()

  const handleTabChange = (
    event: React.SyntheticEvent,
    index: number,
    newValue: TabType
  ) => {
    setActiveTab((pre) => ({ ...pre, active: newValue, activeIndex: index }))
    setError(null)
  }

  const updateData = useCallback(
    (data: Photo[] | Post[], activeTab: TabType) => {
      switch (activeTab) {
        case TabType.PHOTOS:
          setPhotos(data as Photo[])
          break
        case TabType.POSTS:
          setPosts(data as Post[])
          break
      }
    },
    []
  )

  // Effect to fetch data when tab changes
  useEffect(() => {
    let isMount = true

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await cancelableFetch(
          `https://jsonplaceholder.typicode.com/${activeTab?.active}?_limit=8`
        )
        if (!response.ok) throw new Error("Failed to fetch posts")
        const data = await response.json()
        isMount && updateData(data, activeTab?.active)
      } catch (err) {
        isMount &&
          setError(err instanceof Error ? err.message : "Failed to fetch posts")
      } finally {
        isMount && setLoading(false)
      }
    }
    fetchData()
    return () => {
      isMount = false
    }
  }, [activeTab, updateData])

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          API Data Tabs
        </h1>
        <p className="text-gray-600">
          Browse different data sources with tabbed navigation
        </p>
      </div>

      {/* MUI Tabs */}
      <Box className="border-b border-gray-200 mb-6 rounded-lg">
        <Tabs
          value={activeTab.activeIndex}
          onChange={(ev, newVal) =>
            handleTabChange(
              ev,
              newVal,
              newVal === 0 ? TabType.PHOTOS : TabType.POSTS
            )
          }
          aria-label="API data tabs"
          className="min-h-[48px] bg-[rgb(var(--foreground-rgb))] rounded-lg"
          sx={{
            "& .MuiTab-root": {
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              minHeight: "48px",
              outline: "none",
            },
          }}
        >
          <Tab
            icon={<FilterList className="w-5 h-5" />}
            iconPosition="start"
            label="Photos Gallery"
            id="tab-0"
            aria-controls="tabpanel-0"
            className="flex-row gap-2"
          />
          <Tab
            icon={<VerifiedUserOutlined className="w-5 h-5" />}
            iconPosition="start"
            label="Blog Posts"
            id="tab-1"
            aria-controls="tabpanel-1"
            className="flex-row gap-2 "
          />
        </Tabs>
      </Box>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <CircularProgress size={40} />
          <span className="ml-3 text-gray-600">Loading data...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <Alert severity="error" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Photos Tab Panel */}
      <TabPanel value={activeTab.activeIndex} index={0}>
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {photos.map((photo) => (
              <Card
                key={photo.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-0">
                  <div className="relative aspect-square">
                    <img
                      src={photo.thumbnailUrl || "/placeholder.svg"}
                      alt={photo.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-600 text-white">
                        {photo.id}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  {photo.title}
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Album {photo.albumId}</span>
                    <span className="flex items-center gap-1">
                      <FilterList className="w-3 h-3" />
                      150x150
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabPanel>

      {/* Posts Tab Panel */}
      <TabPanel value={activeTab.activeIndex} index={1}>
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <p className="text-lg font-semibold line-clamp-2 leading-tight pr-4">
                      {post.title}
                    </p>
                    <Badge className="shrink-0">
                      {/* <Hash className="w-3 h-3 mr-1" /> */}
                      {post.id}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-4 mb-4">
                    {post.body}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <VerifiedUserOutlined className="w-3 h-3" />
                      <span>User {post.userId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarToday className="w-3 h-3" />
                      <span>Blog Post</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </TabPanel>

      {/* Stats Footer */}
      {!loading && !error && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-full">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail className="w-4 h-4" />
              <span>
                {activeTab.activeIndex === 0
                  ? `${photos.length} Photos`
                  : `${posts.length} Posts`}{" "}
                loaded
              </span>
            </div>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span className="text-sm text-gray-500">JSONPlaceholder API</span>
          </div>
        </div>
      )}
    </div>
  )
}
