'use client'
import React, { use, useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { cartState } from "@/app/store/atoms/cart";
import { useRecoilState } from "recoil";

const Cartitems = ({ item }) => {
  const quantityArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [quantity, setQuantity] = useState(item.quantity);
  const [size, setSize] = useState(item.selectedSize);
  const [cart, setCart] = useRecoilState(cartState);
  const updateCartItem = (e, key) => {
    const updatedCart = cart.map((cartItem) => {
      if (cartItem._id === item._id) {
        return {
          ...cartItem,
          quantity: +quantity,
          selectedSize: size
        };
      }
      return cartItem;
    });
    setCart(updatedCart);
  };
  return (
    <div className="flex py-5 gap-3 md:gap-5 border-b">
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <img src={`${item?.thumbnail}`} />
      </div>

      <div className="w-full flex flex-col">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {item?.name}
          </div>
          {/* PRODUCT SUBTITLE */}
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {item?.subtitle}
          </div>

          {/* PRODUCT PRICE */}
          <div className="text-sm md:text-md font-bold text-black/[0.5] mt-2">
            MRP : Rs. {item.price}
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {item.subtitle}
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <div className="flex items-center gap-1">
              <div className="font-semibold">Size:</div>
              <select
                className="hover:text-black"
                onChange={(e) => {
                  setSize(e.target.value)
                  updateCartItem()
                }}
              >
                {item.size.data.map((size, i) => {
                  return (
                    <option
                      key={i}
                      value={size.size}
                      disabled={!size.enabled ? true : false}
                      selected={item.selectedSize === size.size}
                    >
                      {size.size}
                    </option>
                  );
                })}
                {/* <option value="2">UK 7</option>
                <option value="3">UK 8</option>
                <option value="4">UK 9</option>
                <option value="5">UK 10</option>
                <option value="6">UK 11</option> */}
              </select>
            </div>
            <div className="flex items-center gap-1">
              <div className="font-semibold">Quantity:</div>
              <select
                className="hover:text-black"
                onChange={(e) => {
                  setQuantity(e.target.value);
                  updateCartItem();
                }}
              >
                {quantityArr.map((q, i) => {
                  return (
                    <option key={i} value={q} selected={item.quantity === q}>
                      {q}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line className="cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:[20px]" />
        </div>
      </div>
    </div>
  );
};

export default Cartitems;
