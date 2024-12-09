import Image from 'next/image';

type CarCardProps = {
  imageUrl: string;
  name: string;
  price: string;
  rating: number;
};

export function CarCard({ imageUrl, name, price, rating }: CarCardProps) {
  return (
    <div className="w-full max-w-56 h-56 bg-container-white shadow-md rounded-2xl overflow-hidden">
      <div className={`relative h-2/3 w-full`}>
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-2">
        <h3 className="text-base font-semibold truncate">{name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-secondary-text-black text-sm font-semibold">{price}</span>
          <span className="text-secondary-text-black text-sm font-semibold">{rating}</span>
        </div>
      </div>
    </div>
  );
}