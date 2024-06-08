"use client";
import { useEffect, useState } from "react";

const AllCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then((json) => setCategories(json));
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("categories", categories);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-4xl text-gray-900 font-bold text-center mb-6">
        All Categories
      </h2>
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
        <ol className="list-decimal">
          {categories.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default AllCategories;
