"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { CarCard } from "@/components/carCard";

export default function PopularnoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(6);

  // Function to generate CarCard components
  const renderCarCards = (count: number) => {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <div key={i} className="flex justify-center items-center">
          <CarCard
            imageUrl="/testCar.jpg"
            name={`Car Name Test ${i + 1}`}
            price="€ 20,000"
            rating={91}
          />
        </div>
      );
    }
    return cards;
  };

  // Function to load more cards
  const loadMoreCards = () => {
    setVisibleCards(visibleCards + 6);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation setIsOpen={setIsOpen} />
      <div className={`grid w-2/3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ${isOpen ? "-z-10" : "z-10"}`}>
        {renderCarCards(visibleCards)}
      </div>
      {visibleCards < 18 && (
        <div className="flex justify-center items-center w-full mt-5">
          <button
            onClick={loadMoreCards}
            className="py-3 px-4 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}