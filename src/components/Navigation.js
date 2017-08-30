import React from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">driveways</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <LinkContainer to="/docs/static_s3">
                                <NavItem>Static S3</NavItem>
                            </LinkContainer>
                            <LinkContainer to="/boids">
                                <NavItem>Boids</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}
