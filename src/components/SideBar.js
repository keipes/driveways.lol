import React from 'react';
import GithubWidget from './widgets/GithubWidget';
import SpotifyWidget from './widgets/SpotifyWidget'
import LinkedInWidget from './widgets/LinkedInWidget';
import { Col, Image, Row } from 'react-bootstrap';

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="d-sidebar">
                {/*<Row>*/}
                    {/*<Col md="12">*/}
                    {/*</Col>*/}
                {/*</Row>*/}
                {/*<hr/>*/}
                {/*<GithubWidget/>*/}
                {/*<LinkedInWidget/>*/}
                {/*<SpotifyWidget/>*/}
                <hr/>
            </div>

        );
    }
}