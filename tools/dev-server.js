import webpack from 'webpack';
import webpackConfig from './webpack.config';
import webpackDevServer from 'webpack-dev-server'

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, {});

server.listen(3001);
