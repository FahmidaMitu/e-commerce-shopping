import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.items);

  const totalCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="brand-logo">
          E-Commerce <span>Shopping</span>
        </Link>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? 'nav-link cart-link active' : 'nav-link cart-link'
            }
          >
            <span>Cart</span>
            <span className="cart-badge">{totalCartCount}</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;