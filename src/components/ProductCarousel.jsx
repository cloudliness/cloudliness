import React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductCarousel = ({ images }) => {
  return (
    <Carousel interval={null} indicators controls={false}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={image}
            alt={`Product Image ${index + 1}`}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
