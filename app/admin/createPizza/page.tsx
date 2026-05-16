"use client";
import { useState } from "react";

const AddPizza = () => {
  const [formData, setFormData] = useState({
    title: "",
    imageUrl: "",
    types: [0],
    sizes: [26], 
    price: "",
    category: 1, 
    rating: 5,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "rating" || name === "category"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!formData.title || !formData.imageUrl || !formData.price) {
      alert("Iltimos, hamma maydonlarni to'ldiring!");
      return;
    }

    try {
      const response = await fetch(
        "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        alert("Pitsa muvaffaqiyatli qo'shildi! ✅");
        setFormData({
          title: "",
          imageUrl: "",
          types: [0],
          sizes: [26],
          price: "",
          category: 1,
          rating: 5,
        });
      } else {
        alert("Xatolik yuz berdi! ❌");
      }
    } catch (error) {
      console.error("Backend bilan bog'lanishda xato:", error);
    }
  };

  return (
    <div className="flex-1 p-10 bg-[#f9f9f9] min-h-screen">
      <h2 className="text-3xl font-bold! mb-8">Pitsa Qo`shish</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-5xl"
      >
        <div className="grid grid-cols-2 gap-x-10 gap-y-6">
          <div className="col-span-1">
            <label className="block text-gray-700 font-medium mb-2">
              Pitsa Tasviri (Rasm URL)
            </label>
            <div className="flex gap-4">
              <input
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                type="text"
                placeholder="https://..."
                className="w-full border-2 border-[#fe5f1e] rounded-lg! p-2 outline-none focus:ring-2 ring-orange-200"
              />
             
            </div>
          </div>

          <div className="col-span-1">
            <label className="block text-gray-700 font-medium! mb-2">
              Pitsa Sarlavhasi
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              type="text"
              placeholder="Misol: Pishloqli pitsa"
              className="w-full border-2 border-[#fe5f1e] rounded-lg! p-2 outline-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium! mb-2">
              Pitsa Turlari
            </label>
            <div className="flex gap-2 p-2 border-2 border-gray-300 rounded-lg! min-h-[52px] bg-gray-50">
              <span className="bg-orange-100 text-[#fe5f1e] px-10 py-1 rounded-md! text-sm! border border-orange-200">
                Yupqa va An`anaviy
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium! mb-2">
              Pitsa O`lchamlari
            </label>
            <div className="flex gap-2 p-2 border-2 border-gray-300 rounded-lg! min-h-[52px] bg-gray-50">
              <span className="bg-orange-100 text-[#fe5f1e] px-3 py-1 rounded-md! text-sm! border border-orange-200">
                26, 30, 40 sm
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium! mb-2">
              Pitsa Narxi
            </label>
            <div className="relative">
              <input
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="number"
                placeholder="₽"
                className="w-full border-2 border-[#fe5f1e] rounded-lg! p-2 pl-3 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Pitsa Toifasi
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border-2 border-gray-300 rounded-lg p-2 outline-none bg-white"
            >
              <option value={1}>Go`shtli</option>
              <option value={2}>Vegetarian</option>
              <option value={3}>Gril</option>
              <option value={4}>Oshxona</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 d-flex justify-between">
              Pitsa Reytingi{" "}
              <span className="text-[#fe5f1e]">
                {"⭐".repeat(Math.min(formData.rating, 5))}
              </span>
            </label>
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              type="number"
              max="10"
              min="0"
              className="w-full border-2 border-gray-300 rounded-lg! p-2 outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-[#fe5f1e] text-white font-bold! py-2 rounded-xl! hover:bg-[#e85416] transition-all! shadow-md! active:scale-95! cursor-pointer"
            >
              Pitsani Saqlash
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPizza;
