import webpack from 'webpack';
import webpackConfig from './webpack.config';

// function bundler() {
//     return new Promise((resolve, reject) => {
//         webpack(webpackConfig).run((err, stats) => {
//             if (err) {
//                 return reject(err);
//             }
//
//             console.log(stats.toString(webpackConfig.stats));
//             return resolve();
//         });
//     });
// }

function bundler() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig).watch({
            aggregateTimeout: 100,
            poll: true
        }, (err, stats) => {
            if (err) {
                return reject(err);
            }
            console.log(stats.toString(webpackConfig.stats));
            return resolve();
        });
    });
}

export default bundler;