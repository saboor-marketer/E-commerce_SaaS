const Loading = ({ type = 'text', count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'text':
        return <div className="skeleton skeleton-text" />;
      case 'title':
        return <div className="skeleton skeleton-title" />;
      case 'image':
        return <div className="skeleton skeleton-image" />;
      case 'card':
        return (
          <div className="card">
            <div className="skeleton skeleton-image" style={{ aspectRatio: '1' }} />
            <div className="card-body">
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-text" />
              <div className="skeleton skeleton-text" />
            </div>
          </div>
        );
      default:
        return <div className="skeleton skeleton-text" />;
    }
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ marginBottom: type === 'card' ? '1rem' : '0.5rem' }}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default Loading;
