import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddProduct = ({ onClose }) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    images: [], // array of Base64 strings
    name: "",
    quantity: 0,
    price: 0,
  });

  const [preview, setPreview] = useState([]); // preview images

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin");
    }
  }, [isAdmin, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png"];
    const newPreviews = [];
    const base64Images = [];

    const readFileAsDataURL = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    Promise.all(
      files.map((file) => {
        if (!validTypes.includes(file.type)) {
          toast.error("Only JPG and PNG images are allowed.");
          e.target.value = null;
          return null;
        }
        return readFileAsDataURL(file).then((base64) => {
          newPreviews.push(base64);
          base64Images.push(base64);
        });
      })
    ).then(() => {
      setPreview(newPreviews);
      setFormData((prev) => ({ ...prev, images: base64Images }));
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = { ...formData, id: Date.now() };
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    toast.success("Product added successfully!");
    onClose();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4 text-black p-1">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {preview.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {preview.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Preview ${index}`}
                className="w-full h-40 object-contain border rounded shadow"
              />
            ))}
          </div>
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
  );
};

export default AddProduct;
