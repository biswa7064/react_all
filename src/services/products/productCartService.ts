export interface ProductType {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
}
export const getProducts = async (): Promise<ProductType[]> => {
	try {
		const data = await fetch("https://fakestoreapi.com/products")
		const json = (await data.json()) as ProductType[]
		return json
	} catch (error) {
		throw new Error("productsError: No product found")
	}
}
export const getCart = async () => {
	try {
		const data = await fetch("https://fakestoreapi.com/carts")
		const json = await data.json()
		return json
	} catch (error) {
		throw new Error("cartError: No product found in cart")
	}
}
