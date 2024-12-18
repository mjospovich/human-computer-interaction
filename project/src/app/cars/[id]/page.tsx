"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import carsData from '@/data/template.json';
import { Navigation } from "@/components/navigation";

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
  const [isOpen, setIsOpen] = useState(false);
  const { id } = params;
  const [car, setCar] = useState<CarDetail | null>(null);

  useEffect(() => {
    const fetchedCar = Object.values(carsData).find(car => car.id === id);
    if (fetchedCar) {
      const { ...carDetails} = fetchedCar;
      setCar(carDetails as CarDetail);
    } else {
      setCar(null);
    }
  }, [id]);

  if (!car) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center md:justify-center p-10">
       <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <p className="text-secondary-text-black">The car you are looking for does not exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex flex-col-reverse md:flex-row gap-8 w-full max-w-4xl mt-8">
      {/* Left Column - Scrollable */}
        <div className="w-full md:w-2/3 space-y-6">
          {/* Image Container */}
          <div className="w-full relative rounded-lg overflow-hidden">
            <Image 
              src={car.img} 
              alt={car.title}
              width={896}  // 2/3 of max-w-4xl (1536px)
              height={0}   // Auto height
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

  
        {/* Right Column - Fixed */}
        <div className="w-full md:w-1/3">
          <div className="sticky top-12 bg-container-white p-6 rounded-lg shadow space-y-4">
            {/* Title Section */}
            <div className="space-y-2">
              <h1 className="text-xl font-bold text-main-text-black">
                {`${car.brand} ${car.model} ${car.model_type}`}
              </h1>
            </div>
  
            {/* Price Section */}
            <div className="mt-4">
              <p className="text-4xl font-bold text-main-text-black">€ {car.price.toLocaleString()}</p>
            </div>
  
            {/* Rating Placeholder */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-gray-600">Rating Placeholder</p>
            </div>
  
            {/* Link Placeholder */}
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <p className="text-gray-600">Link Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}