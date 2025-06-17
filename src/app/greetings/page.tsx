"use client"

import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const Greetings = () => {
  const pathName = usePathname()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let isMount = true
    const expectedPaths = ["/en", "/es", "/fr"]
    if (isMount && !expectedPaths.includes(pathName)) {
      console.warn(`Path "${pathName}" not found. Redirecting to "/en".`)
      router.push("/greetings/en")
      setLoading(false)
    }

    return () => {
      isMount = false
    }
  }, [loading, pathName, router])
  return <div>{loading ? <p>Loading...</p> : <></>}</div>
}

export default Greetings
