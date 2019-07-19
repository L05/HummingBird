const webpack = require('webpack');
const config = require('../webpack.config');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = webpack(config);

new WebpackDevServer(webpackConfig, {
    publicPath: '/',
    hot: true,
    historyApiFallback: true,
    quiet: false,
    noInfo: false,
    stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
}).listen(3000, '0.0.0.0', (err) => {
    if (err) {
        console.log(err);
    }
    console.log('Listening on localhost port 3000...');
});
