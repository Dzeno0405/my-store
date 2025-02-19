import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Link } from "react-router-dom";  // Import Link for navigation

const Header = () => {
  const [user] = useAuthState(auth);

  // If the user is logged in, return null to hide the Header
  if (user || localStorage.getItem("hasLoggedIn")) return null;

  // When the user logs in or registers, we save a flag to prevent the header from showing again
  const handleLoginRegister = () => {
    localStorage.setItem("hasLoggedIn", "true");
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Logo" />
        <h1>Dzenan's store</h1>
      </div>

      <nav className="nav">
        <Link to="/login" className="nav-link" onClick={handleLoginRegister}>
          Login
        </Link>
        <Link to="/register" className="nav-link" onClick={handleLoginRegister}>
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
