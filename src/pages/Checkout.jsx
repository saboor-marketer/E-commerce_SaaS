import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiTruck, FiLock } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getSubtotal, getTax, getShipping, getTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    // Customer Info
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    
    // Shipping Address
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvc: '',
    
    // Save info
    saveInfo: false
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Customer Info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';

    // Shipping Address
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    // Payment (card)
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
      else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) 
        newErrors.cardNumber = 'Card number must be 16 digits';
      
      if (!formData.cardName.trim()) newErrors.cardName = 'Cardholder name is required';
      
      if (!formData.cardExpiry.trim()) newErrors.cardExpiry = 'Expiry date is required';
      else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.cardExpiry))
        newErrors.cardExpiry = 'Use MM/YY format';
      
      if (!formData.cardCvc.trim()) newErrors.cardCvc = 'CVC is required';
      else if (!/^\d{3,4}$/.test(formData.cardCvc))
        newErrors.cardCvc = 'CVC must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const newOrderId = 'ORD-' + Date.now().toString().slice(-8);
    setOrderId(newOrderId);
    
    // Save order to localStorage (mock)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      items: cart,
      subtotal: getSubtotal(),
      tax: getTax(),
      shipping: getShipping(),
      total: getTotal(),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      },
      status: 'Processing'
    };
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    clearCart();

    setIsProcessing(false);
    setOrderPlaced(true);
  };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="py-5 text-center">
        <h2>Your cart is empty</h2>
        <Link to="/shop" className="btn btn-primary mt-3">
          Go to Shop
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="py-5 fade-in">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card text-center" style={{ padding: '3rem' }}>
                <div className="mb-4">
                  <FiCheckCircle style={{ fontSize: '4rem', color: 'var(--success-color)' }} />
                </div>
                <h1 className="mb-3">Order Placed Successfully!</h1>
                <p className="text-muted mb-4">
                  Thank you for your purchase. Your order has been received and is being processed.
                </p>
                <div className="alert alert-info d-inline-block">
                  <strong>Order ID:</strong> {orderId}
                </div>
                <p className="text-muted mt-4">
                  A confirmation email has been sent to {formData.email}
                </p>
                <div className="d-flex gap-3 justify-content-center mt-4">
                  <Link to="/orders" className="btn btn-primary">
                    View Orders
                  </Link>
                  <Link to="/shop" className="btn btn-outline">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-5 fade-in">
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <Link to="/cart" className="btn btn-link mb-2" style={{ border: 'none', background: 'none', color: 'inherit' }}>
            <FiArrowLeft /> Back to Cart
          </Link>
          <h1 className="mb-0">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Checkout Form */}
            <div className="col-lg-8">
              {/* Customer Information */}
              <div className="checkout-section">
                <h3 className="checkout-title">
                  <FiLock className="me-2" />
                  Customer Information
                </h3>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                    />
                    {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                    {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="checkout-section">
                <h3 className="checkout-title">
                  <FiTruck className="me-2" />
                  Shipping Address
                </h3>
                
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Street Address *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Apartment, suite, etc. (optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      placeholder="Apt 4B"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.state ? 'is-invalid' : ''}`}
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NY"
                    />
                    {errors.state && <div className="invalid-feedback">{errors.state}</div>}
                  </div>
                  <div className="col-md-3">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      className={`form-control ${errors.zipCode ? 'is-invalid' : ''}`}
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      placeholder="10001"
                    />
                    {errors.zipCode && <div className="invalid-feedback">{errors.zipCode}</div>}
                  </div>
                  <div className="col-12">
                    <label className="form-label">Country</label>
                    <select
                      className="form-select"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="checkout-section">
                <h3 className="checkout-title">
                  <FiCreditCard className="me-2" />
                  Payment Method
                </h3>
                
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="card"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="card">
                      Credit/Debit Card
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentMethod"
                      id="paypal"
                      value="paypal"
                      checked={formData.paymentMethod === 'paypal'}
                      onChange={handleInputChange}
                    />
                    <label className="form-check-label" htmlFor="paypal">
                      PayPal
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label">Card Number *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardNumber ? 'is-invalid' : ''}`}
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                      />
                      {errors.cardNumber && <div className="invalid-feedback">{errors.cardNumber}</div>}
                    </div>
                    <div className="col-12">
                      <label className="form-label">Cardholder Name *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardName ? 'is-invalid' : ''}`}
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                      />
                      {errors.cardName && <div className="invalid-feedback">{errors.cardName}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Expiry Date *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardExpiry ? 'is-invalid' : ''}`}
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        maxLength="5"
                      />
                      {errors.cardExpiry && <div className="invalid-feedback">{errors.cardExpiry}</div>}
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">CVC *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.cardCvc ? 'is-invalid' : ''}`}
                        name="cardCvc"
                        value={formData.cardCvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        maxLength="4"
                      />
                      {errors.cardCvc && <div className="invalid-feedback">{errors.cardCvc}</div>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === 'paypal' && (
                  <div className="alert alert-info">
                    You will be redirected to PayPal to complete your payment securely.
                  </div>
                )}

                <div className="form-check mt-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="saveInfo">
                    Save this information for next time
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="col-lg-4">
              <div className="card order-summary sticky-top" style={{ top: '100px' }}>
                <h3 className="mb-4">Order Summary</h3>
                
                {/* Cart Items Preview */}
                <div className="mb-4">
                  {cart.slice(0, 3).map(item => (
                    <div key={item.id} className="d-flex gap-2 mb-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                      <div className="flex-grow-1">
                        <div className="small fw-bold">{item.name}</div>
                        <div className="small text-muted">Qty: {item.quantity}</div>
                      </div>
                      <div className="small fw-bold">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <div className="small text-muted">
                      +{cart.length - 3} more items
                    </div>
                  )}
                </div>

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
                
                <div className="summary-row total">
                  <span>Total</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg mt-4"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>

                <div className="mt-3 text-center text-muted small">
                  <FiLock className="me-1" />
                  Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
