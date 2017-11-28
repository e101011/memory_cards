const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'index.js'
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: './public/'
				})
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: { presets: ['es2015','react']  }
			}
		]
	},
	devServer: {
		contentBase: __dirname + '/public',
		compress: true,
		port: 9000,
		stats: 'errors-only',
		open: true,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Memory Cards',
			minify: {
				collapseWhitespace: true
			},
			template: './src/index.html'
		}),
		new ExtractTextPlugin('main.css')
	]
};