import { Link } from 'react-router-dom';
import { FiArrowLeft, FiTrash2, FiShoppingBag, FiLock, FiTruck, FiRotateCcw, FiHeadphones } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import EmptyState from '../components/common/EmptyState';

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    getSubtotal, 
    getTax, 
    getShipping, 
    getTotal 
  } = useCart();

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
    }
  };

  if (cart.length === 0) {
    return (
      <div className="py-5 fade-in">
        <div className="container">
          <EmptyState
            icon="shoppingBag"
            title="Your cart is empty"
            message="Looks like you haven't added any items to your cart yet."
            action={() => window.location.href = '/shop'}
            actionText="Start Shopping"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <Link to="/shop" className="btn btn-link mb-2" style={{ border: 'none', background: 'none', color: 'inherit' }}>
              <FiArrowLeft /> Continue Shopping
            </Link>
            <h1 className="mb-0">Shopping Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})</h1>
          </div>
          {cart.length > 0 && (
            <button
              className="btn btn-outline-danger"
              onClick={handleClearCart}
            >
              <FiTrash2 className="me-2" />
              Clear Cart
            </button>
          )}
        </div>

        <div className="row">
          {/* Cart Items */}
          <div className="col-lg-8">
            <div className="card">
              <div className="card-body p-0">
                {cart.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="col-lg-4">
            <div className="card cart-summary">
              <h3 className="mb-4">Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Tax (8%)</span>
                <span>${getTax().toFixed(2)}</span>
              </div>
              
              <div className="summary-row">
                <span>Shipping</span>
                <span>
                  {getShipping() === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    `$${getShipping().toFixed(2)}`
                  )}
                </span>
              </div>

              {getShipping() > 0 && (
                <div className="alert alert-info small mt-2">
                  Add ${(100 - getSubtotal()).toFixed(2)} more for free shipping!
                </div>
              )}
              
              <div className="summary-row total">
                <span>Total</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>

              <Link to="/checkout" className="btn btn-primary w-100 btn-lg mt-4">
                Proceed to Checkout
              </Link>

              <div className="mt-3 text-center text-muted small">
                <FiLock className="me-1" />
                Secure checkout powered by Stripe
              </div>
            </div>

            {/* Trust Badges */}
            <div className="card mt-3">
              <div className="card-body">
                <div className="d-flex justify-content-around text-center">
                  <div>
                    <div className="text-muted small mb-1"><FiLock /></div>
                    <div className="small">Secure Payment</div>
                  </div>
                  <div>
                    <div className="text-muted small mb-1"><FiTruck /></div>
                    <div className="small">Fast Shipping</div>
                  </div>
                  <div>
                    <div className="text-muted small mb-1"><FiRotateCcw /></div>
                    <div className="small">Easy Returns</div>
                  </div>
                  <div>
                    <div className="text-muted small mb-1"><FiHeadphones /></div>
                    <div className="small">24/7 Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
