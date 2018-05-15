const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

// Since webpack.test.config.js is used by command line, save it as a separate file.

module.exports = {
	target: 'node', // in order to ignore built-in modules like path, fs, etc.
	externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
	plugins: [
		new webpack.DefinePlugin({
			ENV: '"test"',
			'process.env': {
				NODE_ENV: JSON.stringify('test'),
			},
		}),
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader',
			},
			{
				test: /\.scss$/,
				loader:
					'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
				// : 'style-loader!css-loader!sass-loader',
			},
			{
				test: /\.less$/,
				loader: 'style-loader!css-loader!less-loader',
			},
			{
				test: /\.css$/,
				include: /node_modules/,
				loader:
					'style-loader!css-loader?sourceMap!sass-loader?sourceMap',
			},
			{
				test: /\.json$/,
				loader: 'json-loader',
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=8192',
			},
		],
	},
};
