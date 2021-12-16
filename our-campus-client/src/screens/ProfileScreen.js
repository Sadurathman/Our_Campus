import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Feeds from "../components/Feeds";
import Rating from "../components/Rating";

// const profile = {
//   username: "19EUCB045",
//   name: "Sadurathman V",
//   tagline: "MERN Stack Developer | Content Creator | Student '23",
//   dp: "/images/1.jpg",
//   respect: 50,
//   rating: 4.5,
//   followers: 100,
//   following: 22,
//   skills: ["cpp", "java", "MERN"],
//   posts: [],
// };

const ProfileScreen = ({ profile }) => {
  return (
    <Container>
      <Card bg='dark' text='white' className='my-3 p-3 rounded'>
        <Card.Body>
          <Container>
            <Row>
              <Col md={3}>
                <Container>
                  <Image
                    src={profile.dp}
                    width='256px'
                    height='256px'
                    roundedCircle
                    className='mx-auto'
                  />
                  <Row className='my-2 text-center'>
                    <Link
                      to={`/profile/${profile.username}`}
                      className='username'
                    >
                      {profile.name}
                    </Link>
                  </Row>
                  <Row>
                    <small className='text-muted mb-1 text-center'>
                      {profile.tagline}
                    </small>
                  </Row>
                </Container>
              </Col>
              <Col className='offset-2 my-3 text-center' md={6}>
                <Row>{profile.about}</Row>
                <Row className='my-5'>
                  <Col>
                    <span>{profile.posts.length}</span>
                    <br />
                    <span>Posts</span>
                  </Col>

                  <Col>
                    <span>{profile.followers.length}</span>
                    <br />
                    <span>Followers</span>
                  </Col>

                  <Col>
                    <span>{profile.following.length}</span>
                    <br />
                    <span>Following</span>
                  </Col>
                </Row>
                <Row className='my-3 text-center'>
                  <Rating text={"Rating : "} value={5} />
                </Row>
                <Link to='/profile/edit'>
                  <Button size='sm' variant='info' className='me-3'>
                    Edit Profile
                  </Button>
                </Link>
                <Link to='/events/enrollments'>
                  <Button size='sm' variant='outline-light'>
                    Enrollments
                  </Button>
                </Link>
                {/* <Row className='my-2'> */}
                {/* <Button  */}
                {/* // onClick={()=> setModalShow(true)}  */}
                {/* size='sm' variant="danger">+ Add Post</Button> */}
                {/* </Row> */}
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>
      <Row>
        <Col className='offset-2' md={8}>
          <Feeds posts={profile.posts} />
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.userLogin.userInfo,
    loading: state.userLogin.loading,
  };
};

export default connect(mapStateToProps)(ProfileScreen);
