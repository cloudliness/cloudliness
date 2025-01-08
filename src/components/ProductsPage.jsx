import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import products from '../seed';
import { useCart } from '../contexts/CartContext';
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import { getPreviewText } from '../utils/textUtils';

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

  const handleOpenModal = (images) => {
    setModalImages(images);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Our Products</h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {products.map(product => (
          <Col key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={handleAddToCart}
              onOpenModal={handleOpenModal}
              getPreviewText={getPreviewText}
            />
          </Col>
        ))}
      </Row>

      <ProductModal
        show={modalVisible}
        onHide={handleCloseModal}
        images={modalImages}
      />
    </Container>
  );
};

export default ProductsPage;
