import React from 'react';
import {Row, Col, Image} from 'react-bootstrap';
import {OCTOCAT_120, OCTOCAT_64, OCTOCAT_32} from '../../images'

export default class GithubWidget extends React.Component {
    render() {
        return (
            <Row>
                <Col md="12">
                    <a href="https://github.com/kpsmith" target="_blank" className="d-github-link">
                        <Image className="github-icon" src={OCTOCAT_32}/>
                        <p>kpsmith on GitHub</p>
                    </a>
                </Col>
            </Row>
        );
    }
}

{/*<Nav pullRight>*/}
    {/*<NavItem className="github-icon-nav" href="https://github.com/kpsmith">*/}
        {/*<Image className="github-icon" src={OCTOCAT_32}/>*/}
    {/*</NavItem>*/}
{/*</Nav>*/}