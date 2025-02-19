import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaSearch,
  FaUserCircle,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa"; // React-icons for various elements
import "../style/Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const navigate = useNavigate(); // Add useNavigate
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Set loading to false after auth state is resolved
    });

    return () => unsubscribe();
  }, [auth]);

  if (loading) return null; // Prevent rendering navbar until auth state is ready

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        {/* Logo on the left */}
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/logo.png" alt="Logo" style={{ cursor: "pointer" }} />
          <h1>Dzenan's store</h1>
        </div>

        {/* Search Bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <FaSearch className="icon" />
        </div>

        {/* Navbar items (Order Status, SignIn/Register, Favorites, Cart) */}
        <nav className="nav">
          <div className="order-status">
            <span>Order Status</span>
            {/* <FaHeart className="icon" /> */}
          </div>

          {user ? (
            <>
              <span className="welcome-msg" onClick={() => navigate("/profile")}>{user.email}</span>
              {/* SignOut Button */}
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt className="icon" /> Logout
              </button>
            </>
          ) : null}

          {/* Favorites and Cart Icons */}
          <div className="icons">
            <FaHeart className="icon" />
            <FaShoppingCart className="icon" />
          </div>
        </nav>
      </header>

      {/* Main content */}
      <main>{/* No content needed here for logged-out users */}</main>
    </div>
  );
};

export default Home;
