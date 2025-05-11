import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">Electronics Store</h1>
      <div className="space-x-4">
        <Link to="/" className = "px-3 hover:text-gray-400">Home</Link>
        <Link to="/admin" className = "px-3 hover:text-gray-400">Admin</Link>
        <Link to="/admin/add-product" className = "px-3 hover:text-gray-400">Add Product</Link>
      </div>
    </nav>    
  );
};

export default Navbar;