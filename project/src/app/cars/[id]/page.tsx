"use client";

//car id page - showing car details and rating 

import Image from 'next/image';
import carsData from '@/data/template.json';
import { Navigation } from "@/components/navigation";
import { getBrandLogo } from '@/data/brandLogos';
import { Rating } from "@/components/rating";
import test1car from '@/data/test1car.json';
import { useCarData } from '@/context/carDataContext';
import { useState, useEffect } from 'react';
import { LoadingWheel } from "@/components/loadingWheel";

// Move type definition to a separate types file later
type CarDetail = {
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
};

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const { getScrapedCar } = useCarData();
  const [car, setCar] = useState<CarDetail | null>(null);
  
  useEffect(() => {
    const loadCarData = () => {
      console.log('Loading car data for ID:', params.id);
      
      // First check context
      const scrapedCar = getScrapedCar(params.id);
      if (scrapedCar) {
        console.log('Found in context:', scrapedCar);
        setCar(scrapedCar as CarDetail);
        return;
      }
      
      // Then check localStorage
      try {
        const saved = localStorage.getItem('scrapedCars');
        if (saved) {
          const savedCars = JSON.parse(saved);
          console.log('All saved cars:', savedCars);
          if (savedCars[params.id]) {
            console.log('Found in localStorage:', savedCars[params.id]);
            setCar(savedCars[params.id] as CarDetail);
            return;
          }
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error);
      }
      
      // Then check test car
      if (params.id === test1car.id) {
        console.log('Found in test1car');
        setCar(test1car as CarDetail);
        return;
      }
      
      // Finally check template data
      const templateCar = Object.values(carsData).find(car => car.id === params.id);
      console.log('Found in template data:', templateCar);
      if (templateCar) {
        setCar(templateCar as CarDetail);
        return;
      }
      
      // If no car found
      setCar(null);
    };

    loadCarData();
  }, [params.id, getScrapedCar]);

  // Show loading state while car data is being loaded
  if (!car) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Navigation />
        <LoadingWheel size="lg" message="Učitavanje podataka..." />
      </main>
    );
  }

  // Render car details once data is loaded
  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation />
      
      <div className="flex flex-col-reverse md:flex-row gap-8 w-full max-w-4xl mt-8">
        {/* Left Column - Scrollable */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Image Container */}
          <div className="w-full relative rounded-lg overflow-hidden">
            <Image 
              src={car.img}
              alt={car.title}
              width={896}
              height={0}
              className="object-contain w-full h-auto"
              sizes="(max-width: 768px) 100vw, 66vw"
              priority
            />
          </div>
          
          {/* Details Section */}
          <div className="space-y-4 bg-container-white p-6 rounded-lg shadow">
            <div className="space-y-3">
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Oglas:</span> {car.title}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Marka:</span> {car.brand}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black" >Model:</span> {car.model}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black" >Tip modela:</span> {car.model_type}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Godina:</span> {car.year}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Kilometraža:</span> {car.mileage.toLocaleString()} km</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Snaga motora:</span> {car.engine_power} kW</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Gorivo:</span> {car.fuel_type}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Mjenjač:</span> {car.transmission}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Lokacija:</span> {car.location}</p>
              <p className="pb-2 border-b border-gray-200"><span className="font-medium text-main-text-black">Motor:</span> {car.engine_displacement}</p>
              {/*last doesn have the underline*/}
              <p><span className="font-medium text-main-text-black">Stanje:</span> {car.condition}</p>
            </div>
          </div>
        </div>

        {/* Right Column - fixed */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-12 bg-container-white p-4 rounded-lg shadow space-y-4">
            {/* Title Section with Logo */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Image
                  src={getBrandLogo(car.brand)}
                  alt={`${car.brand} logo`}
                  width={26}
                  height={26}
                  className="object-contain"
                />
                <h1 className="text-xl font-bold text-main-text-black">
                  {car.brand}
                </h1>
              </div>
              <h3 className="text-lg  text-main-text-black">
                {`${car.model} ${car.model_type}`}
              </h3>
            </div>
  
            {/* Price Section */}
            <div className="mt-4">
              <p className="text-4xl font-bold text-main-text-black">€ {car.price.toLocaleString()}</p>
            </div>
  
            {/* Rating Section - when rating system is created */}
            <div className="flex items-center justify-between">
              <span className="text-secondary-text-black">Ocijena vrijednosti:</span>
              <Rating value={23} size="md" />
            </div>
  
            {/* Link - update later */}
            <div className="mt-4  bg-gray-50 rounded">
              <p className="text-secondary-text-black">
                {' '}
                <a 
                  href="https://www.njuskalo.hr/auti" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-secondary-text-black hover:underline transition-colors duration-300"
                >
                  Pogledaj oglas na - Njuškalo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// chatgpt code - not needed for now
// Add this for when we switch to database
// export async function generateStaticParams() {
//   // This will be replaced with a database query later
//   const cars = Object.values(carsData);
//   return cars.map((car) => ({
//     id: car.id,
//   }));
// }