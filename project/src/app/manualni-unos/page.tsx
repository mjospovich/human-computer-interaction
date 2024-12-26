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
    doors: ''  // Add new state for doors
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="w-full max-w-2xl mt-8">
        <h1 className="text-2xl font-bold text-main-text-black mb-6">
          Manualni Unos Podataka
        </h1>
        
        <div className="bg-container-white p-6 rounded-lg shadow">
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

          <FormButtonGroup
            label="Broj Vrata"
            options={['3', '4', '5', '7']}
            value={formData.doors}
            onChange={handleChange('doors')}
            required
          />
        </div>
      </div>
    </main>
  );
}
