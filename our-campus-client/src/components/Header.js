import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { Route } from "react-router-dom";

import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <header>
      <Navbar
        sticky='top'
        bg='dark'
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img
                src='logo4.png'
                alt='Our Campus'
                width='45'
                height='30'
                className='d-inline-block align-top'
              />{" "}
              Our Campus
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            </Nav>
            <Nav>
              <LinkContainer to='/'>
                <Nav.Link>
                  <i className='fas fa-home'></i> Home
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/chats'>
                <Nav.Link>
                  <i className='fas fa-comment-alt'></i> Message
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to='/event'>
                <Nav.Link>
                  <i className='fas fa-calendar-week'></i> Event
                </Nav.Link>
              </LinkContainer>
              <LinkContainer className='me-4' to='/notification'>
                <Nav.Link>
                  <i className='fas fa-bell'></i> Notifications
                </Nav.Link>
              </LinkContainer>
              <NavDropdown
                id='nav-dropdown-dark-example'
                title='19EUCB045'
                menuVariant='dark'
              >
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <i className='fas fa-user'></i> Profile
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/clubs'>
                  <NavDropdown.Item><i className='fas fa-users'></i> Clubs</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/settings'>
                  <NavDropdown.Item><i className='fas fa-cogs'></i> Settings</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/help'>
                  <NavDropdown.Item><i className='fas fa-question-circle'></i> Help</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Divider />
                <LinkContainer to='/logout'>
                  <NavDropdown.Item><i className='fas fa-sign-out-alt'></i> Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
