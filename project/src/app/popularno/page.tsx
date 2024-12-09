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
    <main className="flex min-h-screen flex-col items-center justify-start p-10 bg-gray-100">
      <Navigation setIsOpen={setIsOpen} />

      {/* Grid Container */}
      <div className={`w-2/3 max-w-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-4 mt-8 ${isOpen ? "-z-10" : "z-10"}`}>
        {renderCarCards(visibleCards)}
      </div>

      {/* Load More Button */}
      {visibleCards < 18 && (
        <div className="flex justify-center items-center w-full mt-6">
          <button
            onClick={loadMoreCards}
            className="py-2 px-6 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white transition-colors duration-300"
          >
            Load More
          </button>
        </div>
      )}
    </main>
  );
}