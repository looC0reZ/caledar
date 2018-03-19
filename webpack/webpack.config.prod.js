'use strict';

const resolve = require('path').resolve;
const webpack = require('webpack');

module.exports = (env) =>{
	if(env.PROJECT_NAME){
		const PROJECT_NAME = env.PROJECT_NAME;
		return {
			devtool: 'cheap-module-source-map',
			target: 'web',
			entry: {
				[PROJECT_NAME]: './src/app/index.tsx'
			},
			context: resolve(__dirname, '../'), // относительно этого каталога entry и module.rules.loader
			output: {
				path: resolve(__dirname, '../dist'),
				filename: '[name].js',
				sourceMapFilename: '[name].map',
				publicPath: '/'
			},
			resolve: {
				extensions: ['.ts', '.tsx', '.js']
			},
			plugins: [
				new webpack.DefinePlugin({
					'process.env': {'NODE_ENV': JSON.stringify('production')}
				}),
				new webpack.optimize.UglifyJsPlugin({
					// more info: http://lisperator.net/uglifyjs/compress
					compress: {
						sequences: true,  // join consecutive statemets with the “comma operator”
						properties: true,  // optimize property access: a["foo"] → a.foo
						dead_code: true,  // discard unreachable code
						drop_debugger: true,  // discard “debugger” statements
						unsafe: false, // some unsafe optimizations (see below)
						conditionals: true,  // optimize if-s and conditional expressions
						comparisons: true,  // optimize comparisons
						evaluate: true,  // evaluate constant expressions
						booleans: true,  // optimize boolean expressions
						loops: true,  // optimize loops
						unused: true,  // drop unused variables/functions
						hoist_funs: true,  // hoist function declarations
						hoist_vars: false, // hoist variable declarations
						if_return: true,  // optimize if-s followed by return/continue
						join_vars: true,  // join var declarations
						cascade: true,  // try to cascade `right` into `left` in sequences
						side_effects: true,  // drop side-effect-free statements
						warnings: false,  // warn about potentially dangerous optimizations/code
						global_defs: {
							__REACT_HOT_LOADER__: undefined // eslint-disable-line no-undefined
						}
					},
					sourceMap: true,
					output: {
						comments: false
					}
				}),
				new webpack.optimize.AggressiveMergingPlugin(),
				new webpack.optimize.ModuleConcatenationPlugin()
			],
			module: {
				rules: [
					{
						test: /\.ts(x?)$/,
						exclude: '/node_modules/',
						include: resolve(__dirname, './../src'),
						use: [
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
									minimize: true
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
		}
	}else{
		console.log('ERROR : !PROJECT_NAME');
	}
};

