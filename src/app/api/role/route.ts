import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
	const searchParams = req.nextUrl.searchParams
	const userId = searchParams.get("userId")
	if (!userId) {
		return NextResponse.json([])
	}
	const response = await fetch(
		`${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}/roles`,
		{
			headers: {
				Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`
			}
		}
	)
	const user = (await response.json()) || []
	const userRoles = user?.map((role: { name: string }) => role.name) || []
	return NextResponse.json(userRoles)
}
