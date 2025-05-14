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
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Electronics Store</h1>
      <div className="space-x-4">
        <Link to="/" className="px-3 hover:text-gray-400">
          Home
        </Link>

        {!isAdmin && (
          <Link to="/admin" className="px-3 hover:text-gray-400">
            Admin Login
          </Link>
        )}

        {isAdmin && (
          <Link to="/" className="px-3 hover:text-gray-400" onClick={() => setShowAddProduct(true)}>
            Add Product
          </Link>
        )}

         

        {isAdmin && (
          <Link to="/" className="px-3 hover:text-gray-400" onClick={() => {
            setIsAdmin(false);
          }}>
            Log out
          </Link>

          // isAdmin = !isAdmin
        ) }
      </div>
    </nav>
  );
};

export default Navbar;
