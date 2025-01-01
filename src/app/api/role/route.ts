import { AxiosLib } from "@/lib/axios.lib"
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
	} catch (error) {
		return NextResponse.json([], res)
	}
}
