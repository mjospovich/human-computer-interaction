// src/app/cars/[id]/page.tsx

"use client";

import { useRouter } from 'next/router';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type CarDetail = {
  id: string;
  name: string;
  price: string;
  rating: number;
  imageUrl: string;
};

export default function CarDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [car, setCar] = useState<CarDetail | null>(null);

  useEffect(() => {
    // Temporary static data
    const carData: { [key: string]: CarDetail } = {
      'car-1': {
        id: 'car-1',
        name: 'Car Name Test 1',
        price: '€ 20,000',
        rating: 91,
        imageUrl: '/testCar.jpg',
      },
      'car-2': {
        id: 'car-2',
        name: 'Car Name Test 2',
        price: '€ 25,000',
        rating: 88,
        imageUrl: '/testCar.jpg',
      },
      'car-3': {
        id: 'car-3',
        name: 'Car Name Test 3',
        price: '€ 30,000',
        rating: 95,
        imageUrl: '/testCar.jpg',
      },
      // Add more car entries as needed
    };

    // Fetch the car data based on the id
    const fetchedCar = carData[id];
    setCar(fetchedCar || null);
  }, [id]);

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
        <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
        <p className="text-gray-700">The car you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      <div className="w-80 h-80 relative mb-4">
        <Image src={car.imageUrl} alt={car.name} layout="fill" objectFit="cover" />
      </div>
      <p className="text-lg mb-2"><strong>Price:</strong> {car.price}</p>
      <p className="text-lg mb-2"><strong>Rating:</strong> {car.rating}</p>
      {/* Add more car details as needed */}
    </div>
  );
}