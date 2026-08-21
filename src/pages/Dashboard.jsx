import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiHeart, FiMapPin, FiSettings, FiLogOut, FiPackage, FiTrendingUp, FiDollarSign, FiUsers, FiClock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    pendingOrders: 0,
    wishlistItems: 0
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders.slice(0, 5)); // Show recent 5 orders

    // Calculate stats
    const totalOrders = savedOrders.length;
    const totalSpent = savedOrders.reduce((sum, order) => sum + order.total, 0);
    const pendingOrders = savedOrders.filter(order => order.status === 'Processing').length;

    setStats({
      totalOrders,
      totalSpent,
      pendingOrders,
      wishlistItems: 0 // Mock data
    });
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-1">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted mb-0">Manage your account and view your orders</p>
          </div>
          <div className="d-flex gap-2">
            <Link to="/profile" className="btn btn-outline">
              <FiSettings className="me-2" />
              Settings
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="row g-4 mb-5">
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="dashboard-label">Total Orders</p>
                  <div className="dashboard-stat">{stats.totalOrders}</div>
                </div>
                <div className="text-primary fs-3">
                  <FiPackage />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="dashboard-label">Total Spent</p>
                  <div className="dashboard-stat">${stats.totalSpent.toFixed(2)}</div>
                </div>
                <div className="text-success fs-3">
                  <FiDollarSign />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="dashboard-label">Pending Orders</p>
                  <div className="dashboard-stat">{stats.pendingOrders}</div>
                </div>
                <div className="text-warning fs-3">
                  <FiClock />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="dashboard-card">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <p className="dashboard-label">Wishlist</p>
                  <div className="dashboard-stat">{stats.wishlistItems}</div>
                </div>
                <div className="text-danger fs-3">
                  <FiHeart />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Recent Orders */}
          <div className="col-lg-8 mb-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h3 className="mb-0">Recent Orders</h3>
                  <Link to="/orders" className="btn btn-outline btn-sm">
                    View All
                  </Link>
                </div>

                {orders.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Date</th>
                          <th>Items</th>
                          <th>Total</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map(order => (
                          <tr key={order.id}>
                            <td>
                              <Link to={`/orders`} className="text-decoration-none fw-bold">
                                {order.id}
                              </Link>
                            </td>
                            <td>{new Date(order.date).toLocaleDateString()}</td>
                            <td>{order.items.length} items</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>
                              <span className={`badge ${
                                order.status === 'Delivered' ? 'badge-success' :
                                order.status === 'Processing' ? 'badge-warning' :
                                'badge-primary'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <FiPackage style={{ fontSize: '3rem', color: 'var(--gray-300)' }} />
                    <p className="text-muted mt-3">No orders yet</p>
                    <Link to="/shop" className="btn btn-primary mt-2">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-lg-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h3 className="mb-4">Quick Actions</h3>
                <div className="d-flex flex-column gap-3">
                  <Link to="/shop" className="btn btn-outline text-start">
                    <FiShoppingBag className="me-2" />
                    Continue Shopping
                  </Link>
                  <Link to="/orders" className="btn btn-outline text-start">
                    <FiPackage className="me-2" />
                    View All Orders
                  </Link>
                  <Link to="/profile" className="btn btn-outline text-start">
                    <FiMapPin className="me-2" />
                    Manage Addresses
                  </Link>
                  <Link to="/profile" className="btn btn-outline text-start">
                    <FiHeart className="me-2" />
                    View Wishlist
                  </Link>
                  <Link to="/profile" className="btn btn-outline text-start">
                    <FiSettings className="me-2" />
                    Account Settings
                  </Link>
                  <button
                    className="btn btn-outline-danger text-start"
                    onClick={handleLogout}
                  >
                    <FiLogOut className="me-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* Account Info */}
            <div className="card mt-4">
              <div className="card-body">
                <h3 className="mb-4">Account Info</h3>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="rounded-circle"
                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-0">{user?.name}</h5>
                    <p className="text-muted small mb-0">{user?.email}</p>
                  </div>
                </div>
                <div className="small text-muted">
                  <p className="mb-1"><strong>Member since:</strong> {user?.joinDate}</p>
                  <p className="mb-0"><strong>Account type:</strong> {user?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
