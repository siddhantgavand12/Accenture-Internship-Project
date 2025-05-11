import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import auth context
import { useState } from "react";



const ProductCard = ({ key, product }) => {
  const [products, setProducts] = useState([]);
  const { isAdmin } = useAuth(); // Get isAdmin status from context

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Delete a product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="border p-4 rounded shadow w-full">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>Quantity: {product.quantity}</p>
      <p className="text-blue-600 font-bold">Price: ₹{product.price}</p>
      
    </div>
  );
};

export default ProductCard;
