var webpack = require("webpack")
var path = require("path")
module.exports = {
	context: process.cwd(),
	mode: "development",
	entry: {
		vendor: ["react", "react-dom"]
	},
	output: {
		filename: "[name].dll.js",
		path: path.join(__dirname, "dist"),
		library: "[name]"
	},
	plugins: [
		new webpack.DllPlugin({
			name: "[name]",
			path: path.join(__dirname, "dist/[name].json")
		})
	]
}
