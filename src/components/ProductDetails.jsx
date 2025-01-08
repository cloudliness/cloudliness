import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import './ProductDetails.css';

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleCheckout = () => {
    navigate('/cart');
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (product && product.images && currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-page">
      <h2>{product.name}</h2>
      <div className="product-image-container">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="product-image"
            onClick={openModal}
          />
        ) : product.images && (
          <img
            src={product.images}
            alt={product.name}
            className="product-image"
            onClick={openModal}
          />
        )}
      </div>
      <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
      <p className="product-price">Price: ${product.price / 100}</p>
      <div className="product-actions">
        <button onClick={handleAddToCart}>Add to Cart</button>
        <button onClick={handleCheckout}>Checkout</button>
      </div>

      {modalOpen && (
        <div className="modal fade show" style={{ display: 'block' }} onClick={closeModal}>
          <div className="modal-dialog modal-dialog-centered modal-xl" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                {product.images && product.images.length > 0 ? (
                  <div className="d-flex align-items-center">
                    <button className="btn btn-secondary me-2" onClick={prevImage} disabled={currentImageIndex === 0}>
                      ←
                    </button>
                    <div className="modal-image-container">
                      <img
                        src={product.images[currentImageIndex]}
                        alt={`${product.name} - ${currentImageIndex + 1}`}
                        className="modal-image"
                      />
                    </div>
                    <button
                      className="btn btn-secondary ms-2"
                      onClick={nextImage}
                      disabled={currentImageIndex === product.images.length - 1}
                    >
                      →
                    </button>
                  </div>
                ) : (
                  product.images && (
                    <div className="modal-image-container">
                      <img
                        src={product.images}
                        alt={product.name}
                        className="modal-image"
                      />
                    </div>
                  )
                )}
                <div className="modal-dots d-flex justify-content-center mt-3">
                  {product.images && Array.isArray(product.images) && product.images.map((_, index) => (
                    <span
                      key={index}
                      className={`modal-dot ${index === currentImageIndex ? 'active' : ''}`}
                      onClick={() => goToImage(index)}
                    ></span>
                  ))}
                </div>
                <div className="modal-description mt-3">
                  {product.longDescription}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
