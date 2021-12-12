import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const profile = {
  username: "19EUCB045",
  name: "Sadurathman V",
  tagline: "MERN Stack Developer | Content Creator | Student '23",
  dp: "1.jpg",
  respect: 50,
  rating: 4.5,
  followers: 100,
  following: 22,
  skills: ["cpp", "java", "MERN"],
};

const ProfileSummary = () => {
  return (
    <Card bg='dark' text='white' className='my-3 p-3 rounded'>
      <Card.Header className='mx-auto'>
        <Image src={profile.dp} width='64px' height='64px' roundedCircle />
      </Card.Header>
      <Card.Body>
        <Container>
          <Row>
            <Col></Col>
            <Col xl='auto' md='auto'>
              <Link to='/profile/sadu' className='username'>
                {profile.name}
              </Link>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <small className='text-muted align-items-center d-flex justify-content-center'>
              {profile.tagline}
            </small>
          </Row>
          <br />
          <Row>
            <Rating text={"Rating : "} value={5} />
          </Row>
        </Container>
      </Card.Body>
      <Card.Footer>
        <Link to="/profile">
          <Button size="sm" variant="info" className="me-3">Edit Profile</Button>
        </Link>
        <Link to="/enrollments">
          <Button size="sm" variant="outline-light">Enrollments</Button>
        </Link>
      </Card.Footer>
    </Card>
  );
};

export default ProfileSummary;
