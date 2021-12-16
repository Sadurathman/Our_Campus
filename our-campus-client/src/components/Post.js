import React from "react";
import { Link } from "react-router-dom";
import { Button, Card, Col, Image, Modal, Row } from "react-bootstrap";
import { connect, useDispatch } from "react-redux";
import { deletePost } from "../actions/postActions";
import EditPostScreen from '../screens/EditPostScreen';

const Post = ({ post, profile }) => {
  const dispatch = useDispatch();

  const [modalShow, setModalShow] = React.useState(false);

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
            Edit Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPostScreen post = {props.post}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (<>
  <UpdatePost
      post = {post}
      show={modalShow}
      onHide={() => setModalShow(false)}
      />
    <Card bg='dark' text='white' className='my-3 p-3 rounded'>
      <Card.Header>
        <Row>
          <Col>
            <Image src={post.image} width='48px' height='48px' roundedCircle />
          </Col>
          <Col>
            <Link to={`/profile/${post.username}`} className='username me-auto'>
              {post.username}
            </Link>
          </Col>
          <Col className="text-center">
            {profile && profile.username === post.username && (<>
            <Button onClick={()=> {setModalShow(true);}} className='mx-auto py-1 px-2 me-2' size='small' variant="info">
              <small>Edit</small>
            </Button>
            <Button onClick={()=>{ dispatch(deletePost(post._id))}} className='mx-auto py-1 px-2' size='small' variant='danger'>
              <small>
                Delete
              </small>
            </Button>
             </>
            )}
          </Col>
        </Row>
      </Card.Header>
      <Link to={`/post/${post._id}`}>
        <Card.Img src={post.image} variant='top' />
      </Link>
      <Card.Body>
        <Card.Title as='div'>
          <strong>{post.caption}</strong>
        </Card.Title>
        <i className='like fas fa-heart fa-2x'></i>{" "}
        <i className='far fa-comment fa-2x'></i>{" "}
        <i className='fas fa-share fa-2x'></i>{" "}
      </Card.Body>
      {/* <Card.Footer>
        Comment <input style={{border:"none"}}/>
      </Card.Footer> */}
    </Card>
</>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userLogin.userInfo,
  };
};

export default connect(mapStateToProps)(Post);
