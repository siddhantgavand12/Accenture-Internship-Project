import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductCard = ({ product }) => {
  const images = product.images || [];

  return (
    <div className="border p-4 rounded shadow w-full select-none cursor-pointer">
      {images.length > 0 && (
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={images.length > 1}
          showArrows={images.length > 1}
          infiniteLoop={images.length > 1}
          autoPlay={images.length > 1}
          interval={3000}
          swipeable={true}
          emulateTouch={true}
          useKeyboardArrows={true}
          stopOnHover={true}
          transitionTime={700}
          axis="horizontal"
          className="carousel-custom"
        >
          {images.map((img, index) => (
            <div key={index}>
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="h-40 w-full object-cover rounded cursor-grab"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          ))}
        </Carousel>
      )}

      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p>Quantity: {product.quantity}</p>
      <p className="text-blue-600 font-bold">Price: ₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
