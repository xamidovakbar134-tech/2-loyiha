/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "../Header";

interface CartItem {
  id: string | number;
  title: string; 
  price: number;
  imageUrl: string;
  type: number | string;
  size: number;
  count: number;
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    const data = localStorage.getItem("cart");
    if (data) {
      setItems(JSON.parse(data));
    }
  }, []);

  const updateCount = (id: string | number, delta: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        const newCount = Math.max(1, item.count + delta);
        return { ...item, count: newCount };
      }
      return item;
    });
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const clearCart = () => {
    if (window.confirm("Очистить корзину?")) {
      setItems([]);
      localStorage.removeItem("cart");
    }
  };

  const removeItem = (id: string | number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  const totalCount = items.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div
        className="container"
        style={{ fontFamily: "Proxima Nova, sans-serif" }}
      >
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
          <h2 className="fw-bold mb-3" style={{ fontSize: "32px" }}>
            Корзина пустая{" "}
            <span role="img" aria-label="sad">
              😕
            </span>
          </h2>
          <p
            className="text-muted mb-5"
            style={{ fontSize: "18px", maxWidth: "550px" }}
          >
            Вероятней всего, вы не заказывали ещё пиццу. <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
          </p>
          <Link href="/">
            <button
              className="btn btn-dark fw-bold px-5 py-3 rounded-pill"
              style={{ backgroundColor: "#282828" }}
            >
              Вернуться назад
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header totalPrice={totalPrice} totalCount={totalCount} />
      
      <div
        className="container py-5"
        style={{ fontFamily: "Proxima Nova, sans-serif", maxWidth: "800px" }}
      >
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold d-flex align-items-center gap-2 m-0">
            <span style={{ fontSize: "30px" }}>🛒</span> Корзина
          </h2>
          <div
            onClick={clearCart}
            className="text-muted border-0 bg-transparent cursor-pointer"
            style={{ cursor: "pointer", fontSize: "16px" }}
          >
            <span className="me-2">🗑️</span> Очистить корзину
          </div>
        </div>

        <div className="cart-items">
          {items.map((item) => (
            <div
              key={item.id}
              className="d-flex align-items-center justify-content-between py-4 border-top"
            >
              <div
                className="d-flex align-items-center gap-3"
                style={{ width: "40%" }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                />
                <div>
                  <h5 className="fw-bold mb-0">{item.title}</h5>
                  <p className="text-muted mb-0">
                    {item.type === 0 ? "Тонкое" : "Традиционное"}  тесто,{" "}
                    {item.size} см.
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <button
                  onClick={() => updateCount(item.id, -1)}
                  className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "#fe5f1e",
                    borderColor: "#fe5f1e",
                  }}
                >
                  –
                </button>
                <b style={{ fontSize: "20px" }}>{item.count}</b>
                <button
                  onClick={() => updateCount(item.id, 1)}
                  className="btn btn-outline-danger rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "#fe5f1e",
                    borderColor: "#fe5f1e",
                  }}
                >
                  +
                </button>
              </div>

              <div
                className="fw-bold"
                style={{ fontSize: "22px", width: "100px", textAlign: "right" }}
              >
                {item.price * item.count} ₽
              </div>

              <button
                onClick={() => removeItem(item.id)}
                className="btn btn-outline-secondary rounded-circle text-muted border-light-subtle"
                style={{ width: "32px", height: "32px" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-between mt-5">
          <div style={{ fontSize: "20px" }}>
            Всего пицц: <b className="ms-1">{totalCount} шт.</b>
          </div>
          <div style={{ fontSize: "20px" }}>
            Сумма заказа:{" "}
            <b className="ms-1" style={{ color: "#fe5f1e" }}>
              {totalPrice} ₽
            </b>
          </div>
        </div>

        <div className="d-flex justify-content-between mt-5">
          <Link href="/">
            <button className="btn btn-outline-secondary px-3 py-2 rounded-pill text-muted fw-bold border-light-subtle">
              ‹ Вернуться назад
            </button>
          </Link>
          <button
            className="btn text-white px-3 py-1 rounded-pill fw-bold"
            style={{ backgroundColor: "#fe5f1e" }}
          >
            Оплатить сейчас
          </button>
        </div>
      </div>
    </div>
  );
}