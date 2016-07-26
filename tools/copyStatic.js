import path from 'path';
import ncp from 'ncp';
import webpackConfig from './webpack.config';

function copyStatic() {
    return new Promise((resolve, reject) => {
        ncp(path.resolve(__dirname, '../static'), webpackConfig.output.path, (err) => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    });
}

export default copyStatic;