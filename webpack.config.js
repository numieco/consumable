const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, "src");
const DIST_DIR = path.resolve(__dirname, "dist");

module.exports = {
	entry: SRC_DIR + "/index.js",
	output: {
		path: DIST_DIR,
		filename: "bundle.js",
		publicPath: "/dist/",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				include: SRC_DIR,
				exlude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015", "stage-2"]
				},
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract("css!sass")
			}
		],
	},
	watch: true,
	plugins: [
		new ExtractTextPlugin("style/main.css", {
			allChunks: true
		})
	]
};