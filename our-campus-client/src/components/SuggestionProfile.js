import React from "react";
import { Button, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const SuggestionProfile = ({ profile }) => {
  return (
    <Row className='mb-3'>
      <Col xs='3'>
        <Image src={profile.image} width='48px' height='48px' roundedCircle />
      </Col>
      <Col xs='8' className='d-flex align-items-center'>
        <Col xs='8'>
          <Row>
            <Link to='/profile/sadu' className='username'>
              {profile.name}
            </Link>
          </Row>
          <Row>
            <small className='text-muted'>{profile.name}</small>
          </Row> 
        </Col>
        <Col className='mx-1'>
          <Button size='sm' variant='secondary'>
            Request
          </Button>
          {/* <Button size='sm' variant='outline-secondary'>
            <small>Requested</small>
          </Button> */}
        </Col>
      </Col>
    </Row>
  );
};

export default SuggestionProfile;
