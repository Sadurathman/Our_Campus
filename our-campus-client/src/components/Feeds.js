import React from 'react';
import Post from './Post';
import {Row, Container} from 'react-bootstrap';

const posts = [{
  name: "Amazon Echo Dot 3rd Generation",
  image: "1.jpg",
  description:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  brand: "Amazon",
  category: "Electronics",
  price: 29.99,
  countInStock: 0,
  rating: 4,
  numReviews: 12,
},
  {
  name: "Amazon Echo Dot 3rd Generation",
  image: "2.jpg",
  description:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  brand: "Amazon",
  category: "Electronics",
  price: 29.99,
  countInStock: 0,
  rating: 4,
  numReviews: 12,
},
  {
  name: "Amazon Echo Dot 3rd Generation",
  image: "3.jpg",
  description:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  brand: "Amazon",
  category: "Electronics",
  price: 29.99,
  countInStock: 0,
  rating: 4,
  numReviews: 12,
},
  {
  name: "Amazon Echo Dot 3rd Generation",
  image: "4.jpg",
  description:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  brand: "Amazon",
  category: "Electronics",
  price: 29.99,
  countInStock: 0,
  rating: 4,
  numReviews: 12,
},
  {
  name: "Sadurathman",
  image: "5.jpg",
  caption:
    "Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space",
  userId: "Amazon",
  category: "Electronics",
  likes: 29,
  comments: 4,
  numReviews: 12,
}
];

const Feeds = () =>{
  return (
    <Container>
    {posts.map((post)=>(
      <Row key={post.image}>
          <Post post={post} />
        </Row>
      ))
    }
    </Container>
  )
}

export default Feeds;