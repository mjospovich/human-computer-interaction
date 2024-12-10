// src/components/CarCard.tsx

import Link from 'next/link';
import Image from 'next/image';

type CarCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  price: string;
  rating: number;
};

export function CarCard({ id, imageUrl, name, price, rating }: CarCardProps) {
  return (
    <Link href={`/cars/${id}`} passHref>
      <div className="w-full sm-grid:w-56 h-56 mx-auto bg-container-white shadow-md rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300 group">
        <div className="relative h-2/3">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-10 group-hover:blur-sm"
          />
          {/* Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-main-text-black text-sm font-semibold">Procijeni</span>
          </div>
        </div>
        <div className="flex-grow flex flex-col justify-end p-2">
          <h3 className="text-base font-semibold truncate">{name}</h3>
          <div className="flex justify-between items-center mt-1">
            <span className="text-secondary-text-black text-sm font-semibold">{price}</span>
            <span className="text-secondary-text-black text-sm font-semibold">{rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}