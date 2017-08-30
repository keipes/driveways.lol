import React from 'react';
import Navigation from './navigation';
import { Grid, Col } from 'react-bootstrap';
import Content from './Content';
import Footer from './Footer';
import SideBar from './SideBar';


export default class BodyContainer extends React.Component {
    render() {
        return (<div>
            <Navigation/>
            <Grid>
                <Col md={12} sm={12}>
                    {this.props.children}
                </Col>

            </Grid>
            <Footer/>
        </div>);
    }
}