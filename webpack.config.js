const path = require("path")
const webpack = require("webpack")
module.exports = {
	entry: "./src/app/page.tsx",
	mode: "development",
	// devtool: "eval-source-map", // we can create source-map using devtool option
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
		}),
		// also by using plugin we can implement source-map
		// we can have more control on source map if created using plugin
		new webpack.SourceMapDevToolPlugin({
			filename: "appcode.map"
		})
	]
}
