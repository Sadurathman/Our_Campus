import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Feeds from '../components/Feeds';
import ProfileSummary from '../components/ProfileSummary';
import Suggestions from '../components/Suggestions';

const HomeScreen = () => {
  return (
    <Container>
      <Row>
      <Col md={3}><ProfileSummary/></Col>
      <Col md={6}>
        <Feeds />
      </Col>
      <Col md={3}><Suggestions/></Col>
      </Row>
    </Container>
  );
}

export default HomeScreen;