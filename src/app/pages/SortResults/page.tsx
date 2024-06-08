"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

const SortResults = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [order, setOrder] = useState<string>("desc");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products?sort=${order}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [order]);

  const toggleHandler = () => {
    setOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
        Sort Results
      </h2>
      <h2 className="text-xl text-gray-900 font-semibold mb-2">
        Click to change the order
      </h2>
      <Button onClick={toggleHandler} className="mb-6">
        {order === "asc" ? "Ascending Order" : "Descending Order"}
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

export default SortResults;
