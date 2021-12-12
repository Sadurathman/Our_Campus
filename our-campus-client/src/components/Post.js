import React from "react";
import { Link } from "react-router-dom";
import { Card, Image } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card bg="dark" text="white" className="my-3 p-3 rounded">
      <Card.Header>
        <Image src={post.image} width="48px" height="48px" roundedCircle />
        {' '}
        <Link to="/profile/sadu" className="username">
          {post.name}
        </Link>
      </Card.Header>
      <Link to={`/post/${post._id}`}>
        <Card.Img src={post.image} variant="top" />
      </Link>
      <Card.Body>
        <Card.Title as="div">
          <strong>{post.description}</strong>
        </Card.Title>
        <i className="like fas fa-heart fa-2x"></i>{' '}
        <i className="far fa-comment fa-2x"></i>{' '}
        <i className="fas fa-share fa-2x"></i>{' '}
      </Card.Body>
      {/* <Card.Footer>
        Comment <input style={{border:"none"}}/>
      </Card.Footer> */}
    </Card>
  );
};

export default Post;