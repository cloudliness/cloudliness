import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ProductCarousel from './ProductCarousel';
import { getPreviewText, formatPrice } from '../utils/textUtils';

const ProductCard = ({ product, onAddToCart, onOpenModal, getPreviewText }) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const toggleDescription = () => {
    setIsDescriptionExpanded(prev => !prev);
  };

  return (
    <Card className="h-100 shadow-sm">
      <div onClick={() => onOpenModal(product.images)} style={{ cursor: 'pointer' }}>
        <ProductCarousel images={product.images} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <div className="flex-grow-1 mb-2">
          {isDescriptionExpanded ? (
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          ) : (
            <div dangerouslySetInnerHTML={{ __html: getPreviewText(product.description) }} />
          )}
          {product.description.length > 200 && (
            <Button
              variant="link"
              onClick={toggleDescription}
              className="p-0 text-decoration-none"
            >
              {isDescriptionExpanded ? 'Read Less' : 'Read More'}
            </Button>
          )}
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="text-primary">{formatPrice(product.price)}</h5>
          <Button
            variant="primary"
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
