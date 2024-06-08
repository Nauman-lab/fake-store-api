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

const LimitResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [value, setValue] = useState<string>("1");
  const [productNo, setProductNo] = useState<string>("1");
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  console.log("productNo", productNo);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products?limit=${productNo}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [productNo, error]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const submitHandler = () => {
    const numValue = parseInt(value, 10);
    console.log("numValue", numValue);
    if (numValue < 1 || numValue > 20) {
      setError(true);
      return;
    }
    setError(false);
    setProductNo(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("flg", error);
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
        Limit Results
      </h2>
      {error ? (
        <h2 className="text-lg text-red-900 font-medium text-center mt-4 mb-2">
          please enter a number between 0 and 20
        </h2>
      ) : (
        <h2 className="text-lg text-gray-900 font-medium text-center mt-4 mb-2">
          Enter how many products you want to see
        </h2>
      )}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 shadow rounded">
            <div className="w-full h-48 flex items-center justify-center overflow-hidden mb-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-700">{product.category}</p>
            <p className="text-gray-900 font-bold">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitResults;
