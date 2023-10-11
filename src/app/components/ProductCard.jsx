import Link from "next/link";
import React from "react";

const ProductCard = ({item}) => {
  return (
    <Link href={`/product/${item._id}`}
        className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer"
    >
      <img src={item.thumbnail} alt="product-image" className="w-full" />
      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium">{item.name}</h2>
        <div className="flex items-center text-black/[0.5]">
          <p className="mr-2 text-lg font-semibold">Rs. {item.price}</p>
          <p className="text-base font-medium line-through">Rs. {item.orignalPrice}</p>
          <p className="ml-auto text-base font-medium text-green-500">20%</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;