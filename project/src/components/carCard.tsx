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

const truncateText = (text: string, limit: number = 80) => {
  // Add space before # if it exists
  let processedText = text.replace(/#/g, ' #');
  
  // Normalize spaces
  const normalizedText = processedText.replace(/\s+/g, ' ').trim();
  
  // If text is longer than limit and has no spaces, force break it
  if (normalizedText.length > limit && !normalizedText.includes(' ')) {
    return `${normalizedText.substring(0, limit)}...`;
  }

  // Otherwise use normal space-aware truncation
  return normalizedText.length > limit 
    ? `${normalizedText.substring(0, limit)}...` 
    : normalizedText;
};

const getTextClass = (text: string) => {
  if (text.length > 50) return 'text-xs';
  return 'text-sm';
};


export function CarCard({ id, imageUrl, name, price, rating }: CarCardProps) {
  const displayName = truncateText(name);

  return (
    <Link href={`/cars/${id}`} passHref>
      <div className="w-full sm-grid:w-56 h-56 mx-auto bg-container-white shadow-md rounded-xl overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-300 group">
        
        {/*Image*/}
        <div className="relative h-2/3">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-10 group-hover:blur-sm"
          />
          {/* Image Hover Overlay Text */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-800 group-hover:opacity-100">
            <span className="text-main-text-black text-sm font-semibold">Procijeni</span>
          </div>
        </div>

        {/* Car Details */}
        <div className="flex-grow flex flex-col justify-end p-2">
          <div className="mt-auto">
            <p className={`font-semibold line-clamp-2 min-h-[2.5rem] ${getTextClass(name)}`}>
              {displayName}
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-secondary-text-black text-xs font-semibold">{price}</span>
              <span className="text-secondary-text-black text-xs font-semibold">{rating}</span>
            </div>
          </div>
        </div>
        
      </div>
    </Link>
  );
}