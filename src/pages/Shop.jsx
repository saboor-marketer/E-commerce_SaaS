import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import EmptyState from '../components/common/EmptyState';
import Loading from '../components/common/Loading';
import { products, categories } from '../data/products';
import { FiFilter, FiX } from 'react-icons/fi';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setLoading(true);
    
    // Simulate loading
    const timer = setTimeout(() => {
      let filtered = [...products];

      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(p => p.category === selectedCategory);
      }

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(p =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
        );
      }

      // Apply price filter
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-').map(Number);
        filtered = filtered.filter(p => p.price >= min && p.price <= max);
      }

      // Apply sorting
      switch (sortBy) {
        case 'price-low':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          filtered.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          filtered.sort((a, b) => b.id - a.id);
          break;
        default:
          // featured - keep original order
          break;
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handlePriceRangeChange = (range) => {
    setPriceRange(range);
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
  };

  const clearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange('all');
    setSortBy('featured');
  };

  return (
    <div className="py-5 fade-in">
      <div className="container">
        {/* Header */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h1 className="mb-2">Shop</h1>
            <p className="text-muted mb-0">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex gap-2 justify-content-md-end">
              <button
                className="btn btn-outline d-md-none"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FiFilter /> Filters
              </button>
              <select
                className="form-select"
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                style={{ maxWidth: '200px' }}
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Filters Sidebar */}
          <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
            <div className="filter-section">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Filters</h5>
                <button
                  className="btn btn-sm btn-link"
                  onClick={clearFilters}
                  style={{ border: 'none', background: 'none', color: 'var(--primary-color)' }}
                >
                  <FiX /> Clear
                </button>
              </div>

              {/* Search */}
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {/* Categories */}
              <div className="filter-group">
                <label className="filter-label">Category</label>
                <div className="d-flex flex-column gap-2">
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === 'all'}
                      onChange={() => handleCategoryChange('all')}
                    />
                    All Categories
                  </label>
                  {categories.map(category => (
                    <label key={category.id} className="d-flex align-items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        value={category.name}
                        checked={selectedCategory === category.name}
                        onChange={() => handleCategoryChange(category.name)}
                      />
                      {category.name}
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-group">
                <label className="filter-label">Price Range</label>
                <div className="d-flex flex-column gap-2">
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value="all"
                      checked={priceRange === 'all'}
                      onChange={() => handlePriceRangeChange('all')}
                    />
                    All Prices
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value="0-50"
                      checked={priceRange === '0-50'}
                      onChange={() => handlePriceRangeChange('0-50')}
                    />
                    Under $50
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value="50-100"
                      checked={priceRange === '50-100'}
                      onChange={() => handlePriceRangeChange('50-100')}
                    />
                    $50 - $100
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value="100-200"
                      checked={priceRange === '100-200'}
                      onChange={() => handlePriceRangeChange('100-200')}
                    />
                    $100 - $200
                  </label>
                  <label className="d-flex align-items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      value="200-1000"
                      checked={priceRange === '200-1000'}
                      onChange={() => handlePriceRangeChange('200-1000')}
                    />
                    $200+
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="col-lg-9">
            {loading ? (
              <div className="row g-4">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="col-lg-4 col-md-6">
                    <Loading type="card" />
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="row g-4">
                {filteredProducts.map(product => (
                  <div key={product.id} className="col-lg-4 col-md-6">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                icon="search"
                title="No products found"
                message="Try adjusting your filters or search terms"
                action={clearFilters}
                actionText="Clear Filters"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
