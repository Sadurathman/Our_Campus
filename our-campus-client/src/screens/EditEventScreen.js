import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {updatePost} from "../actions/postActions";
import FormContainer from "../components/FormContainer";
import { getUserDetails } from "../actions/userActions";

const UpdatePostScreen = ({history, event }) => {
  const [caption, setCaption] = useState("");
  const [_id, setId] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postInfo = useSelector((state) => state.postUpdate);
  const { loading, success} = postInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails("Profile"));
      }
      else {
        setCaption(event.caption);
        setId(event._id);
      }
    }
  }, [dispatch, history, userInfo, event]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost({caption, _id}));
  };

  return (
    <>
      <FormContainer>
        <h1>Edit Event</h1>
        {success && <Message variant="success">Event Updated</Message>}
        {loading && <Loader />}
          <Form onSubmit={submitHandler}>

            <Form.Group controlId="Caption">
              <Form.Label>Caption</Form.Label>
              <Form.Control
                type="Caption"
                placeholder="Enter Caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <br/>
            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
      </FormContainer>
    </>
  );
};

export default UpdatePostScreen;