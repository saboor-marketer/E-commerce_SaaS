import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  const cartCount = getCartCount();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">
        <Link className="navbar-brand" to="/">
          ShopHub
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMobileMenu}
          style={{ border: 'none', background: 'none', fontSize: '1.5rem' }}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/')}`} to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/shop')}`} to="/shop">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/dashboard')}`} to="/dashboard">
                Dashboard
              </Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <button
              className="btn btn-link"
              onClick={toggleSearch}
              style={{ border: 'none', background: 'none', color: 'inherit' }}
            >
              <FiSearch style={{ fontSize: '1.25rem' }} />
            </button>

            <Link className="btn btn-link position-relative" to="/cart" style={{ border: 'none', background: 'none', color: 'inherit' }}>
              <FiShoppingCart style={{ fontSize: '1.25rem' }} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="dropdown">
                <button
                  className="btn btn-link dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  style={{ border: 'none', background: 'none', color: 'inherit' }}
                >
                  <FiUser style={{ fontSize: '1.25rem' }} />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <div className="dropdown-item-text">
                      <strong>{user?.name}</strong>
                      <br />
                      <small className="text-muted">{user?.email}</small>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <Link className="dropdown-item" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item" onClick={logout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link className="btn btn-link" to="/login" style={{ border: 'none', background: 'none', color: 'inherit' }}>
                <FiUser style={{ fontSize: '1.25rem' }} />
              </Link>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className="position-absolute" style={{ top: '100%', left: 0, right: 0, background: 'white', padding: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000 }}>
            <div className="container">
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
                setIsSearchOpen(false);
              }}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                  />
                  <button className="btn btn-primary" type="submit">
                    Search
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
