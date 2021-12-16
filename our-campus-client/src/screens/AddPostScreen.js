import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";
import {createPost} from "../actions/postActions";
import FormContainer from "../components/FormContainer";
import axios from 'axios';

const AddPostScreen = ({ match, history }) => {
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [dp, setDp] = useState("");
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const postInfo = useSelector((state) => state.postCreate);
  const { loading, success } = postInfo;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!userInfo.name) {
        dispatch(getUserDetails("Profile"));
      } else {
        setDp(userInfo.dp);
        setUsername(userInfo.username);
      }
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createPost({ username, image, dp, caption}));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post("/api/upload", formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <>
      <FormContainer>
        <h1>Add Post</h1>
        {success && <Message variant="success">Post Added</Message>}
        {loading && <Loader />}
          <Form onSubmit={submitHandler}>

            <Form.Group controlId="image">
              <Form.Label>Select Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Choose File"
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

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
              Add
            </Button>
          </Form>
      </FormContainer>
    </>
  );
};

export default AddPostScreen;