import React from 'react';
import BodyContainer from './BodyContainer'
import GA from './GA';

// export default class RootPage extends React.Component {
//     render() {
//         return (
//             <html>
//             <head>
//                 <link rel="icon" type="image/png" href="/img/favicon.png"/>
//                 <link rel="stylesheet" href="/css/style.css"/>
//                 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"/>
//                 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css"/>
//
//                 <script src="/bundle.js"/>
//             </head>
//             <body>
//                 {/*{this.props.children}*/}
//
//             <BodyContainer>
//                 {this.props.children}
//             </BodyContainer>
//             <GA/>
//             </body>
//             </html>
//         );
//     }
// }
export default class RootPage extends React.Component {
    render() {
        return (
            <div>
                <BodyContainer>
                    {this.props.children}
                </BodyContainer>
                <GA/>
            </div>
        );
    }
}
