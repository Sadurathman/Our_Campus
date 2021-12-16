import React from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Feeds from '../components/Feeds';
import Message from '../components/Message';
import ProfileSummary from '../components/ProfileSummary';
import Suggestions from '../components/Suggestions';
import AddPostScreen from './AddPostScreen';
import Loader from '../components/Loader';

const HomeScreen = ({userInfo, loading}) => {
  const [modalShow, setModalShow] = React.useState(false);
  
  function AddPost(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddPostScreen/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <Container>
      {loading && <Loader/>}
      <Row>
      <Col md={3}><ProfileSummary setModalShow={setModalShow} profile={userInfo}/></Col>
      <Col md={6}>
      <AddPost
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
      {
          userInfo.home.length > 0 ?(
            <Feeds posts = {userInfo.home}/>
            ):(
              <Message>No Feeds</Message>
              )
            }
            </Col>
            <Col md={3}><Suggestions/></Col>
            </Row>
            </Container>
            );
          }

const mapStateToProps = (state) => {
  return { userInfo: state.userLogin.userInfo, loading: state.userLogin.loading };
};

export default  connect(mapStateToProps)(HomeScreen);