import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	const res = new NextResponse()
	const searchParams = req.nextUrl.searchParams
	const userId = searchParams.get("userId")
	try {
		if (!userId) {
			throw new Error("userId is required in request query")
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
		return NextResponse.json(userRoles, res)
	} catch (error) {
		return NextResponse.json([], res)
	}
}
