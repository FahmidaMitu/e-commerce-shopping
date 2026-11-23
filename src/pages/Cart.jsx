import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from '../redux/cartSlice';

const Cart = ({ onNotify }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Calculate subtotal, shipping, and grand total
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 5.0 : 0;
  const totalPrice = subtotal + shipping;

  const handleRemoveItem = (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${item.title}" from your cart?`
    );
    if (confirmed) {
      dispatch(removeFromCart(item.id));
      if (onNotify) {
        onNotify('Item removed from cart.');
      }
    }
  };

  const handleClearCart = () => {
    const confirmed = window.confirm('Clear all items from your shopping cart?');
    if (confirmed) {
      dispatch(clearCart());
      if (onNotify) {
        onNotify('Shopping cart cleared.');
      }
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <main className="container page-section">
        <div className="status-box success-box">
          <h2>Order Placed Successfully!</h2>
          <p>
            Thank you for using E-Commerce Shopping. Your order is being processed.
          </p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  if (cartItems.length === 0) {
    return (
      <main className="container page-section">
        <div className="status-box">
          <h2>Your Shopping Cart is Empty</h2>
          <p>Looks like you have not added any products to your cart yet.</p>
          <Link to="/" className="btn btn-primary">
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container page-section">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <button className="btn btn-danger-outline" onClick={handleClearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        {/* Cart Item List */}
        <section className="cart-items-list">
          {cartItems.map((item) => (
            <article key={item.id} className="cart-item-card">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-details">
                <Link to={`/product/${item.id}`} className="cart-item-title">
                  {item.title}
                </Link>
                <p className="cart-item-unit-price">
                  Unit Price: ${item.price.toFixed(2)}
                </p>

                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-right">
                <p className="cart-item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Order Summary Box */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total Price</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button
            className="btn btn-primary full-width"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </main>
  );
};

export default Cart;