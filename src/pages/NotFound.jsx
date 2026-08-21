import { Link } from 'react-router-dom';
import { FiHome, FiSearch } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div className="py-5 fade-in">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div style={{ fontSize: '8rem', fontWeight: '800', color: 'var(--gray-200)', lineHeight: '1' }}>
              404
            </div>
            <h1 className="mb-3">Page Not Found</h1>
            <p className="text-muted mb-4">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/" className="btn btn-primary">
                <FiHome className="me-2" />
                Go Home
              </Link>
              <Link to="/shop" className="btn btn-outline">
                <FiSearch className="me-2" />
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
