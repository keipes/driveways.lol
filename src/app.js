import React from 'react';
// import Router, {Route, DefaultRoute} from 'react-router';

import {Route, IndexRoute, match, RouterContext} from 'react-router';

import ReactDOMServer from 'react-dom/server';
import RootPage from './components/RootPage';
import IndexPage from './components/IndexPage';

console.log("before routes");
const routes = (
    <Route path="/" component={RootPage}>
        {/*<IndexRoute handler={IndexPage}/>*/}
    </Route>
);
console.log("post routes");

// const html = ReactDOMServer.renderToString(
//     <Router history={} location={} routes={'/'}
// );

module.exports = function(path, props, f) {
    console.log("app called");
    match({routes, location: path}, (error, redirectLocation, renderProps) => {
        const html = ReactDOMServer.renderToString(<RouterContext {...renderProps}/>);
        f('<!doctype html>' + html);
    });
    // Router.run(routes, path, (Root) => {
    //     console.log(Root);
    //     const html = ReactDOMServer.renderToString(<Root/>);
    //     console.log("foo");
    //     f('<!doctype html>' + html);
    // });
}
//
// export function render() {
//
// }