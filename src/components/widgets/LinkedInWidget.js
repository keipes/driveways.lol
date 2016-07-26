import React from 'react';
import {Row, Col} from 'react-bootstrap';

export default class LinkedInWidget extends React.Component {
    render() {
        return (
            <Row>
                <Col md="12">
                    <div className="d-linkedin">
                        <script src="//platform.linkedin.com/in.js" type="text/javascript"></script>
                        <script type="IN/MemberProfile" data-id="https://www.linkedin.com/in/keith-smith-99ab6b5b"
                                data-format="click" data-related="false" data-text="Keith Smith"></script>
                    </div>
                </Col>
            </Row>
        );
    }
}