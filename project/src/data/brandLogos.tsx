// Add other logos
// Make sure they are in square format (the file, not the logo itself)
// Check SVG with https://jakearchibald.github.io/svgomg/
interface BrandLogosMap {
  [key: string]: string;
}

export const brandLogos: BrandLogosMap = {
  "Default": "/logos/KupujemAutoDefoult.svg",
  "Abarth": "/logos/abarth.svg",
  "Acura": "/logos/acura.svg",
  "Alfa Romeo": "/logos/alfa-romeo.svg",
  "Aston Martin": "/logos/aston-martin.svg",
  "Audi": "/logos/audi.svg",
  "Bentley": "/logos/bentley.svg",
  "BMW": "/logos/bmw.svg",
  "Bugatti": "/logos/bugatti.svg",
  "Cadillac": "/logos/cadillac.svg",
  "Chevrolet": "/logos/chevrolet.svg",
  "Chrysler": "/logos/chrysler.svg",
  "Citroen": "/logos/citroen.svg",
  "Cupra": "/logos/cupra.svg",
  "Dacia": "/logos/dacia.svg",
  "Daewoo": "/logos/daewoo.svg",
  "Dodge": "/logos/dodge.svg",
  "DS Automobiles": "/logos/dsautomobiles.svg",
  "Ferrari": "/logos/ferrari.svg",
  "Fiat": "/logos/fiat.svg",
  "Ford": "/logos/ford.svg",
  "GMC": "/logos/gmc.svg",
  "Honda": "/logos/honda.svg",
  "Hummer": "/logos/hummer.svg",
  "Hyundai": "/logos/hyundai.svg",
  "Infiniti": "/logos/infiniti.svg",
  "Iveco": "/logos/iveco.svg",
  "Jaguar": "/logos/jaguar.svg",
  "Jeep": "/logos/jeep.svg",
  "Kia": "/logos/kia.svg",
  "KTM": "/logos/ktm.svg",
  "Lada": "/logos/lada.svg",
  "Lamborghini": "/logos/lamborghini.svg",
  "Land Rover": "/logos/land-rover.svg",
  "Lexus": "/logos/lexus.svg",
  "Lincoln": "/logos/lincoln.svg",
  "Lotus": "/logos/lotus.svg",
  "Maserati": "/logos/maserati.svg",
  "Maybach": "/logos/maybach.svg",
  "Mazda": "/logos/mazda.svg",
  "McLaren": "/logos/mclaren.svg",
  "Mercedes-Benz": "/logos/mercedes-benz.svg",
  "MG": "/logos/mg.svg",
  "Mini": "/logos/mini.svg",
  "Mitsubishi": "/logos/mitsubishi.svg",
  "Nissan": "/logos/nissan.svg",
  "Opel": "/logos/opel.svg",
  "Peugeot": "/logos/peugeot.svg",
  "Pontiac": "/logos/pontiac.svg",
  "Porsche": "/logos/porsche.svg",
  "Ram": "/logos/ram.svg",
  "Renault": "/logos/renault.svg",
  "Rolls-Royce": "/logos/rolls-royce.svg",
  "Saab": "/logos/saab.svg",
  "Seat": "/logos/seat.svg",
  "Skoda": "/logos/skoda.svg",
  "Smart": "/logos/smart.svg",
  "Subaru": "/logos/subaru.svg",
  "Suzuki": "/logos/suzuki.svg",
  "Tesla": "/logos/tesla.svg",
  "Toyota": "/logos/toyota.svg",
  "Volkswagen": "/logos/volkswagen.svg",
  "Volvo": "/logos/volvo.svg",
  "Yugo": "/logos/yugo.svg"
};

// Add a function to get logo with fallback
export const getBrandLogo = (brand: string): string => {
  return brandLogos[brand] || brandLogos["Default"];
};