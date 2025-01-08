import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Carousel, Modal } from 'react-bootstrap';
import products from '../seed';
import { useCart } from '../contexts/CartContext';

const ProductsPage = () => {
  const { addToCart } = useCart();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImages, setModalImages] = useState([]);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      price: product.price
    });
  };

  const openModal = (images) => {
    setModalImages(images);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Our Products</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <div onClick={() => openModal(product.images)} style={{ cursor: 'pointer' }}>
                <Carousel interval={null} indicators>
                  {product.images.map((image, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={image}
                        alt={`${product.name} - Image ${index + 1}`}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="flex-grow-1 mb-2">
                  <div dangerouslySetInnerHTML={{ __html: product.description }} />
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary">${(product.price / 100).toFixed(2)}</h5>
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={modalVisible} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Product Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel interval={null} indicators>
            {modalImages.map((image, index) => (
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
    </Container>
  );
};

export default ProductsPage;
