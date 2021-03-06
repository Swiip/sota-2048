const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	module: {
		// preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'eslint'}],
		loaders: [
			{test: /.json$/, loaders: ['json']},
			{test: /.ttf$/, loaders: ['file']},
			{test: /\.css$/, loaders: ['style', 'css']},
			{test: /\.js$/, exclude: /node_modules/, loaders: [/* 'react-hot', */'babel']}
		]
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			template: conf.path.src('index.html'),
			inject: true
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	debug: true,
	devtool: 'cheap-module-eval-source-map',
	output: {
		path: path.join(process.cwd(), conf.paths.tmp),
		filename: 'index.js'
	},
	entry: [
		'webpack/hot/dev-server',
		'webpack-hot-middleware/client',
		`./${conf.path.src('index')}`
	]
};
