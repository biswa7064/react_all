export const getUsers = async () => {
	try {
		const data = await fetch("https://fakestoreapi.com/users")
		const json = await data.json()
		return json
	} catch (error) {
		throw new Error("No data found")
	}
}
