"use client"
import { useState } from "react";
import Categories from "./Categories";
import Header from "./Header";
import Section from "./Section";

export default function Home() {
const [activeCategoryId, setActiveCategoryId] = useState("all");

  return (
    <div>
      <Header />
      <Categories activeCategoryId={activeCategoryId} 
  onChangeCategory={(id) => setActiveCategoryId(id)}/>
      <Section/>
    </div>
  );
}
