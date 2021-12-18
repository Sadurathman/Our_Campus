import React, {useState} from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Modal, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { deleteEvent } from "../actions/eventActions";
import EditPostScreen from '../screens/EditPostScreen';

const Event = ({ event, profile }) => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = useState(false);

  function UpdatePost(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPostScreen event = {props.event}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (<>
  <UpdatePost
      event = {event}
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
    <Card bg='dark' text='white' className='my-3 p-3 rounded'>
      <Card.Header>
        <Row>
          <Col>
            {/* <Image src={event.image} width='48px' height='48px' roundedCircle /> */}
          </Col>
          <Col>
            {/* <Link to={`/profile/${event.username}`} className='username me-auto'>
              {event.username}
            </Link> */}
          </Col>
          <Col className="text-center">
            {profile && profile.username === event.username && (<>
            <Button onClick={()=> {setModalShow(true);}} className='mx-auto py-1 px-2 me-2' size='small' variant="info">
              <small>Edit</small>
            </Button>
            <Button onClick={()=>{ dispatch(deleteEvent(event._id))}} className='mx-auto py-1 px-2' size='small' variant='danger'>
              <small>
                Delete
              </small>
            </Button>
             </>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Link to={`/event/${event._id}`}>
        <Card.Img src={event.image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>
          <strong>{event.caption}</strong>
        </Card.Title>
        <i className='like fas fa-heart fa-2x'></i>{" "}
        <i className='far fa-comment fa-2x'></i>{" "}
        <i className='fas fa-share fa-2x'></i>{" "}
      </Card.Body>
      <Card.Footer>
        <Button variant="info">Enroll</Button>
      </Card.Footer>
    </Card>
</>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps)(Event);
