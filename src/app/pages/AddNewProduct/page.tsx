"use client";
import { Button } from "@/components/ui/button";
import React, { useState, ChangeEvent, FormEvent } from "react";

interface Product {
  id?: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

const AddNewProduct = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<Product>({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const fetchProduct = async () => {
    const res = await fetch("https://fakestoreapi.com/products", {
      method: "POST",
      body: JSON.stringify(form),
    });

    const data: Product = await res.json();
    setProduct(data);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProduct();
  };
  console.log("product", product);
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Image URL</label>
          <input
            type="url"
            name="image"
            value={form.image}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <Button
          type="submit"
          className=" text-white font-bold py-2 px-4 rounded"
        >
          Add Product
        </Button>
      </form>

      {product && (
        <div className="space-y-4 mt-6">
          <p className="text-gray-700">ID: {product.id}</p>
          <h2 className="text-lg font-bold">
            Remember that nothing in real will insert into the database. It will
            return you a new id.
          </h2>
        </div>
      )}
    </div>
  );
};

export default AddNewProduct;
