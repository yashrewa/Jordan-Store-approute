'use client'
import ProductDetailsCarousal from "@/app/components/ProductDetailsCarousal";
import RelatedProducts from "@/app/components/RelatedProducts";
import Wrapper from "@/app/components/Wrapper";
import React, { useEffect, useState } from "react";
import { UseFetchFromNext } from "@/app/utils/api";
import { IoMdHeartEmpty } from "react-icons/io";
import { cartState } from "@/app/store/atoms/cart";
import { useRecoilState } from "recoil";
import { useParams } from "next/navigation";
import { baseUrl } from "@/app/utils/baseUrl";


const ProductDeatils = () => {

    const slug = useParams().slug
    console.log(slug)

    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState(null);


    useEffect(() => {
        fetchData();
        console.log(product)
        // console.log(products)
    }, [slug])
    const fetchData = async () => {
        const productRes = await UseFetchFromNext(`/product/${slug}`);
        const productsRes = await UseFetchFromNext(`/products`);
        setProduct(productRes.data);
        setProducts(productsRes.data);
    }




    const [selectedSize, setSelectedSize] = useState(null);
    const [showError, setShowError] = useState(false);
    const [cart, setCart] = useRecoilState(cartState);

    const addToCartHandler = (data) => {
        const isPresent = cart.findIndex((item) => item._id === data._id);
        if (isPresent === -1) {
            setCart((prevState) => [...prevState, { ...data, quantity: 1, selectedSize: selectedSize }]);
        } else {
            console.log("data is not present");
            setCart((prevState) => {
                return prevState.map((prevItem) => {
                    return prevItem._id === data._id
                        ? { ...data, quantity: prevItem.quantity + 1 }
                        : prevItem;
                });
            });
        }
    };
    console.log(cart);
    return !product && !products ? (<></>)
        :
        (
            <div className="w-full md:py-20">
                <Wrapper>
                    <div className="flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]">
                        <div className="w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0">
                            <ProductDetailsCarousal images={product.image} />
                        </div>
                        <div className="flex-[1] py-3">
                            <div className="text-[34px] font-semibold mb-2">{product.name}</div>
                            <div className="text-lg font-semibold mb-5">{product.subtitle}</div>
                            <div className="flex items-center">
                                <p className="mr-2 text-lg font-semibold">
                                    MRP. Rs {product.price}
                                </p>
                                <>
                                    <p className="text-base font-medium line-through">
                                        {product.orignalPrice}
                                    </p>
                                    <p className="ml-auto text-base font-medium text-green-500">
                                        20%
                                    </p>
                                </>
                            </div>

                            <div className="text-md font-medium text-black/[0.5]">
                                incl. of taxes
                            </div>
                            <div className="text-md font-medium text-black/[0.5] mb-20">
                                {`(Also includes all applicable duties)`}
                            </div>
                            {/* PRODUCT SIZE STARTS HERE  */}
                            <div className="mb-10">
                                <div className="flex justify-between mb-2">
                                    <div className="text-md font-medium text-black/[0.5]">
                                        Select Size
                                    </div>
                                    <div className="text-md font-medium text-black/[0.5] cursor-pointer">
                                        Select Guide
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {product.size.data.map((size) => {
                                        return (
                                            <div
                                                className={`border rounded-md text-center py-3 hover:border-black font-medium ${!size.enabled
                                                    ? "bg-black/[0.1]  cursor-not-allowed  opacity-50"
                                                    : "cursor-pointer"
                                                    } ${selectedSize === size.size ? "border-black" : ""}`}
                                                onClick={(e) => {
                                                    if (size.enabled) {
                                                        setSelectedSize(size.size);
                                                        setShowError(false);
                                                    }
                                                    else {
                                                        setShowError(true);
                                                    }
                                                }}
                                            >
                                                {size.size}
                                            </div>
                                        );
                                    })}
                                </div>
                                {showError && (
                                    <div className="text-red-600 mt-1">Selection is required</div>
                                )}
                            </div>

                            <button
                                className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
                                onClick={(e) => {
                                    if (!selectedSize) {
                                        setShowError(true);
                                    }
                                    addToCartHandler(product);
                                }}
                            >
                                Add to cart
                            </button>

                            <button className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 flex items-center justify-center gap-2 hover:opacity-75 mb-10">
                                Wishlist
                                <IoMdHeartEmpty size={20} />
                            </button>
                            <div>
                                <div className="text-lg font-bold mb-5">Product Details</div>
                                <div className="text-md mb-5">{product.description}</div>
                            </div>
                        </div>
                    </div>
                    <RelatedProducts products={products} />
                </Wrapper>
            </div>
        );
};

export default ProductDeatils;
