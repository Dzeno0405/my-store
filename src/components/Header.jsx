import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="p-4 bg-gray-800 text-white flex justify-between items-center">
      <h1>My Store</h1>
      <nav>
        {user ? (
          <>
            <span>Welcome, {user.email}</span>
            <button onClick={() => signOut(auth)}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
