import clean from './clean';
import bundler from './bundler';
import copyStatic from './copyStatic';

clean()
    .then(bundler())
    // .then(copyStatic())
    .catch((e) => {
        throw e;
    console.error(e.stack);
});


// import webpack from 'webpack';
// import webpackConfig from './webpack.config';
//
// // clean();
//
// webpack(webpackConfig, (err, stats) => {
//     if (err) {
//         return err;
//     }
//
//     console.log(stats.toString(webpackConfig.stats));
// });