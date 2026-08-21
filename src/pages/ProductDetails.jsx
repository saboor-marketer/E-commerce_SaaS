import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import { products } from '../data/products';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Get related products (same category, excluding current product)
      const related = products
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product?.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FiStar key={i} className="star" />);
      } else {
        stars.push(<FiStar key={i} className="star" style={{ opacity: 0.3 }} />);
      }
    }
    return stars;
  };

  if (!product) {
    return (
      <div className="py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/shop" className="btn btn-primary mt-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-4">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/shop">Shop</Link></li>
            <li className="breadcrumb-item"><Link to={`/shop?category=${product.category}`}>{product.category}</Link></li>
            <li className="breadcrumb-item active">{product.name}</li>
          </ol>
        </nav>

        <div className="row g-5">
          {/* Product Images */}
          <div className="col-lg-6">
            <div className="product-main-image mb-3">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-thumbnails">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={product.image} alt={`${product.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info-section">
              {discount > 0 && (
                <span className="badge badge-danger mb-2">-{discount}% OFF</span>
              )}
              
              <h1 className="mb-3">{product.name}</h1>
              
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="product-rating">
                  {renderStars(product.rating)}
                </div>
                <span className="text-muted">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <div className="mb-4">
                <span className="product-price fs-3">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="product-original-price fs-5 ms-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-muted mb-4">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-4">
                {product.stock > 0 ? (
                  <span className="badge badge-success">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="badge badge-danger">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Quantity Selector */}
              <div className="quantity-selector mb-4">
                <label className="form-label me-3">Quantity:</label>
                <div className="d-flex align-items-center">
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <FiMinus />
                  </button>
                  <span className="quantity-display mx-3">{quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mb-4">
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <FiShoppingCart className="me-2" />
                  Add to Cart
                </button>
                <button className="btn btn-outline">
                  <FiHeart />
                </button>
                <button className="btn btn-outline">
                  <FiShare2 />
                </button>
              </div>

              {/* Features */}
              <div className="row g-3 mt-4">
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <FiTruck className="text-primary" />
                    <small className="text-muted">Free shipping on orders over $100</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <FiShield className="text-primary" />
                    <small className="text-muted">2-year warranty</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <FiRotateCcw className="text-primary" />
                    <small className="text-muted">30-day returns</small>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center gap-2">
                    <FiShield className="text-primary" />
                    <small className="text-muted">Secure payment</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <ul className="nav nav-tabs mb-3" id="productTabs" role="tablist">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#description"
                      type="button"
                    >
                      Description
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#specifications"
                      type="button"
                    >
                      Specifications
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#reviews"
                      type="button"
                    >
                      Reviews ({product.reviews})
                    </button>
                  </li>
                </ul>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="description">
                    <h4>Product Description</h4>
                    <p className="text-muted">{product.description}</p>
                    <p className="text-muted">
                      This premium product is designed with quality and durability in mind. 
                      Perfect for everyday use, it combines functionality with style to meet your needs.
                    </p>
                  </div>
                  <div className="tab-pane fade" id="specifications">
                    <h4>Specifications</h4>
                    <table className="table">
                      <tbody>
                        <tr>
                          <td><strong>Category:</strong></td>
                          <td>{product.category}</td>
                        </tr>
                        <tr>
                          <td><strong>SKU:</strong></td>
                          <td>SKU-{product.id}</td>
                        </tr>
                        <tr>
                          <td><strong>Rating:</strong></td>
                          <td>{product.rating} / 5</td>
                        </tr>
                        <tr>
                          <td><strong>Stock:</strong></td>
                          <td>{product.stock} units</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="tab-pane fade" id="reviews">
                    <h4>Customer Reviews</h4>
                    <p className="text-muted">This product has {product.reviews} reviews with an average rating of {product.rating} stars.</p>
                    <div className="alert alert-info">
                      Reviews feature coming soon! Be the first to review this product.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="row mt-5">
            <div className="col-12">
              <h3 className="mb-4">Related Products</h3>
              <div className="row g-4">
                {relatedProducts.map(relatedProduct => (
                  <div key={relatedProduct.id} className="col-lg-3 col-md-6">
                    <ProductCard product={relatedProduct} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
