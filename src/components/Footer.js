import React from 'react';
import { Grid, Col } from 'react-bootstrap';

export default class Footer extends React.Component {
    render() {
        return(
            <Grid className="d-footer">
            <Col md={12}>
                <div className="d-footer-text">
                    &copy; 2017 -
                    This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>.
                </div>
            </Col>
        </Grid>
        );
    }
}
