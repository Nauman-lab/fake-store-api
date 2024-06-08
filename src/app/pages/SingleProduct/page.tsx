"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const SingleProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>("1");
  const [productNo, setProductNo] = useState<string>("1");
  console.log("productNo", productNo);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${productNo}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const json = await res.json();

        // Check if the product data is empty or invalid
        if (!json || Object.keys(json).length === 0) {
          throw new Error("Product not found");
        }

        setProduct(json);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    fetchProduct();
  }, [productNo]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const submitHandler = () => {
    setProductNo(value);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
        Product Details
      </h2>
      <h2 className="text-lg text-gray-900 font-medium text-center mt-4 mb-2">
        Enter Product Number
      </h2>
      <Input
        className="mb-2"
        type="number"
        placeholder="Enter number 1 to 20"
        value={value}
        onChange={onChangeHandler}
      />
      <Button onClick={submitHandler} className="mb-4">
        Submit
      </Button>
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start">
        <div className="w-full md:w-1/2 h-64 flex items-center justify-center overflow-hidden mb-4 md:mb-0">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-full md:w-1/2 md:pl-6">
          <h2 className="text-2xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-2">{product.category}</p>
          <p className="text-gray-900 font-bold text-xl mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
