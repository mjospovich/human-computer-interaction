// src/app/popularno/page.tsx

"use client";

import { getPopularCars } from '@/lib/carData';
import { useState, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { CarCard } from "@/components/carCard";
import { FormButtonGroup } from "@/components/formButtonGroup";

export default function PopularnoPage() {
  const [visibleCards, setVisibleCards] = useState(9);
  const [sortOption, setSortOption] = useState('a-z');
  const cars = getPopularCars();

  const sortedCars = useMemo(() => {
    const sorted = [...cars];
    switch (sortOption) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'a-z':
        return sorted.sort((a, b) => `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`));
      case 'z-a':
        return sorted.sort((a, b) => `${b.brand} ${b.model}`.localeCompare(`${a.brand} ${a.model}`));
      default:
        return sorted;
    }
  }, [cars, sortOption]);

  // Function to generate CarCard components
  const renderCarCards = (count: number) => {
    return sortedCars.slice(0, count).map((car) => (
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
    setVisibleCards(visibleCards + 9);
  };

  // Add this container class for consistency
  const containerClass = "w-full max-w-80 md-grid:w-auto md-grid:max-w-xl mx-auto lg-grid:max-w-4xl";

  return (
    <main className="flex min-h-screen flex-col items-center justify-start pt-20 sm:pt-24 bg-background">
      <Navigation />

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

      {/* Content wrapper with fixed width */}
      <div className={`${containerClass} flex flex-col items-center`} style={{ maxWidth: 'inherit' }}>
        {/* Sorting Options */}
        <div className="w-full max-w-72 md-grid:max-w-full mt-4">
          <FormButtonGroup
            label=""
            options={[
              'A-Z',
              'Z-A',
              '€ od najniže',
              '€ od najviše'
            ]}
            value={
              sortOption === 'a-z' ? 'A-Z' :
              sortOption === 'z-a' ? 'Z-A' :
              sortOption === 'price-asc' ? '€ od najniže' :
              '€ od najviše'
            }
            onChange={(value) => {
              setSortOption(
                value === 'A-Z' ? 'a-z' :
                value === 'Z-A' ? 'z-a' :
                value === '€ od najniže' ? 'price-asc' :
                'price-desc'
              );
            }}
          />
        </div>

        {/* Grid Container with explicit width */}
        <div className="w-full grid grid-cols-1 md-grid:grid-cols-2 lg-grid:grid-cols-3 gap-4 md-grid:gap-4 lg-grid:gap-4 mt-2">
          {renderCarCards(visibleCards)}
        </div>

        {/* Load More Button Container */}
        <div className="w-full flex justify-center my-6">
          {visibleCards < sortedCars.length && (
            <button
              onClick={loadMoreCards}
              className="py-2 px-6 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white transition-colors duration-300"
            >
              Više Oglasa
            </button>
          )}
        </div>
      </div>
    </main>
  );
}