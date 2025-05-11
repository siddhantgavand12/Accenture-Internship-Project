import React from "react";


const ProductCard = ({ key, product }) => {
  return (
    <div className="border p-4 rounded shadow w-full">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>Qty: {product.quantity}</p>
      <p className="text-blue-600 font-bold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
