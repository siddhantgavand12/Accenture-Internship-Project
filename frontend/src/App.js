import { BrowserRouter, Routes, Route } from "react-router";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import AddProduct from "./pages/AddProduct";
import { AddProductProvider } from "./context/AddProductContext"; // Import AddProduct context
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AddProductProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </AuthProvider>
    </AddProductProvider>
  );
}

export default App;
