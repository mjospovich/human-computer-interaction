import carsData from '@/data/template.json';
import { PopularCar } from '@/types/car';

export function getPopularCars(): PopularCar[] {
  return Object.entries(carsData).map(([_, car]) => ({
    id: car.id,
    imageUrl: car.img,
    name: car.title,
    price: car.price
  }));
}