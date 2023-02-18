import React, { useEffect } from "react";
import {
  Modal,
  Button,
  Image,
  Row,
  Col,
  Badge,
  Container,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../actions/userActions";

const SkillModelForm = ({ user, children }) => {
  const [show, setShow] = React.useState(false);
  const [skills, setSkills] = React.useState([]);
  const [newSkill, setNewSkill] = React.useState("");
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const removeSkill = (pointedSkillIndex) => {
    setSkills(skills.filter((skill, idx) => idx != pointedSkillIndex));
  };

  useEffect(() => {
    if (user) {
      setSkills(user.skills);
    } else {
      setSkills([]);
    }
  }, [user]);

  const renderSelectedSkills = () =>
    skills.map((skill, idx) => (
      <Col key={idx} className='p-2 m-1 bg-light rounded-pill'>
        {skill}
        <span
          className='bg-danger mx-2 px-2 rounded-pill'
          onClick={() => {
            removeSkill(idx);
          }}
        >
          x
        </span>
      </Col>
    ));

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setSkills([...skills, newSkill]);
    setNewSkill("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        id: user._id,
        skills,
      })
    );
    handleClose();
  };

  return (
    <>
      {children ? (
        <Button variant='link' size='sm' className='me-3' onClick={handleShow}>
          {children}
        </Button>
      ) : (
        <Button
          variant='secondary'
          size='sm'
          className='me-3'
          onClick={handleShow}
        >
          Skills
        </Button>
      )}
      {user && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{user.name}'s Skill Set</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={onSubmitHandler}>
              <InputGroup controlId='Skills'>
                <Form.Control
                  type='Skills'
                  placeholder='Enter Skill'
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                ></Form.Control>
                <Button type='submit' variant='outline-success'>
                  + Add
                </Button>
              </InputGroup>
            </Form>
            <Container className='mt-1 rounded'>
              <Row xs='auto'>{renderSelectedSkills()}</Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='info' onClick={updateHandler}>
              Update
            </Button>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default SkillModelForm;
