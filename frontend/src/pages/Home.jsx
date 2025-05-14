import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import auth context
import ProductCard from "../components/ProductCard";
import { useAddProduct } from "../context/AddProductContext";
import AddProduct from "./AddProduct";
import { toast } from "react-toastify"; // Import toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS

const Home = () => {

  const { showAddProduct, setShowAddProduct } = useAddProduct();
  const [products, setProducts] = useState([]);
  const { isAdmin } = useAuth(); // Get isAdmin status from context

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, [showAddProduct]);

  
  // const handleProductAdded = (newProduct) => {
  //   const updatedProducts = [...products, newProduct];
  //   localStorage.setItem("products", JSON.stringify(updatedProducts));
  //   setProducts(updatedProducts); // 🟢 Trigger re-render
  //   setShowAddProduct(false); // Close modal
  // };

  // Delete a product
  const handleDelete = (id) => {
     const confirmDelete = window.confirm("Are you sure you want to delete this product?");
  if (confirmDelete) {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
     toast.success("Item deleted successfully!");
  }
  };

  return (
    <div className="p-4 max-w-6xl mx-auto ">
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg  w-full max-w-md relative">
            <button
              onClick={() => setShowAddProduct(false)}
              className="absolute top-2 right-3 text-xl text-red-600 font-bold"
            >
              ×
            </button>
            <AddProduct onClose={() => setShowAddProduct(false)} />
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Electronics Store</h1>
      {/* <h2 className="text-2xl font-bold mb-4 text-center">Electronics Products</h2> */}
      {products.length === 0 ? (
        <p className="text-center">No products available. Please add some.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
            >
              <ProductCard key={product.id} product={product} />
              
              {/* ✅ Show Delete only if admin */}
              {isAdmin && (
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-3 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
