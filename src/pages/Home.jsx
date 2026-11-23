import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const Home = ({ onNotify }) => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search, Filter, and Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [productsRes, categoriesRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);

        if (!productsRes.ok || !categoriesRes.ok) {
          throw new Error('Failed to fetch store data from the API.');
        }

        const productsData = await productsRes.json();
        const categoriesData = await categoriesRes.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message || 'Something went wrong while loading products.');
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, []);

  // Apply search, category filter, and price sorting
  const filteredProducts = useMemo(() => {
    let updatedList = [...products];

    // 1. Filter by category
    if (selectedCategory !== 'all') {
      updatedList = updatedList.filter(
        (item) => item.category === selectedCategory
      );
    }

    // 2. Search by product name
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      updatedList = updatedList.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    }

    // 3. Sort by price
    if (sortOrder === 'low-to-high') {
      updatedList.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high-to-low') {
      updatedList.sort((a, b) => b.price - a.price);
    }

    return updatedList;
  }, [products, selectedCategory, searchQuery, sortOrder]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    if (onNotify) {
      onNotify(`Added "${product.title.slice(0, 28)}..." to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="container status-box">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container status-box error-box">
        <h2>Unable to Load Products</h2>
        <p>{error}</p>
        <button
          className="btn btn-primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <main className="container page-section">
      {/* Search, Filter & Sort Controls */}
      <section className="controls-bar">
        <div className="control-group search-group">
          <input
            type="text"
            placeholder="Search products by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="control-group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select-field"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="select-field"
            aria-label="Sort by price"
          >
            <option value="default">Sort by Price: Default</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </section>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="status-box">
          <h3>No matching products found</h3>
          <p>Try adjusting your search text or category filter.</p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setSortOrder('default');
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section className="product-grid">
          {filteredProducts.map((product) => (
            <article key={product.id} className="product-card">
              <Link to={`/product/${product.id}`} className="product-image-link">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image"
                  loading="lazy"
                />
              </Link>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <Link to={`/product/${product.id}`} className="product-title">
                  {product.title}
                </Link>
                <p className="product-price">${product.price.toFixed(2)}</p>
              </div>

              <div className="product-actions">
                <button
                  className="btn btn-primary full-width"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Home;