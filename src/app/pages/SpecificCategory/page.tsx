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

const SpecificCategory = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("jewelery");
  const [loading, setLoading] = useState<boolean>(true);
  console.log("category", category);
  useEffect(() => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));

    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setProducts(json);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("categories", categories);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
        Specific Categories
      </h2>
      <h2 className="text-lg text-gray-900 font-medium text-center mt-4 mb-2">
        Select a specific category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
        {categories.map((category) => (
          <Button
            key={category}
            onClick={() => setCategory(category)}
            className="w-full"
          >
            {category}
          </Button>
        ))}
      </div>
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

export default SpecificCategory;
