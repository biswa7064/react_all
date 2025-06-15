const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

export async function fetchWithRetry(
  input: RequestInfo,
  init?: RequestInit,
  retries = MAX_RETRIES,
  attempt = 1
): Promise<Response> {
  let retryable = true
  try {
    const response = await fetch(input, init)
    // If not successful, throw to trigger retry
    if (!response.ok) {
      retryable = response.status >= 500
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response
  } catch (error) {
    if (retries === 0 || !retryable) throw error
    console.log(`Attempt ${attempt} to fetch: ${input}`)
    await new Promise((resolve) =>
      setTimeout(resolve, RETRY_DELAY * 2 ** (attempt - 1))
    )
    return fetchWithRetry(input, init, retries - 1, attempt + 1)
  }
}
