"use client";
import { useState, useEffect } from "react";

interface CategoryItem {
  id: string | number;
  name: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  result: T;
}

interface CategoriesProps {
  activeCategoryId: string | number;
  onChangeCategory: (id: string | number) => void;
}

const Categories = ({
  activeCategoryId = "all",
  onChangeCategory = () => {}, 
}: CategoriesProps) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState(0);

  const sortList = ["популярности", "по цене", "по алфавиту"];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories",
        );
        if (!response.ok) throw new Error("Xatolik");
        const data: ApiResponse<CategoryItem[]> = await response.json();
        setCategories([{ id: "all", name: "Все" }, ...data.result]);
      } catch (error) {
        console.error("Xatolik:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="d-flex justify-content-between align-items-center my-4 py-2 container">
      <div className="d-flex gap-2 flex-wrap">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onChangeCategory(category.id)}
            className={`btn px-4 py-2 fw-bold ${activeCategoryId === category.id ? "bg-dark text-white" : "btn-light text-dark"}`}
            style={{ borderRadius: "30px", fontSize: "16px", border: "none" }}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="position-relative d-flex align-items-center gap-2">
        <span
          onClick={() => setIsOpen(!isOpen)}
          style={{
            color: "#fe5f1e",
            cursor: "pointer",
            borderBottom: "1px dotted #fe5f1e",
          }}
        >
          Сортировка по: <b>{sortList[selectedSort]}</b>
        </span>
        {isOpen && (
          <div
            className="position-absolute shadow bg-white py-2 rounded-3"
            style={{ top: "35px", right: 0, zIndex: 100, width: "160px" }}
          >
            {sortList.map((name, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedSort(i);
                  setIsOpen(false);
                }}
                className="px-3 py-2"
                style={{ cursor: "pointer" }}
              >
                {name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
