/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/set-state-in-effect */
// "use client";
// import { useState, useEffect } from "react";

// type Pizza = {
//   id: number | string;
//   title: string;
//   imageUrl: string;
//   category: number;
//   price: number;
// };

// const AdminPizzas = () => {
//   const [pizzas, setPizzas] = useState<Pizza[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPizzas = async () => {
//     try {
//       const res = await fetch(
//         "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products",
//       );
//       const data = await res.json();
//       setPizzas(data.result || []);
//       setLoading(false);
//     } catch (error) {
//       console.error("Ma'lumot olishda xato:", error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPizzas();
//   }, []);

//   const handleDelete = async (id: any) => {
//     if (window.confirm("Haqiqatan ham bu pitsani o'chirmoqchimisiz?")) {
//       try {
//         await fetch(
//           `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products/${id}`,
//           {
//             method: "DELETE",
//           },
//         );
//         setPizzas(pizzas.filter((pizza) => pizza.id !== id));
//         alert("O'chirildi! ✅");
//       } catch (error) {
//         console.log(error);

//       }
//     }
//   };

//   if (loading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

//   return (
//     <div className="flex-1 p-10 bg-[#f9f9f9] min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h2 className="text-3xl font-bold text-[#1c1c1c]">Barcha Pitsalar</h2>
//       </div>

//       <div className="bg-white rounded-2xl! shadow-sm! border! border-gray-100 overflow-hidden!">
//         <table className="w-full text-left! border-collapse!">
//           <thead>
//             <tr className="bg-gray-50 border-b border-gray-100">
//               <th className="p-5 font-semibold! text-gray-600">Pitsa</th>
//               <th className="p-5 font-semibold! text-gray-600">Toifa</th>
//               <th className="p-5 font-semibold! text-gray-600">Narxi</th>
//               <th className="p-5 font-semibold! text-gray-600 text-center">
//                 Amallar
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {pizzas.map((pizza) => (
//               <tr
//                 key={pizza.id}
//                 className="border-b border-gray-50 hover:bg-gray-50 transition-colors!"
//               >
//                 <td className="p-5 flex items-center gap-4">
//                   <img
//                     src={pizza.imageUrl}
//                     alt={pizza.title}
//                     className="w-12 h-12 rounded-full object-cover! border border-gray-100"
//                   />
//                   <span className="font-medium text-gray-800">
//                     {pizza.title}
//                   </span>
//                 </td>
//                 <td className="p-5 text-gray-600">
//                   {pizza.category === 1 ? "Go'shtli" : "Boshqa"}
//                 </td>
//                 <td className="p-5 font-bold! text-[#fe5f1e]">
//                   {pizza.price} ₽
//                 </td>
//                 <td className="p-5 text-center">
//                   <div className="flex justify-center gap-3">
//                     <button
//                       className="px-4 py-2 bg-orange-100 text-[#fe5f1e] rounded-lg! font-medium! hover:bg-[#fe5f1e] hover:text-white transition-all"
//                     >
//                       Tahrirlash
//                     </button>
//                     <button
//                       onClick={() => handleDelete(pizza.id)}
//                       className="px-4 py-2 bg-red-100 text-red-600 rounded-lg! font-medium! hover:bg-red-600 hover:text-white transition-all"
//                     >
//                       O`chirish
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {pizzas.length === 0 && (
//           <div className="p-20 text-center text-gray-400">
//             Hozircha pitsalar mavjud emas.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminPizzas;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";

type Pizza = {
  id: number | string;
  title: string;
  imageUrl: string;
  category: number;
  price: number;
};

const AdminPizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  // Tahrirlash uchun holatlar
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);

  const fetchPizzas = async () => {
    try {
      const res = await fetch(
        "https://serve.faux-api.com/f92ae21abaa048e1a243f392/products",
      );
      const data = await res.json();
      setPizzas(data.result || []);
      setLoading(false);
    } catch (error) {
      console.error("Ma'lumot olishda xato:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleDelete = async (id: any) => {
    if (window.confirm("Haqiqatan ham bu pitsani o'chirmoqchimisiz?")) {
      try {
        await fetch(
          `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products/${id}`,
          {
            method: "DELETE",
          },
        );
        setPizzas(pizzas.filter((pizza) => pizza.id !== id));
        alert("O'chirildi! ✅");
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Modalni ochish funksiyasi
  const openEditModal = (pizza: Pizza) => {
    setEditingPizza({ ...pizza });
    setIsModalOpen(true);
  };

  // Saqlash funksiyasi (PUT request)
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPizza) return;

    try {
      const res = await fetch(
        `https://serve.faux-api.com/f92ae21abaa048e1a243f392/products/${editingPizza.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingPizza),
        },
      );

      if (res.ok) {
        setPizzas(
          pizzas.map((p) => (p.id === editingPizza.id ? editingPizza : p)),
        );
        setIsModalOpen(false);
        alert("Muvaffaqiyatli yangilandi! 🚀");
      }
    } catch (error) {
      console.error("Yangilashda xato:", error);
    }
  };

  if (loading) return <div className="p-10 text-center">Yuklanmoqda...</div>;

  return (
    <div className="flex-1 p-10 bg-[#f9f9f9] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-[#1c1c1c]">Barcha Pitsalar</h2>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="p-5 font-semibold text-gray-600">Pitsa</th>
              <th className="p-5 font-semibold text-gray-600">Toifa</th>
              <th className="p-5 font-semibold text-gray-600">Narxi</th>
              <th className="p-5 font-semibold text-gray-600 text-center">
                Amallar
              </th>
            </tr>
          </thead>
          <tbody>
            {pizzas.map((pizza) => (
              <tr
                key={pizza.id}
                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="p-5 flex items-center gap-4">
                  <img
                    src={pizza.imageUrl}
                    alt={pizza.title}
                    className="w-12 h-12 rounded-full object-cover border border-gray-100"
                  />
                  <span className="font-medium text-gray-800">
                    {pizza.title}
                  </span>
                </td>
                <td className="p-5 text-gray-600">
                  {pizza.category === 1 ? "Go'shtli" : "Boshqa"}
                </td>
                <td className="p-5 font-bold text-[#fe5f1e]">
                  {pizza.price} ₽
                </td>
                <td className="p-5 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => openEditModal(pizza)}
                      className="px-4 py-2 bg-orange-100 text-[#fe5f1e] rounded-lg font-medium hover:bg-[#fe5f1e] hover:text-white transition-all"
                    >
                      Tahrirlash
                    </button>
                    <button
                      onClick={() => handleDelete(pizza.id)}
                      className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all"
                    >
                      O`chirish
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- TAHRIRLASH MODAL OYNASI --- */}
      {isModalOpen && editingPizza && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Pitsani tahrirlash</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nomi
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl outline-none focus:border-[#fe5f1e]"
                  value={editingPizza.title}
                  onChange={(e) =>
                    setEditingPizza({ ...editingPizza, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rasm URL
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-xl outline-none focus:border-[#fe5f1e]"
                  value={editingPizza.imageUrl}
                  onChange={(e) =>
                    setEditingPizza({
                      ...editingPizza,
                      imageUrl: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Narxi (₽)
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-xl outline-none focus:border-[#fe5f1e]"
                  value={editingPizza.price}
                  onChange={(e) =>
                    setEditingPizza({
                      ...editingPizza,
                      price: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="flex gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 transition-all"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#fe5f1e] text-white rounded-xl font-semibold hover:bg-[#e8561a] transition-all"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPizzas;
