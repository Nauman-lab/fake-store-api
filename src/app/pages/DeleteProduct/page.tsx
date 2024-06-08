"use client";
import { Button } from "@/components/ui/button";
import React, { useState, ChangeEvent } from "react";

interface Product {
  id?: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

const DeleteProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productID, setProductID] = useState<string>("7");
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${productID}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete product");
      }
      const json = await response.json();
      setProduct(json);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    setLoading(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductID(e.target.value);
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <div>
        <label className="block text-gray-700">Product ID</label>
        <input
          type="number"
          name="id"
          value={productID}
          onChange={handleChange}
          placeholder="enter number from 1 to 20"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>

      <Button
        onClick={fetchProduct}
        className="text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete Product"}
      </Button>

      {product && (
        <div className="space-y-4 mt-6">
          <h2 className="text-lg font-bold">
            The product will not be deleted on the database. but if you sent
            data successfully it will return you the fake deleted product.
          </h2>
          <hr />
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
      )}
    </div>
  );
};

export default DeleteProduct;
