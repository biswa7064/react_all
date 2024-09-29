import * as productService from "@/services/products/productCartService"

const mockFetch = jest.fn()
const mockProductResponseFromApi = [
	{
		id: 1,
		title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
		price: 109.95,
		description:
			"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
		category: "men's clothing",
		image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
		rating: {
			rate: 3.9,
			count: 120
		}
	}
]
const mockCartResponseFromApi = [
	{
		id: 1,
		userId: 1,
		date: "2020-03-02T00:00:00.000Z",
		products: [
			{
				productId: 1,
				quantity: 4
			},
			{
				productId: 2,
				quantity: 1
			},
			{
				productId: 3,
				quantity: 6
			}
		]
	}
]
describe("productService", () => {
	beforeEach(() => {
		jest.restoreAllMocks()
		global.fetch = mockFetch
	})
	describe("productService.getProducts", () => {
		it("should give successful response for products", async () => {
			mockFetch.mockResolvedValue({
				json: jest
					.fn()
					.mockResolvedValue(Promise.resolve(mockProductResponseFromApi))
			})
			const result = await productService.getProducts()
			expect(result).toEqual(mockProductResponseFromApi)
			expect(mockFetch).toHaveBeenCalled()
		})
		it("should throw error if any", async () => {
			const expectedErr = new Error("productsError: No product found")
			mockFetch.mockImplementation(() => expectedErr)
			await expect(productService.getProducts).rejects.toThrow(expectedErr)
		})
	})
	describe("productService.getCart", () => {
		it("should give successful response for cart data", async () => {
			mockFetch.mockResolvedValue({
				json: jest
					.fn()
					.mockResolvedValue(Promise.resolve(mockCartResponseFromApi))
			})
			const result = await productService.getCart()
			expect(result).toEqual(mockCartResponseFromApi)
			expect(mockFetch).toHaveBeenCalled()
		})
		it("should throw error if any", async () => {
			const expectedErr = new Error("cartError: No product found in cart")
			mockFetch.mockImplementation(() => expectedErr)
			await expect(productService.getCart).rejects.toThrow(expectedErr)
		})
	})

	afterEach(() => {
		jest.clearAllMocks()
		global.fetch = global.fetch
	})
})
