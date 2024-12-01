const path = require("path")
const webpack = require("webpack")
module.exports = {
	entry: "./src/app/page.tsx",
	mode: "development",
	devServer: {
		static: { directory: path.join(__dirname, "dist") },
		port: 4444,
		hot: true
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				options: {
					presets: ["@babel/preset-react"]
				}
			}
		]
	},
	plugins: [
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require("./dist/reactpath.json")
		})
	]
}
