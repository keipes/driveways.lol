import path from 'path';
import StaticSiteGeneratorPlugin from 'static-render-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const DEBUG = !process.argv.includes('--release');

const GLOBALS = {
    'process.env.NODE_ENV': DEBUG ? '"development"' : '"production"',
    __DEV__: DEBUG,
};

const routes = [
    '/'
];
console.log(path.resolve(__dirname, '../build/bundle.js'));
const config = {
    context: path.resolve(__dirname, '../src'),
    output: {
        path: path.resolve(__dirname, '../build'),
        publicPath: '/assets/',
        sourcePrefix: '  ',
        libraryTarget: 'umd'
    },
    entry: "./app.js",
    resolve: {
        root: path.resolve(__dirname, '../src'),
        modulesDirectories: ['node_modules'],
        extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '../node_modules/react-routing/src'),
                    path.resolve(__dirname, '../src'),
                ],
                query: {
                    // https://github.com/babel/babel-loader#options
                    cacheDirectory: DEBUG,

                    // https://babeljs.io/docs/usage/options/
                    babelrc: false,
                    presets: [
                        'react',
                        'es2015',
                        'stage-0',
                    ],
                    plugins: [
                        'transform-runtime',
                        ...DEBUG ? [] : [
                            'transform-react-remove-prop-types',
                            'transform-react-constant-elements',
                            'transform-react-inline-elements',
                        ],
                    ],
                },
            },
        ]
    },
    plugins: [
        // new StaticSiteGeneratorPlugin(path.resolve(__dirname, '../build/bundle.js'), routes),
        new StaticSiteGeneratorPlugin('bundle.js', routes),
        new CopyWebpackPlugin([{
            from: '../static',
            // to: path.resolve(__dirname, '../build')
        }])
    ],
    stats: {
        chunks: false
    },
    cache: false
};
export default config;