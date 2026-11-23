import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = ({ onNotify }) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to load product details.');
        }

        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message || 'Unable to fetch product information.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product));
    if (onNotify) {
      onNotify(`Added "${product.title.slice(0, 28)}..." to cart!`);
    }
  };

  if (loading) {
    return (
      <div className="container status-box">
        <div className="spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container status-box error-box">
        <h2>Product Not Found</h2>
        <p>{error || 'The requested product does not exist.'}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="container page-section">
      <Link to="/" className="back-link">
        ← Back to Products
      </Link>

      <div className="details-card">
        <div className="details-image-box">
          <img
            src={product.image}
            alt={product.title}
            className="details-image"
          />
        </div>

        <div className="details-content">
          <span className="product-category">{product.category}</span>
          <h1 className="details-title">{product.title}</h1>
          <p className="details-price">${product.price.toFixed(2)}</p>
          <p className="details-description">{product.description}</p>

          <div className="details-actions">
            <button className="btn btn-primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <Link to="/cart" className="btn btn-secondary">
              Go to Cart
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;