"use client";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
};

export default function AdminPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");

  const addProduct = () => {
    const newProduct = {
      id: Date.now(),
      name,
    };

    setProducts([...products, newProduct]);
    setName("");
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const editProduct = (id: number) => {
    const newName = prompt("שם חדש");
    if (!newName) return;

    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, name: newName } : p
      )
    );
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow mt-4">

      <h2 className="font-bold mb-3">ניהול מוצרים</h2>

      <div className="flex gap-2 mb-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 flex-1"
          placeholder="שם מוצר"
        />

        <button
          onClick={addProduct}
          className="bg-green-500 text-white px-4"
        >
          הוסף
        </button>
      </div>

      {products.map((p) => (
        <div
          key={p.id}
          className="flex justify-between border-b py-2"
        >
          <span>{p.name}</span>

          <div className="flex gap-2">
            <button onClick={() => editProduct(p.id)}>✏️</button>
            <button onClick={() => deleteProduct(p.id)}>🗑️</button>
          </div>
        </div>
      ))}

    </div>
  );
}