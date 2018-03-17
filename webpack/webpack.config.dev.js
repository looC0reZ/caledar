'use strict';

const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = {
	devtool: 'cheap-module-eval-source-map', // http://cheng.logdown.com/posts/2016/03/25/679045
	target: 'web',
	entry: {
		calendar: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://127.0.0.1:8080',
			'webpack/hot/only-dev-server',
			'./src/app/index.tsx'
		]
	},
	output: {
		path: resolve(__dirname, '../dist'),
		filename: '[name].js',
		publicPath: '/'
	},
	devServer: {
		hot: true,
		contentBase: resolve(__dirname, '../'),
		publicPath: '/',
		port: 8080,
		historyApiFallback: true,
		compress: true,
		noInfo: false,
		quiet: false,
		overlay: false
	},
	context: resolve(__dirname, '../'), // относительно этого каталога entry и module.rules.loader
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.optimize.ModuleConcatenationPlugin()
	],
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: '/node_modules/',
				include: resolve(__dirname, './../src'),
				use: [
					{loader: 'react-hot-loader/webpack'},
					{loader: 'ts-loader'}
				]
			},
			{
				test: /\.css?$/,
				exclude: '/node_modules/',
				include: resolve(__dirname, './../src'),
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							minimize: false
						}
					}
				]
			},
			{
				test: /\.(png|tif|jpg|gif|svg)(\?.*$|$)/,
				use: {loader: 'file-loader?name=images/[name].[ext]'}
			},
			{
				test: /\.(eot|ttf|woff|woff2)(\?.*$|$)/,
				use: {loader: 'file-loader?name=fonts/[name].[ext]'}
			}
		]
	},
	node: {
		console: true,
		fs: 'empty'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM'
	}
};
