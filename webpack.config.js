var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    watch: true,
    mode: 'development',
    devtool: 'inline-source-map',
    context: __dirname,
    entry: './client/app.js',
    target: 'web',
    output: {
        filename: 'app.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'client/index.html',
            filename: 'index.html',
            inject: true
        }),
        new LiveReloadPlugin({appendScriptTag: true})
    ]

};