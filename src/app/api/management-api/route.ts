// M2M access token using endpoint
import { AxiosLib } from "@/lib/axios.lib"
import { NextRequest, NextResponse } from "next/server"

const axiosInstance = new AxiosLib()
export async function GET(_req: NextRequest) {
	try {
		const response = await axiosInstance.post(
			`https://dev-cdv32mus7iljpox6.us.auth0.com/oauth/token`,
			JSON.stringify({
				client_id: process.env.AUTH0_CLIENT_ID_M2M!, // From your M2M app
				client_secret: process.env.AUTH0_CLIENT_SECRET_M2M!, // From your M2M app
				audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
				grant_type: "client_credentials"
			})
		)

		const data = response.data
		if (!data || !data?.access_token) {
			throw new Error("Error fetching token")
		}
		return NextResponse.json({ accessToken: data.access_token })
	} catch (error) {
		return NextResponse.json({ error: (error as Error).message })
	}
}
