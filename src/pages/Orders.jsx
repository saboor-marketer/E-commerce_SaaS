import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPackage, FiSearch, FiEye, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import EmptyState from '../components/common/EmptyState';

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Load orders from localStorage
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, [isAuthenticated, navigate]);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered':
        return <FiCheckCircle className="text-success" />;
      case 'Processing':
        return <FiClock className="text-warning" />;
      case 'Shipped':
        return <FiTruck className="text-primary" />;
      default:
        return <FiPackage />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'badge-success';
      case 'Processing':
        return 'badge-warning';
      case 'Shipped':
        return 'badge-primary';
      default:
        return 'badge-secondary';
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="mb-1">My Orders</h1>
            <p className="text-muted mb-0">Track and manage your orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text">
                    <FiSearch />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search by order ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="row g-4">
            {filteredOrders.map(order => (
              <div key={order.id} className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-8">
                        <div className="d-flex align-items-center gap-3 mb-2">
                          <h5 className="mb-0">{order.id}</h5>
                          <span className={`badge ${getStatusBadge(order.status)}`}>
                            {getStatusIcon(order.status)} {order.status}
                          </span>
                        </div>
                        <p className="text-muted small mb-2">
                          Placed on {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                        </p>
                        <p className="text-muted small mb-0">
                          {order.items.length} item{order.items.length !== 1 ? 's' : ''} • ${order.total.toFixed(2)}
                        </p>
                      </div>
                      <div className="col-md-4 text-md-end mt-3 mt-md-0">
                        <button className="btn btn-outline">
                          <FiEye className="me-2" />
                          View Details
                        </button>
                      </div>
                    </div>

                    {/* Order Items Preview */}
                    <div className="mt-3 pt-3 border-top">
                      <div className="d-flex gap-2 flex-wrap">
                        {order.items.slice(0, 4).map(item => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="rounded"
                            style={{
                              width: '50px',
                              height: '50px',
                              objectFit: 'cover'
                            }}
                          />
                        ))}
                        {order.items.length > 4 && (
                          <div
                            className="rounded d-flex align-items-center justify-content-center bg-light"
                            style={{
                              width: '50px',
                              height: '50px',
                              fontSize: '0.75rem'
                            }}
                          >
                            +{order.items.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon="inbox"
            title="No orders found"
            message={orders.length === 0 ? "You haven't placed any orders yet." : "No orders match your search criteria."}
            action={() => navigate('/shop')}
            actionText="Start Shopping"
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
