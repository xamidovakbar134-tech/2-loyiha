"use client";
import router from "next/router";
import { useState, useEffect } from "react";

interface PizzaItem {
  id: string;
  title: string;
  price: number;
  category: number;
  imageUrl: string;
  types: number[];
  sizes: number[];
  rating: number;
}

interface CategoryItem {
  id: string | number;
  name: string;
}

interface ApiResponse<T> {
  status: string;
  code: number;
  result: T;
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
          fetch("https://serve.faux-api.com/f92ae21abaa048e1a243f392/products"),
          fetch(
            "https://serve.faux-api.com/f92ae21abaa048e1a243f392/categories",
          ),
        ]);

        const productsData: ApiResponse<PizzaItem[]> = await resProducts.json();
        const categoriesData: ApiResponse<CategoryItem[]> =
          await resCategories.json();

        setItems(productsData.result);
        setCategories([{ id: 0, name: "Все" }, ...categoriesData.result]);
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
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      type: pizza.types[0],
      size: pizza.sizes[0],
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
      <h2 className="fw-bold mb-4">Все пиццы</h2>

      <div className="row g-4">
        {isLoading ? (
          <div className="text-center w-100">
            <p>Yuklanmoqda...</p>
          </div>
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
                  src={pizza.imageUrl}
                  alt={pizza.title}
                  className="img-fluid mb-3"
                  width={260}
                  height={260}
                />
                <h4 className="fw-bold mb-3" style={{ fontSize: "20px" }}>
                  {pizza.title}
                </h4>

                <div
                  className="p-2 rounded-3 mb-3"
                  style={{ backgroundColor: "#f3f3f3" }}
                >
                  <div className="d-flex gap-1 mb-2">
                    <button className="btn btn-light flex-fill p-1">
                      Tonkoe
                    </button>
                    <button className="btn btn-light flex-fill p-1">
                      Traditsionnoe
                    </button>
                  </div>

                  <div className="d-flex gap-1">
                    {pizza.sizes.map((size) => (
                      <button key={size} className="btn btn-light flex-fill">
                        {size} cm
                      </button>
                    ))}
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
