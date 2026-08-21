import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FiStar key={i} className="star" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<FiStar key={i} className="star" style={{ opacity: 0.5 }} />);
      } else {
        stars.push(<FiStar key={i} className="star" style={{ opacity: 0.3 }} />);
      }
    }
    return stars;
  };

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <div className="card product-card h-100">
        <div className="product-image">
          {discount > 0 && (
            <span className="badge badge-discount">-{discount}%</span>
          )}
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
          />
          <button
            className="btn btn-primary position-absolute"
            style={{
              bottom: '1rem',
              right: '1rem',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              padding: '0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
          </button>
        </div>
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h5 className="product-title">{product.name}</h5>
          <div className="product-rating">
            {renderStars(product.rating)}
            <span className="text-muted small ms-1">({product.reviews})</span>
          </div>
          <div className="product-price">
            ${product.price.toFixed(2)}
            {product.originalPrice && (
              <span className="product-original-price">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
