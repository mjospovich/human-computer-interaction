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
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showErrors, setShowErrors] = useState(false);

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    let hasErrors = false;

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        newErrors[key] = true;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    setShowErrors(true);
    return !hasErrors;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('All fields are filled');
      // Add submission logic here
    }
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
            error={showErrors && errors.brand ? "Polje je prazno!" : ""}
          />
          
          <FormInput
            label="Model Automobila"
            value={formData.model}
            onChange={handleChange('model')}
            placeholder="npr. Serija 3"
            error={showErrors && errors.model ? "Polje je prazno!" : ""}
          />
          
          <FormInput
            label="Tip Modela"
            value={formData.type}
            onChange={handleChange('type')}
            placeholder="npr. 320d"
            error={showErrors && errors.type ? "Polje je prazno!" : ""}
          />

          {/* Car specifications */}
          <FormButtonGroup
            label="Broj Vrata"
            options={['3', '4', '5', '7']}
            value={formData.doors}
            onChange={handleChange('doors')}
            error={showErrors && errors.doors ? "Odaberi!" : ""}
          />

          <FormInput
            label="Prva Godina Registracije"
            value={formData.firstRegistration}
            onChange={handleChange('firstRegistration')}
            type="number"
            placeholder="npr. 2018"
            error={showErrors && errors.firstRegistration ? "Polje je prazno!" : ""}
          />

          <FormButtonGroup
            label="Vrsta Goriva"
            options={['Benzin', 'Dizel', 'Hibrid', 'Električni']}
            value={formData.fuelType}
            onChange={handleChange('fuelType')}
            error={showErrors && errors.fuelType ? "Odaberi!" : ""}
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
            error={showErrors && errors.bodyType ? "Polje je prazno!" : ""}
          />

          <FormButtonGroup
            label="Vrsta Mijenjača"
            options={['Automatski', 'Manualni', 'Polu-automatski']}
            value={formData.transmission}
            onChange={handleChange('transmission')}
            error={showErrors && errors.transmission ? "Odaberi!" : ""}
          />

          <FormInput
            label="Snaga Motora (kW)"
            value={formData.enginePower}
            onChange={handleChange('enginePower')}
            placeholder="npr. 140"
            error={showErrors && errors.enginePower ? "Polje je prazno!" : ""}
          />

          <FormInput
            label="Kilometraža"
            value={formData.mileage}
            onChange={handleChange('mileage')}
            placeholder="npr. 150000"
            error={showErrors && errors.mileage ? "Polje je prazno!" : ""}
          />

          {/* Add submit button and error message at the bottom */}
          <div className="mt-8 space-y-4 flex flex-col items-center">
            <button
              onClick={handleSubmit}
              className="w-44 py-3 px-4 bg-brand text-white rounded-full text-sm hover:bg-brand-light hover:text-main-text-black transition-colors duration-300"
            >
              Procijeni vrijednost
            </button>
            
            {showErrors && Object.keys(errors).length > 0 && (
              <p className="text-red-500 text-sm text-center">
                Sva polja nisu popunjena
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
