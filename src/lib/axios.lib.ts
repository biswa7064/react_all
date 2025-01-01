import { getLocalStorageItem } from "@/utils/localStorageUtil"
import axios, { Axios, AxiosHeaders, InternalAxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
})

export const createAxiosInterceptor = (
	headerProperties: Record<string, unknown>
) => {
	axiosInstance.interceptors.request.use(
		(config: InternalAxiosRequestConfig) => {
			config.headers = <AxiosHeaders>{
				...config.headers,
				...headerProperties
			}
			return config
		}
	)
	return axiosInstance
}

export class AxiosLib {
	isAuthRequired: boolean
	private newAxiosInstance: Axios
	constructor(isAuthRequired = false) {
		this.isAuthRequired = isAuthRequired
		this.newAxiosInstance = isAuthRequired
			? createAxiosInterceptor({
					Authorization: getLocalStorageItem("accessToken") ||  `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`
			  })
			: axiosInstance
	}
	async get(url: string, config = {}) {
		return this.newAxiosInstance.get(url, config)
	}

	async post(url: string, data = {}, config = {}) {
		return this.newAxiosInstance.post(url, data, config)
	}

	async put(url: string, data = {}, config = {}) {
		return this.newAxiosInstance.put(url, data, config)
	}

	async delete(url: string, config = {}) {
		return this.newAxiosInstance.delete(url, config)
	}
}
