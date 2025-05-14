import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { toast } from "react-toastify";

const AddProduct = ({onClose}) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "", // Will store Base64 string
    name: "",
    quantity: 0,
    price: 0,
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
  if (!isAdmin) {
    navigate("/admin");
  }
}, [isAdmin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && ["image/jpeg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
        setPreview(reader.result); // reader.result => Base64 string
      };
      reader.readAsDataURL(file);
    } else {
      toast.error("Only JPG and PNG images are allowed.");
      e.target.value = null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = { ...formData, id: Date.now() };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    toast.success("Product added successfully!");
    onClose();
    // navigate("/");
  };

  return (
    // <div className="add-product min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-200 p-4">
  <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
    <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Product</h1>
    <form onSubmit={handleSubmit} className="space-y-4 text-black p-1">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full h-40 object-contain border rounded shadow"
        />
      )}
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        name="quantity"
        placeholder="Product Quantity"
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200"
      >
        Add Product
      </button>
    </form>
  </div>
// </div>


  );
};

export default AddProduct;
