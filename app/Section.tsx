"use client";
import router from "next/router";
import { useState, useEffect } from "react";

interface PizzaItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: number;
}

interface CategoryItem {
  id: string | number;
  name: string;
}

const PizzaPage = () => {
  const [items, setItems] = useState<PizzaItem[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [activeCategory] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resProducts, resCategories] = await Promise.all([
          fetch("https://68f11ffe0b966ad50035753d.mockapi.io/products"),
          fetch("https://68f11ffe0b966ad50035753d.mockapi.io/categories"),
        ]);

        const productsData = await resProducts.json();
        const categoriesData = await resCategories.json();

        setItems(productsData);
        setCategories([{ id: 0, name: "Все" }, ...categoriesData]);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onAddPizza = (pizza: PizzaItem) => {
    const cartData = localStorage.getItem("cart");
    const cart = cartData ? JSON.parse(cartData) : [];

    const newCartItem = {
      id: pizza.id,
      name: pizza.name,
      price: pizza.price,
      imageUrl: "/image 5.png",
      type: "Tonkoe",
      size: 30,
      count: 1,
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const findItem = cart.find((obj: any) => obj.id === pizza.id);
    if (findItem) {
      findItem.count++;
    } else {
      cart.push(newCartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    router.push("/cart");
  };

  const filteredItems =
    activeCategory > 0
      ? items.filter((item) => Number(item.category) === activeCategory)
      : items;

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "Proxima Nova, system-ui, sans-serif" }}
    >
      <h2 className="fw-bold mb-4">Все piццы</h2>

      <div className="row g-4">
        {isLoading ? (
          <p className="text-center w-100">Yuklanmoqda...</p>
        ) : (
          filteredItems.map((pizza) => (
            <div
              key={pizza.id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <div
                className="pizza-block text-center"
                style={{ width: "280px" }}
              >
                <img
                  src={"/image 5.png"}
                  alt={pizza.name}
                  className="img-fluid mb-3"
                  width={260}
                  height={260}
                />
                <h4 className="fw-bold mb-3" style={{ fontSize: "20px" }}>
                  {pizza.name}
                </h4>

                <div
                  className="p-2 rounded-3 mb-3"
                  style={{ backgroundColor: "#f3f3f3" }}
                >
                  <div className="d-flex gap-1 mb-2">
                    <button className="btn btn-light p-0 p-1!">Tonkoe</button>
                    <button className="btn btn-light p-0 p-1!">
                      Traditsionnoe
                    </button>
                  </div>

                  <div className="d-flex gap-1">
                    <button className="btn btn-light">3 cm</button>
                    <button className="btn btn-light">8 cm</button>
                    <button className="btn btn-light">34 cm</button>
                  </div>
                </div>

                <div className="d-flex align-items-center justify-content-between">
                  <div className="fw-bold" style={{ fontSize: "22px" }}>
                    от {pizza.price} ₽
                  </div>
                  <button
                    onClick={() => onAddPizza(pizza)}
                    className="btn btn-outline-danger px-3 py-2 fw-bold rounded-pill border-2 d-flex align-items-center gap-1"
                    style={{ color: "#fe5f1e", borderColor: "#fe5f1e" }}
                  >
                    <span>+ Добавить</span>
                    <span
                      className="badge rounded-circle"
                      style={{ backgroundColor: "#fe5f1e" }}
                    >
                      1
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PizzaPage;
