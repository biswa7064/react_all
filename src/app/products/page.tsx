"use client"
import ProductCard from "@/components/ui/ProductCard"
import { useAppDispatch, useAppSelector } from "@/lib/redux"
import { ProductType } from "@/services/products/productCartService"
import { useEffect } from "react"

export default function ProductsPage() {
	const dispatch = useAppDispatch()
	const { isLoading_products, productsDetails } = useAppSelector(
		(state) => state.cartProducts
	)
	useEffect(() => {
		let isMount = true
		if (isMount) {
			dispatch({ type: "START_OPERATION_PRODUCTS" })
		}
		return () => {
			isMount = false
		}
	}, [dispatch])

	const getTotalCart = (uId: number) => {
		return (
			productsDetails?.cartData?.find(
				(c: { userId: number }) => c.userId === uId
			)?.products ?? []
		)
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Products</h1>

				<button
					type="button"
					className="flex justify-between gap-2 bg-blue-500 text-white px-2 py-1"
				>
					<p>View Cart</p>
					<p className="text-white font-bold">
						{getTotalCart(1)?.length ?? null}
					</p>
				</button>
			</div>
			{isLoading_products ? (
				<>
					<p>Loading Products...</p>
				</>
			) : (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
					{productsDetails.products.map((product: ProductType) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</div>
	)
}
