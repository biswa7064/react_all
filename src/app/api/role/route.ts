import { AxiosLib } from "@/lib/axios.lib"
import { AxiosError } from "axios"
import { NextRequest, NextResponse } from "next/server"

const axiosLib = new AxiosLib(true)
export async function GET(req: NextRequest) {
	const res = new NextResponse()
	const searchParams = req.nextUrl.searchParams
	const userId = searchParams.get("userId")
	try {
		if (!userId) {
			throw new Error("userId is required in request query")
		}
		const response = await axiosLib.get(
			`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`
		)
		const userRoles =
			(response?.data || [])?.map((role: { name: string }) => role.name) || []
		return NextResponse.json(userRoles, res)
	} catch (caught) {
		const error = caught as AxiosError
		if (error?.status && error?.status === 401) {
			return NextResponse.json(
				{ error: JSON.stringify(error) },
				{ status: 401 }
			)
		}
		return NextResponse.json([], res)
	}
}
