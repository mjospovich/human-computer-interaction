"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { CarCard } from "@/components/carCard";

export default function PopularnoPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation setIsOpen={setIsOpen} />
      <CarCard
        //this is in public
        imageUrl="/testCar.jpg"
        name="Car Name Test"
        price="€ 20,000"
        rating={91}
      />
    </main>
  );
}