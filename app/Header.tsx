/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type HeaderProps = {
  totalPrice?: number;
  totalCount?: number;
};

type CartItem = {
  count: number;
  price: number;
};

const Header = ({ totalPrice: propsTotalPrice, totalCount: propsTotalCount }: HeaderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const data = localStorage.getItem("cart");
    if (data) {
      try {
        setCartItems(JSON.parse(data));
      } catch (error) {
        console.error("Savatchani o'qishda xatolik:", error);
      }
    }

    const handleStorageChange = () => {
      const updatedData = localStorage.getItem("cart");
      if (updatedData) {
        setCartItems(JSON.parse(updatedData));
      } else {
        setCartItems([]);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleChange);
  }, []);

 
  const totalCount = propsTotalCount !== undefined 
    ? propsTotalCount 
    : cartItems.reduce((sum, item) => sum + (item.count || 0), 0);

  const totalPrice = propsTotalPrice !== undefined 
    ? propsTotalPrice 
    : cartItems.reduce((sum, item) => sum + ((item.price || 0) * (item.count || 0)), 0);

  return (
    <header className="py-4 border-bottom">
      <div className="container d-flex justify-content-between align-items-center">
        <Link
          href="/"
          className="d-flex align-items-center gap-3 text-decoration-none text-dark"
        >
          <Image
            src="/image 1.png"
            alt="React Pizza Logo"
            height={38}
            width={38}
          />
          <div>
            <h1 className="h4 fw-bold mb-0 text-uppercase">React Pizza</h1>
            <p className="text-muted mb-0 lh-1" style={{ fontSize: "14px" }}>
              самая вкусная пицца во вселенной
            </p>
          </div>
        </Link>

        <div className="d-flex gap-3">
          <Link href={"/admin"}>
            <button className="btn btn-outline-dark">admin page</button>
          </Link>
          <Link href={"/cart"} className="text-decoration-none">
            <button
              className="btn btn-orange d-flex align-items-center gap-3 px-4 py-2"
              style={{
                backgroundColor: "#fe5f1e",
                color: "white",
                borderRadius: "30px",
                fontWeight: "600",
              }}
            >
              <span>{totalPrice} ₽</span>
              <div
                style={{
                  width: "1px",
                  height: "20px",
                  backgroundColor: "rgba(255,255,255,0.4)",
                }}
              ></div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-cart3"></i>
                <span>{totalCount}</span>
              </div>
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

function handleChange(this: Window, ev: StorageEvent) {
  throw new Error("Function not implemented.");
}
