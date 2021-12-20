import React, { useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";

const HelpScreen = () => {
  const [help, setHelp] = useState("");

  const submitHandler = () =>{
    console.log()
  }

  return (
    <Container>
      <Message variant='info'>Welcome To Help Center</Message>
      <FormContainer>
        <h1>Make your Queries Here</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='Help'>
            <Form.Label>Help</Form.Label>
            <Form.Control
              type='Help'
              placeholder='Enter the Help Required'
              value={help}
              onChange={(e) => setHelp(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <br />
          <Button type='submit' variant='primary'>
            Submit
          </Button>
        </Form>
      </FormContainer>
    </Container>
  );
};

export default HelpScreen;
