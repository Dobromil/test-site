module.exports = {
	entry: {
		app: "./app/assets/scripts/app.js",
		vendor: "./app/assets/scripts/vendor.js"
	},
	output: {
		path: __dirname + "/app",
		filename: "[name].js"
	},

	module: {
		loaders:[
			{
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				},
				test: /\.js$/, 
				exclude: /node_modules/
			}
		]	
	}
}