import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { AuthProvider } from "./context/AuthContext";  // Import AuthProvider

const App = () => {
  return (
    <AuthProvider>  {/* Wrap the app with AuthProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products" element={<ProductList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
