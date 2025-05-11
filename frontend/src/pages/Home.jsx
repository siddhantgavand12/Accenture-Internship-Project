import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import auth context

const Home = () => {

    const { isAdmin } = useAuth(); // Destructure auth context
    const [products, setProducts] = useState([]);

    // load the products from the local storage
    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    // delete the product from the local storage
    const handleDelete = (id) => {
        const updatedProducts = products.filter((product) => product.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };


    return (
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Electronics Products</h2>
          {products.length === 0 ? (
            <p className="text-center">No products available. Please add some.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="border p-4 rounded shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
                >
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover mb-3 rounded"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ₹{product.price}</p>
                  
                  {/* Show Delete only if admin */}
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