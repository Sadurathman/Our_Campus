import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SuggestionProfile from './SuggestionProfile';

const profiles = [{
  name: "19EUCB045",
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
  name: "19EUCB045",
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
  name: "19EUCB045",
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
  name: "19EUCB045",
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
  brand: "MERN Stack Developer | Content Creator | Student '23",
  category: "Electronics",
  likes: 29,
  comments: 4,
  numReviews: 12,
}
];

const Suggestions = () => {
  return (
    <Card bg="dark" text="white" className="my-3 rounded">
      <Card.Header>
        Suggestions
      </Card.Header>
        <Card.Body>
          {profiles.map((profile)=>(
            <SuggestionProfile profile={profile}/>
            ))}
        </Card.Body>
      <Card.Footer>
        <Link to="/username/suggestions" className="username">
          See More
        </Link>
      </Card.Footer>
    </Card>
  );
}

export default Suggestions;
