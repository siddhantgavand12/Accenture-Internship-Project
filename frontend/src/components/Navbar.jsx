import React from "react";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext"; // Import auth context
import AddProduct from "../pages/AddProduct";
import { useAddProduct } from "../context/AddProductContext"; // Import AddProduct context

const Navbar = () => {
   const { setShowAddProduct } = useAddProduct();
  const { isAdmin,setIsAdmin } = useAuth(); // Get isAdmin status from context
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-4 flex justify-between items-center shadow-lg">
      <h1 className="font-bold text-xl lg:text-2xl hover:text-gray-300 cursor-pointer transition duration-200 ease-in-out">
        Electronics Store
      </h1>
      
      <div className="space-x-6 flex items-center">
        <Link to="/" className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out">
          Home
        </Link>

        {!isAdmin && (
          <Link to="/admin" className="px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out">
            Admin Login
          </Link>
        )}

        {isAdmin && (
          <button
            onClick={() => setShowAddProduct(true)}
            className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-all duration-300 ease-in-out"
          >
            Add Product
          </button>
        )}

        {isAdmin && (
          <Link to="/"
            onClick={() => setIsAdmin(false)}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-all duration-300 ease-in-out"
          >
            Log out
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
