import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleIncrease = () => {
    onUpdateQuantity(item.id, item.quantity + 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h5 className="cart-item-title">{item.name}</h5>
        <p className="cart-item-price">${item.price.toFixed(2)}</p>
        <div className="cart-item-quantity">
          <button className="quantity-btn" onClick={handleDecrease}>
            <FiMinus />
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button className="quantity-btn" onClick={handleIncrease}>
            <FiPlus />
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-end justify-content-between">
        <p className="fw-bold mb-0">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <button
          className="cart-item-remove"
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
