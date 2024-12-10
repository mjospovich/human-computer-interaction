// src/app/popularno/page.tsx

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
      const carId = `car-${i + 1}`; // Unique ID for each car
      cards.push(
        <CarCard
          key={carId}
          id={carId}
          imageUrl="/testCar.jpg"
          name={`Car Name Test ${i + 1}`}
          price="€ 20,000"
          rating={91}
        />
      );
    }
    return cards;
  };

  // Function to load more cards
  const loadMoreCards = () => {
    setVisibleCards(visibleCards + 6);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start py-8 sm-grid:p-8 bg-gray-100">
      <Navigation setIsOpen={setIsOpen} />

      {/* Title and Description */}
      <div className="text-center mt-8">
        <h1 className="text-xl sm-grid:text-2xl md-grid:text-3xl font-bold text-main-text-black mb-4">
          Procijeni Popularne Oglase
        </h1>
        <p className="text-xs sm-grid:text-sm text-secondary-text-black w-2/3 mx-auto">
          Ovo su oglasi koje su korisnici najčešće pretraživali u posljednjih mjesec dana.
          Saznaj i ti njihovu procijenenu vrijednost!
        </p>
      </div>


      {/* Grid Container */}
      <div className={`w-2/3 mx-auto max-w-2xl grid grid-cols-1 md-grid:grid-cols-2 lg-grid:grid-cols-3 gap-4 md-grid:gap-4 lg-grid:gap- mt-8 ${isOpen ? "-z-10" : "z-10"}`}>
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