// import { getAuth0AccessToken, getLocalStorageItem } from "@/utils/localStorageUtil"
import { getLocalStorageItem } from "@/utils/localStorageUtil"
import axios, { Axios, AxiosHeaders, InternalAxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
	baseURL: process.env.NEXT_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
})

export class AxiosLib {
	isAuthRequired: boolean
	private newAxiosInstance: Axios
	constructor(isAuthRequired = false) {
		this.isAuthRequired = isAuthRequired
		this.newAxiosInstance = axiosInstance
		this.setInterceptor()
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

	private async setInterceptor() {
		this.newAxiosInstance.interceptors.request.use(
			async (config: InternalAxiosRequestConfig) => {
				config.headers = (<Record<string, unknown>>{
					...config.headers
				}) as AxiosHeaders
				this.isAuthRequired &&
					(config.headers.Authorization =
						getLocalStorageItem("accessToken") ??
						`Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`)
				return config
			}
		)
	}
}
