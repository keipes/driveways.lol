import React from 'react';

import { StaticRouter, BrowserRouter, Route, Switch} from 'react-router-dom';

import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import RootPage from './components/RootPage';
import StaticS3 from 'components/docs/StaticS3';
import Content from 'components/Content';
import Boids from "./components/boids/Boids";

const inner = (
<RootPage>
    <Switch>
        <Route exact path="/" component={Content}/>
        <Route path="/docs/static_s3" component={StaticS3}/>
        <Route path="/boids" component={Boids}/>
    </Switch>
</RootPage>);

const get_html = (rendered) => {
    return `<!doctype html>
        <html>
            <head>
                <link rel="icon" type="image/png" href="/img/favicon.png"/>
                <link rel="stylesheet" href="/css/style.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>

            </head>
            <body>
                <div id="react-mount-point">${rendered}</div>
                <script src="https://cdn.babylonjs.com/babylon.js"></script>
                <script src="/bundle.js" async></script>
            </body>
        </html>`;
};



if (typeof window !== 'undefined' && window.document) {
    ReactDOM.render(
        <BrowserRouter>
            {inner}
        </BrowserRouter>
        , document.getElementById('react-mount-point'))
} else {
    module.exports = function(path, props, f) {
        const ctx = props === undefined ? {} : props;
        const html = get_html(ReactDOMServer.renderToString(
            <StaticRouter location={path} context={ctx}>
                {inner}
            </StaticRouter>
        ));
        f(html);
    };
}