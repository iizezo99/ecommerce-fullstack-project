import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';
import LoginModal from './LoginModal';
import './Navbar.css';

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <Link to="/" className="brand">🛍️ ShopVibe</Link>

          <div className="nav-links">
            <Link to="/products" className="nav-link">Products</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="nav-link admin-link">Dashboard</Link>
            )}
          </div>

          <div className="nav-actions">
            <Link to="/cart" className="nav-link cart-link">
              🛒 Cart ({cart?.items?.length || 0})
            </Link>

            {user ? (
              <div className="user-menu">
                <Link to="/profile" className="nav-link">{user.email}</Link>
                <button onClick={logout} className="btn-outline logout-btn">Logout</button>
              </div>
            ) : (
              <button onClick={() => setIsLoginOpen(true)} className="btn-primary login-btn">
                Login / Register
              </button>
            )}
          </div>
        </div>
      </nav>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
};

export default Navbar;