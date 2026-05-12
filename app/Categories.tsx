"use client";
import { useState, useEffect } from "react";

interface CategoryItem {
  id: string | number;
  name: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://68f11ffe0b966ad50035753d.mockapi.io/categories",
        );

        if (!response.ok) {
          throw new Error("Maʼlumot olishda xatolik yuz berdi");
        }

        const data: CategoryItem[] = await response.json();

        setCategories([{ id: "all", name: "Все" }, ...data]);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center my-4 py-2 container">
      <div className="d-flex gap-2 flex-wrap">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => setActiveIndex(index)}
            className={`btn px-4 py-2 fw-bold ${
              activeIndex === index
                ? "bg-dark text-white"
                : "btn-light text-dark"
            }`}
            style={{
              borderRadius: "30px",
              fontSize: "16px",
              backgroundColor: activeIndex === index ? "#282828" : "#f9f9f9",
              border: "none",
              transition: "background-color 0.2s ease",
            }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="d-flex align-items-center gap-2">
        <span className="fw-bold" style={{ fontSize: "14px" }}>
          <i className="bi bi-caret-up-fill me-1"></i> Сортировка по:
        </span>
        <span
          className="text-decoration-underline"
          style={{
            color: "#fe5f1e",
            cursor: "pointer",
            fontSize: "14px",
            textDecorationStyle: "dotted",
            fontWeight: "500",
          }}
        >
          популярности
        </span>
      </div>
    </div>
  );
};

export default Categories;
