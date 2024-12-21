const path = require("path")
const webpack = require("webpack")
const UglifyJSWebpackPlugin = require("uglifyjs-webpack-plugin")
const commonWebpack = {
	entry: {
		main: "./src/app/page.tsx",
		layout: "./src/app/layout.tsx"
	},
	mode: "development",
	// devtool: "eval-source-map", // we can create source-map using devtool option
	devServer: {
		static: { directory: path.join(__dirname, "dist") },
		port: 4444,
		hot: true
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].[contenthash].js"
	},
	module: {
		rules: [
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: "babel-loader"
			},
			{
				test: /\.(css|scss)$/, // Example for handling CSS
				exclude: /node_modules/,
				use: [
					"style-loader", // Inject CSS into the DOM
					"css-loader", // Interpret @import and url()
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [require("autoprefixer")]
							}
						}
					} // Process with Tailwind and Autoprefixer
				]
			},
			{
				test: /.\.js$/,
				include: /node_modules\/react-dom/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		// add reference for webpack.library.config.json
		new webpack.DllReferencePlugin({
			context: process.cwd(),
			manifest: require("./dist/vendor.json")
		}),
		// also by using plugin we can implement source-map
		// we can have more control on source map if created using plugin
		new webpack.SourceMapDevToolPlugin({
			filename: "[name].appcode.map"
		})
	],
	optimization: {
		minimizer: [
			// uglifyjs plugin to reduce size of bundles
			// Cache property used to prevent downloading the same file again
			new UglifyJSWebpackPlugin({ cache: true })
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	}
}

module.exports = { ...commonWebpack }
