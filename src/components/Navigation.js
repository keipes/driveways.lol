import React, {PropTypes} from 'react';
import { Nav, Navbar, NavItem, Image } from 'react-bootstrap';


export default class Navigation extends React.Component {
    render() {
        return (
            <Navbar>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            Driveways
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            <NavItem href="ts3server://ts.driveways.lol?port=9987">Launch TeamSpeak</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Navbar>
        );
    }
}