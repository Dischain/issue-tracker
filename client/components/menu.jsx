'use strict';

import React from 'react';
import { Nav, Navbar, NavbarBrand, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';

const Menu = React.createClass({  
  getNav() {
    let nav;

    if (this.props.curUser != null) {
      nav = (
      <Nav>
        <LinkContainer to={'/user/' + this.props.curUser.userId}>
          <NavItem>Home</NavItem>
        </LinkContainer>
        <LinkContainer to='/dashboard'>
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/logout'>
          <NavItem>Logout</NavItem>
        </LinkContainer>
      </Nav>
      );
    } else {
      if (this.props.path === '/login') {
        nav = (
          <Nav>
            <LinkContainer to='/register'>
              <NavItem>Register</NavItem>
            </LinkContainer>
          </Nav>
        );
      } else if (this.props.path === '/register') {
        nav = (
          <Nav>
            <LinkContainer to='/login'>
              <NavItem>Login</NavItem>
            </LinkContainer>
          </Nav>
        );
      }
    }

    return nav;
  },

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand><Link to='/'>Issue Tracker</Link></Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.getNav()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
});

export default Menu;