"use client";

import { useMemo, useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { CartPanel } from "@/components/CartPanel";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilters, type CategoryFilter } from "@/components/CategoryFilters";
import { useCartStore } from "@/store/cart";
import { formatIls } from "@/lib/money";
import { Footer } from "@/components/Footer";
import { useProductsStore } from "@/store/products";

export function Storefront() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [mode, setMode] = useState<"guest" | "admin" | null>(null);
  const [password, setPassword] = useState("");

  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [newCategory, setNewCategory] = useState("שתייה");

  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const savedMode = localStorage.getItem("mode");

    if (savedAdmin === "true") {
      setIsAdmin(true);
      setMode("admin");
    } else if (savedMode === "guest") {
      setMode("guest");
    }
  }, []);

  const login = () => {
    if (password === "admin123") {
      setIsAdmin(true);
      setMode("admin");
      localStorage.setItem("admin", "true");
      localStorage.setItem("mode", "admin");
    } else {
      alert("סיסמה שגויה");
    }
  };

  const enterAsGuest = () => {
    setMode("guest");
    localStorage.setItem("mode", "guest");
  };

  const logout = () => {
    setIsAdmin(false);
    setMode(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("mode");
  };

  const products = useProductsStore((s) => s.products);
  const addProduct = useProductsStore((s) => s.addProduct);
  const deleteProduct = useProductsStore((s) => s.deleteProduct);

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("הכל");

  const totalItems = useCartStore((s) => s.totalItems());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const featured = useMemo(
    () => products.filter((p) => p.featured).slice(0, 4),
    [products]
  );

  const filtered = useMemo(() => {
    const q = query.trim();
    return products.filter((p) => {
      const inCategory = category === "הכל" ? true : p.category === category;
      const inSearch = q ? p.name.includes(q) : true;
      return inCategory && inSearch;
    });
  }, [products, query, category]);

  const handleAddProduct = () => {
    if (!newName || !newPrice) return;

    addProduct({
      id: Date.now().toString(),
      name: newName,
      price: Number(newPrice),
      category: newCategory,
      image: newImage || "/placeholder.jpg",
      featured: isFeatured,
    });

    setNewName("");
    setNewPrice("");
    setNewImage("");
    setIsFeatured(false);
    setNewCategory("שתייה");
  };

  if (!mode && !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-6 rounded-xl shadow w-[300px]">
          <div className="text-lg font-bold mb-3">כניסת מנהל</div>

          <input
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2 mb-3"
          />

          <button onClick={login} className="w-full bg-black text-white py-2 rounded">
            התחבר
          </button>

          <button onClick={enterAsGuest} className="w-full mt-2 border py-2 rounded">
            אני לקוח
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full mb-6">
        <img src="/banner.jpg" className="w-full h-[200px] object-cover rounded-xl" />
      </div>

      {(isAdmin || mode === "guest") && (
        <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded text-sm">
          {isAdmin ? "התנתק אדמין" : "התנתק"}
        </button>
      )}

      <div className="mx-auto max-w-[1200px] px-4 py-5">

        {isAdmin && (
          <div className="mb-6 bg-white p-4 rounded-xl shadow">
            <div className="font-bold mb-2">הוספת מוצר</div>

            <input
              placeholder="שם מוצר"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-2"
            />

            <input
              placeholder="מחיר"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-2"
            />

            <input
              placeholder="קישור לתמונה"
              value={newImage}
              onChange={(e) => setNewImage(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-2"
            />

            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="border px-2 py-1 rounded w-full mb-2"
            >
              <option value="שתייה">שתייה</option>
              <option value="חטיפים">חטיפים</option>
              <option value="מוצרי חלב">מוצרי חלב</option>
              <option value="מאפים">מאפים</option>
              <option value="נקיון">נקיון</option>
              <option value="פירות">פירות</option>
              <option value="ירקות">ירקות</option>
            </select>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
              />
              להוסיף ל"הכי נקנים"
            </label>

            <button
              onClick={handleAddProduct}
              className="bg-black text-white px-4 py-2 rounded w-full"
            >
              הוסף מוצר
            </button>
          </div>
        )}

        <SearchBar value={query} onChange={setQuery} />
        <CategoryFilters value={category} onChange={setCategory} />

        {featured.length > 0 && (
          <div className="mt-6">
            <div className="text-lg font-bold mb-3">הכי נקנים</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />

                  {isAdmin && (
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      מחק
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]">
          <div>
            <div className="text-lg font-bold mb-3">כל המוצרים</div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filtered.map((p) => (
                <div key={p.id} className="relative">
                  <ProductCard product={p} />

                  {isAdmin && (
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded"
                    >
                      מחק
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <CartPanel />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Storefront;