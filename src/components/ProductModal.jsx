import React from 'react';
import { Modal, Carousel } from 'react-bootstrap';

const ProductModal = ({ show, onHide, images }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Product Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Carousel interval={null} indicators>
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image}
                alt={`Product Image ${index + 1}`}
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </Modal.Body>
    </Modal>
  );
};

export default ProductModal;
