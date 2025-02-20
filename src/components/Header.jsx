import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";  // Import Link for navigation
import { FaShoppingCart, FaHeart, FaSearch, FaSignOutAlt } from "react-icons/fa"; // Import icons

const Header = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Logo" />
        <h1 className="logo-text">Dzenan's Store</h1>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <FaSearch className="icon" />
      </div>

      <nav className="nav">
        <div className="order-status" onClick={() => navigate("/order-status")}>
          <span>Order Status</span>
        </div>
        {user ? (
          <>
            <span className="welcome-msg" onClick={() => navigate("/profile")}>{user.email}</span>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt className="icon" /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}
        {/* Favorites and Cart Icons */}
        <div className="icons">
          <FaHeart className="icon" onClick={() => navigate("/wishlist")} />
          <FaShoppingCart className="icon" onClick={() => navigate("/cart")} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
