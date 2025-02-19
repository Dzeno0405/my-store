import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";  // Header is imported here
import Home from "./pages/Home";  // Home page
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import { AuthProvider } from "./context/AuthContext"; 

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header /> {/* This will be rendered for all pages */}
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
