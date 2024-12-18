// src/app/popularno/page.tsx

"use client";

import { getPopularCars } from '@/lib/carData';
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { CarCard } from "@/components/carCard";

export default function PopularnoPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState(6);
  const cars = getPopularCars();

  // Function to generate CarCard components
  const renderCarCards = (count: number) => {
    return cars.slice(0, count).map((car) => (
      <CarCard
        key={car.id}
        id={car.id}
        imageUrl={car.imageUrl}
        name={`${car.brand} ${car.model} ${car.model_type}`}
        price={`€ ${car.price.toLocaleString()}`}
        //rating={91}
        brand={car.brand}
      />
    ));
  };

  // Function to load more cards
  const loadMoreCards = () => {
    setVisibleCards(visibleCards + 6);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 sm:pt-24 bg-background">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Title and Description */}
      <div className="text-center">
        <h1 className="text-xl sm-grid:text-2xl md-grid:text-3xl font-bold text-main-text-black mb-4">
          Procijeni Popularne Oglase
        </h1>
        <p className="text-xs sm-grid:text-sm text-secondary-text-black w-2/3 mx-auto">
          Ovo su oglasi koje su korisnici najčešće pretraživali u posljednjih mjesec dana.
          Saznaj i ti njihovu procijenjenu vrijednost!
        </p>
      </div>


      {/* Grid Container */}
      <div className={`mb-6 w-2/3 mx-auto max-w-2xl grid grid-cols-1 md-grid:grid-cols-2 lg-grid:grid-cols-3 gap-4 md-grid:gap-4 lg-grid:gap- mt-8`}>
        {renderCarCards(visibleCards)}
      </div>

      {/* Load More Button */}
      {visibleCards < 18 && (
        <div className="flex justify-center items-center w-full mb-6">
          <button
            onClick={loadMoreCards}
            className="py-2 px-6 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white transition-colors duration-300"
          >
            Više Oglasa
          </button>
        </div>
      )}
    </main>
  );
}