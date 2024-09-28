import Image from "next/image"
import Button from "./Button"
import { ProductType } from "@/services/products/productCartService"

export default function ProductCard({ product }: { product: ProductType }) {
	return (
		<div className="bg-white rounded-lg shadow-md overflow-hidden">
			<Image
				src={product.image}
				alt={product.title}
				width={200}
				height={200}
				className="w-full h-48 object-cover"
			/>
			<div className="p-4">
				<div className="h-[4em]">
					<h2 className="text-lg font-semibold mb-2 text-gray-600 line-clamp-2 ">
						{product.title}
					</h2>
				</div>
				<p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
				<Button className="w-full text-gray-600 bg-blue-500 px-1 py-2">
					Add to Cart
				</Button>
			</div>
		</div>
	)
}
