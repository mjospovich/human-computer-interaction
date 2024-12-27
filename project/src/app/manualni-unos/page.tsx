"use client";

import { Navigation } from "@/components/navigation";
import { FormInput } from "@/components/formInput";
import { FormButtonGroup } from "@/components/formButtonGroup";
import { useState } from "react";

export default function ManualniUnosPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    type: '',
    doors: '',
    firstRegistration: '',
    fuelType: '',
    bodyType: '',
    transmission: '',
    enginePower: '',
    mileage: ''
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="w-full max-w-2xl mt-8">
        {/* Updated header section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-main-text-black mb-3">
            Procjeni svoj automobil!
          </h1>
          <p className="text-secondary-text-black text-sm md:text-base max-w-lg mx-auto">
            Manualno unesi podatke o svom automobilu kako bi dobio procjenjenu vrijednost svog automobila!
          </p>
        </div>

        <div className="bg-container-white p-6 rounded-2xl shadow">
          {/* Basic car info */}
          <FormInput
            label="Marka Automobila"
            value={formData.brand}
            onChange={handleChange('brand')}
            placeholder="npr. BMW"
            required
          />
          
          <FormInput
            label="Model Automobila"
            value={formData.model}
            onChange={handleChange('model')}
            placeholder="npr. Serija 3"
            required
          />
          
          <FormInput
            label="Tip Modela"
            value={formData.type}
            onChange={handleChange('type')}
            placeholder="npr. 320d"
            required
          />

          {/* Car specifications */}
          <FormButtonGroup
            label="Broj Vrata"
            options={['3', '4', '5', '7']}
            value={formData.doors}
            onChange={handleChange('doors')}
          />

          <FormInput
            label="Prva Godina Registracije"
            value={formData.firstRegistration}
            onChange={handleChange('firstRegistration')}
            type="number"
            placeholder="npr. 2018"
            required
          />

          <FormButtonGroup
            label="Vrsta Goriva"
            options={['Benzin', 'Dizel', 'Hibrid', 'Električni']}
            value={formData.fuelType}
            onChange={handleChange('fuelType')}
          />

          <FormInput
            label="Vrsta Konstrukcije"
            value={formData.bodyType}
            onChange={handleChange('bodyType')}
            type="select"
            options={[
              'Limuzina',
              'Karavan',
              'SUV',
              'Coupe',
              'Cabriolet',
              'Hatchback',
              'MPV'
            ]}
            required
          />

          <FormButtonGroup
            label="Vrsta Mijenjača"
            options={['Automatski', 'Manualni', 'Polu-automatski']}
            value={formData.transmission}
            onChange={handleChange('transmission')}
          />

          <FormInput
            label="Snaga Motora (kW)"
            value={formData.enginePower}
            onChange={handleChange('enginePower')}
            placeholder="npr. 140"
            required
          />

          <FormInput
            label="Kilometraža"
            value={formData.mileage}
            onChange={handleChange('mileage')}
            placeholder="npr. 150000"
            required
          />
        </div>
      </div>
    </main>
  );
}
