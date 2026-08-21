import { FiShoppingBag, FiSearch, FiInbox, FiArrowRight } from 'react-icons/fi';

const EmptyState = ({ 
  icon = 'shoppingBag', 
  title = 'No items found', 
  message = 'There are no items to display at the moment.',
  action = null,
  actionText = 'Continue Shopping'
}) => {
  const getIcon = () => {
    switch (icon) {
      case 'shoppingBag':
        return <FiShoppingBag />;
      case 'search':
        return <FiSearch />;
      case 'inbox':
        return <FiInbox />;
      default:
        return <FiShoppingBag />;
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state-icon">{getIcon()}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-text">{message}</p>
      {action && (
        <button className="btn btn-primary" onClick={action}>
          {actionText} <FiArrowRight style={{ marginLeft: '0.5rem' }} />
        </button>
      )}
    </div>
  );
};

export default EmptyState;
