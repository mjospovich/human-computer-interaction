"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the car data structure
interface CarDetail {
  id: string;
  title: string;
  price: number;
  img: string;
  year: number;
  mileage: number;
  engine_power: number;
  fuel_type: string;
  transmission: string;
  location: string;
  brand: string;
  model: string;
  model_type: string;
  model_year: string;
  in_traffic_from: string | null;
  engine_displacement: string;
  fuel_consumption: string | null;
  co2_emission: string | null;
  eco_category: string | null;
  condition: string;
  service_book: boolean;
  video_call_available: boolean;
  garage_kept: boolean;
}

type CarData = {
  [key: string]: CarDetail;
};

type CarDataContextType = {
  scrapedCars: CarData;
  addScrapedCar: (id: string, data: CarDetail) => void;
  getScrapedCar: (id: string) => CarDetail | null;
};

const CarDataContext = createContext<CarDataContextType | undefined>(undefined);

export function CarDataProvider({ children }: { children: ReactNode }) {
  const [scrapedCars, setScrapedCars] = useState<CarData>(() => {
    // Try to load initial state from localStorage
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('scrapedCars');
      return saved ? JSON.parse(saved) : {};
    }
    return {};
  });

  const addScrapedCar = (id: string, data: CarDetail) => {
    setScrapedCars(prev => {
      const updated = { ...prev, [id]: data };
      // Save to localStorage whenever we add a car
      localStorage.setItem('scrapedCars', JSON.stringify(updated));
      return updated;
    });
  };

  const getScrapedCar = (id: string) => {
    return scrapedCars[id] || null;
  };

  return (
    <CarDataContext.Provider value={{ scrapedCars, addScrapedCar, getScrapedCar }}>
      {children}
    </CarDataContext.Provider>
  );
}

export const useCarData = () => {
  const context = useContext(CarDataContext);
  if (context === undefined) {
    throw new Error('useCarData must be used within a CarDataProvider');
  }
  return context;
};
