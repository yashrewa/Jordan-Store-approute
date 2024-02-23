import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductDetailsCarousal = ({ images }) => {
  return (
    <div className="text-white text-[20px] w-full max-w-[1360px] mx-auto sticky top-[50px]">
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className="productCarousel"
      >
        {images?.map((image) => (
          <img src={image} />
        ))}
        {/* <img src="/p2.png" />
          <img src="/p2.png" />
          <img src="/p2.png" />
          <img src="/p3.png" />
          <img src="/p4.png" />
          <img src="/p5.png" />
          <img src="/p6.png" /> */}
      </Carousel>
    </div>
  );
};

export default ProductDetailsCarousal;