import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import products from '../seed';

const ProductsPage = () => {
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Our Products</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img 
                variant="top" 
                src={product.images[0]} 
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text 
                  className="flex-grow-1"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-primary">${(product.price / 100).toFixed(2)}</h5>
                  <Button variant="primary">Add to Cart</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsPage;
