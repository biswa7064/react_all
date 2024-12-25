/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	eslint: {
		dirs: ["src", "app", "components", "lib", "utils"]
	},
	// allow image from external source
	images: {
		domains: ["lh3.googleusercontent.com"]
	}
}

export default nextConfig
