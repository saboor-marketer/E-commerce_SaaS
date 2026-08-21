import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiCheckCircle } from 'react-icons/fi';
import ProductCard from '../components/product/ProductCard';
import { products, categories, testimonials } from '../data/products';

const Home = () => {
  const featuredProducts = products.filter(p => p.featured).slice(0, 4);
  const latestProducts = products.slice(0, 8);

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

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                Discover Premium Products for Modern Living
              </h1>
              <p className="hero-subtitle">
                Shop the latest electronics, fashion, home essentials, and more. Quality guaranteed with fast shipping.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Link to="/shop" className="btn btn-light btn-lg">
                  Shop Now <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                </Link>
                <Link to="/categories" className="btn btn-outline-light btn-lg">
                  Browse Categories
                </Link>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                alt="Hero"
                className="img-fluid rounded-4"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Shop by Category</h2>
            <p className="text-muted">Explore our wide range of products</p>
          </div>
          <div className="row g-4">
            {categories.map(category => (
              <div key={category.id} className="col-6 col-md-4 col-lg-2">
                <Link to={`/shop?category=${category.name}`} className="text-decoration-none">
                  <div className="category-card">
                    <img src={category.image} alt={category.name} />
                    <div className="category-overlay">
                      <span className="category-name">{category.name}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Featured Products</h2>
              <p className="text-muted mb-0">Handpicked selections for you</p>
            </div>
            <Link to="/shop" className="btn btn-outline">
              View All <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
          <div className="row g-4">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="mb-3">
                  <FiCheckCircle style={{ fontSize: '3rem', color: 'var(--primary-color)' }} />
                </div>
                <h5>Quality Guarantee</h5>
                <p className="text-muted">Every product is carefully selected for quality</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="mb-3">
                  <FiCheckCircle style={{ fontSize: '3rem', color: 'var(--primary-color)' }} />
                </div>
                <h5>Fast Shipping</h5>
                <p className="text-muted">Free shipping on orders over $100</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="mb-3">
                  <FiCheckCircle style={{ fontSize: '3rem', color: 'var(--primary-color)' }} />
                </div>
                <h5>Secure Payment</h5>
                <p className="text-muted">Your transactions are always protected</p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="text-center">
                <div className="mb-3">
                  <FiCheckCircle style={{ fontSize: '3rem', color: 'var(--primary-color)' }} />
                </div>
                <h5>24/7 Support</h5>
                <p className="text-muted">Our team is here to help anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">New Arrivals</h2>
              <p className="text-muted mb-0">Fresh products just added</p>
            </div>
            <Link to="/shop" className="btn btn-outline">
              View All <FiArrowRight style={{ marginLeft: '0.5rem' }} />
            </Link>
          </div>
          <div className="row g-4">
            {latestProducts.map(product => (
              <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">What Our Customers Say</h2>
            <p className="text-muted">Real reviews from real customers</p>
          </div>
          <div className="row g-4">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="testimonial-avatar">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                  </div>
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <h5 className="testimonial-author">{testimonial.name}</h5>
                  <p className="testimonial-role">{testimonial.role}</p>
                  <div className="mt-3">
                    {renderStars(5)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-5">
        <div className="container">
          <div className="card bg-gradient text-white border-0" style={{ borderRadius: 'var(--radius-xl)' }}>
            <div className="card-body p-5">
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <h2 className="mb-3">Summer Sale - Up to 50% Off</h2>
                  <p className="mb-4" style={{ opacity: 0.9 }}>
                    Don't miss out on our biggest sale of the season. Limited time offer on selected items.
                  </p>
                  <Link to="/shop" className="btn btn-light btn-lg">
                    Shop Sale <FiArrowRight style={{ marginLeft: '0.5rem' }} />
                  </Link>
                </div>
                <div className="col-lg-4 d-none d-lg-block">
                  <img
                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=300&fit=crop"
                    alt="Sale"
                    className="img-fluid rounded-4"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-text">
            Subscribe to our newsletter for exclusive deals, new arrivals, and insider tips.
          </p>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); if (window.toast) window.toast('Thank you for subscribing!', 'success'); }}>
            <input
              type="email"
              className="newsletter-input"
              placeholder="Enter your email"
              required
            />
            <button type="submit" className="btn btn-light">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
