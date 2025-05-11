
import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";

function App() {
  
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
