import React from 'react';
import GithubWidget from './widgets/GithubWidget';
import SpotifyWidget from './widgets/SpotifyWidget'
import LinkedInWidget from './widgets/LinkedInWidget';
import { Grid, Col, Image, Row } from 'react-bootstrap';

export default class SideBar extends React.Component {
    render() {
        return (
            <div className="d-sidebar">
                <Row>
                    <Col md="12">
                        <div className="d-miniBio">
                            <Image responsive className="d-gravatar" src="https://s.gravatar.com/avatar/0635b32f0ff7a78474fa0c25a6347ce3?s=80"></Image>
                            <h1>About Me</h1>
                            <p className="d-blurb">I am a Seattle-based Software Developer working for Amazon Web Services.</p>
                        </div>
                    </Col>
                </Row>
                <hr/>
                <GithubWidget/>
                <LinkedInWidget/>
                <SpotifyWidget/>
                <hr/>
            </div>

        );
    }
}