import React, {PropTypes} from 'react';
import { Nav, Navbar, NavItem, Image } from 'react-bootstrap';


export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="/">driveways</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem href="/docs/static_s3">Static S3 Sites</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}