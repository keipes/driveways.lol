import React, {PropTypes} from 'react';
import BodyContainer from './BodyContainer'
import GA from './GA';

export default class RootPage extends React.Component {
    render() {
        return (
            <html>
            <head>
                {/*<title>{"driveways"}</title>*/}
                <link rel="icon" type="image/png" href="/img/favicon.png"></link>
                <link rel="stylesheet" href="/css/style.css"></link>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"></link>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"></link>
            </head>
            <body>
                <BodyContainer/>
                <GA/>
            </body>
            </html>
        );
    }
}
