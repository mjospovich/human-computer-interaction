import Image from 'next/image';

type CarCardProps = {
  imageUrl: string;
  name: string;
  price: string;
  rating: number;
};

export function CarCard({ imageUrl, name, price, rating }: CarCardProps) {
  return (
    <div className="w-full max-w-xs bg-white shadow-md rounded-2xl overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-secondary-text-black font-bold">{price}</span>
          <span className="text-secondary-text-black font-bold">{rating}</span>
        </div>
      </div>
    </div>
  );
}