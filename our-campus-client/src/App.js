import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ProfileEditScreen from "./screens/ProfileEditScreen";
import ProfileScreen from "./screens/ProfileScreen";
import EventScreen from "./screens/EventScreen";
import Message from "./components/Message";
import Chat from "./Chat/Chat";
import DeveloperScreen from "./screens/DeveloperScreen";
import HelpScreen from "./screens/HelpScreen";

function App({ userInfo }) {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          {userInfo ? (
            <>
              <Route path='/' component={HomeScreen} exact />
              <Route path='/profile' component={ProfileScreen} exact />
              <Route
                path='/profile/:username'
                component={ProfileScreen}
                exact
              />
              <Route path='/edit' component={ProfileEditScreen} exact />
              <Route path='/settings' component={ProfileEditScreen} exact />
              <Route path='/event' component={EventScreen} exact />
              <Route path='/chats' component={Chat} />
              <Route path='/help' component={HelpScreen} />
              <Route path='/clubs' component={()=>{
                window.location.href = 'http://skcet.ac.in/clubs.html';
                return null;
              }}/>
            </>
          ) : (
            <>
              <Message variant='danger'>
                Login With SKCET Mail Id to View
              </Message>
              <DeveloperScreen/>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

const mapStateToProps = (state) => {
  return { userInfo: state.userLogin.userInfo };
};

export default connect(mapStateToProps)(App);
