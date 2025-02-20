import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; 
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Profile from "./pages/Profile";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import OrderStatus from "./pages/OrderStatus"; 
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

const App = () => {
  const authContext = useAuth(); 
  if (!authContext) {
    console.error("useAuth() is undefined! Check if AuthProvider is missing.");
    return <p>Loading authentication...</p>; // Prevents crash
  }

  const { currentUser } = authContext;

  return (
    <Router>
      {currentUser && <Header />} {/* Only show Header if logged in */}
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/add-product" element={currentUser ? <AddProduct /> : <Navigate to="/login" />} />
        <Route path="/products" element={currentUser ? <ProductList /> : <Navigate to="/login" />} />
        <Route path="/order-status" element={currentUser ? <OrderStatus /> : <Navigate to="/login" />} /> {/* Order Status Route */}
        <Route path="/wishlist" element={currentUser ? <Wishlist /> : <Navigate to="/login" />} />
        <Route path="/cart" element={currentUser ? <Cart /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
};

export default App;
