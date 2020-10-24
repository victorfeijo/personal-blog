import React from 'react';
import Image from 'gatsby-image';

import './card.css';

const Card = ({ children }) => (
  <div className="card">
    {children}
  </div>
);

const CardBody = ({ children }) => (
  <div className="card-body">
    {children}
  </div>
);

const CardImage = ({ image, imgStyle }) => (
  <Image
    fluid={image}
    imgStyle={imgStyle}
    className="card-image"
  />
);

CardImage.defaultProps = {
  imgStyle: {},
};

Card.Body = CardBody;
Card.Image = CardImage;

export default Card;
