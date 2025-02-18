"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Toast } from "@/components/toast";
import { useAuth } from "@/context/authContext";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { useRouter } from 'next/navigation';
import { scrapeCarData } from '@/utils/api';
import { useCarData } from '@/context/carDataContext';
import { LoadingWheel } from "@/components/loadingWheel";

export default function ProcijeniVrijednost() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { showLoginToast, setShowLoginToast } = useAuth();
  const router = useRouter();
  const { addScrapedCar } = useCarData();
  const [isLoading, setIsLoading] = useState(false);

  //validation function for both Njuskalo and Index
  const validateInput = (value: string) => {
    const isNjuskaloUrl = value.startsWith('https://www.njuskalo.hr/auti/');
    const isIndexUrl = value.startsWith('https://www.index.hr/oglasi/auto-moto/osobni-automobili/oglas/');
    
    if (!isNjuskaloUrl && !isIndexUrl) {
      setError('Uneseni link ne izgleda kao oglas automobila!');
    } else {
      setError('');
    }
  };

  // Updated URL formatting function
  const formatUrl = (url: string) => {
    if (!isInputFocused && isValidUrl) {
      if (url.includes('njuskalo.hr/auti/')) {
        const startIndex = url.indexOf('auti/');
        const endIndex = url.indexOf('-oglas');
        const extractedText = endIndex !== -1 
          ? url.substring(startIndex + 5, endIndex)
          : url.substring(startIndex + 5);
        return extractedText.replace(/-/g, ' ');
      } else if (url.includes('index.hr/oglasi/')) {
        const startIndex = url.indexOf('oglas/');
        const endIndex = url.lastIndexOf('/');
        const extractedText = url.substring(startIndex + 6, endIndex);
        return extractedText.replace(/-/g, ' ');
      }
    }
    return url;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
  };

  // Handle button click
  const handleButtonClick = async () => {
    if (error === '' && inputValue !== '') {
      // Check if it's Index Oglasi
      /*
      if (inputValue.startsWith('https://www.index.hr/')) {
        setError('Index Oglasi trenutno nije podržan. Koristite Njuškalo oglas.');
        return;
      }
      */

      try {
        setIsLoading(true);
        console.log('Fetching data for URL:', inputValue);
        const carData = await scrapeCarData(inputValue);
        console.log('Received car data:', carData);
        
        addScrapedCar(carData.id, carData);
        console.log('Added car to context with ID:', carData.id);
        
        router.push(`/cars/${carData.id}`);
      } catch (err) {
        console.error('Error fetching car data:', err);
        setError('Greška pri dohvaćanju podataka. Pokušajte ponovno.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Add useEffect for toast timeout
  useEffect(() => {
    if (showLoginToast) {
      const timer = setTimeout(() => {
        setShowLoginToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showLoginToast, setShowLoginToast]);

  // Updated URL validation check
  const isValidUrl = (
    inputValue.startsWith('https://www.njuskalo.hr/auti/') || 
    inputValue.startsWith('https://www.index.hr/oglasi/auto-moto/osobni-automobili/oglas/')
  ) && !error;

  const getLogoComponent = () => {
    if (!isValidUrl) return null;
    
    if (inputValue.startsWith('https://www.njuskalo.hr/')) {
      return (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Image
            src={'/images/njuskalo-logo.png'}  
            alt="Njuškalo"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      );
    }
    
    if (inputValue.startsWith('https://www.index.hr/')) {
      return (
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
          <Image
            src={'/images/index-logo.png'}  
            alt="Index"
            width={20}
            height={20}
            className="object-contain"
          />
        </div>
      );
    }
    
    return null;
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:justify-center p-10">
      {showLoginToast && (
        <Toast 
          message="Uspješno ste prijavljeni!" 
          onClose={() => setShowLoginToast(false)} 
        />
      )}
      <Navigation />

      {/*Elements above input*/}
      <div className="mb-4 text-center w-full max-w-xl">
        <Image
          src="/images/listingToScoreImg.svg"
          alt="Listing To Score"
          width={370}
          height={141}
          className="mb-3 mx-auto w-2/3 md:w-1/2"
        />
        <p className="text-secondary-text-black text-left mb-2 text-sm">
          1. Kopiraj link oglasa automobila s jednog od podržanih oglasnika (Njuškalo, IndexOglasi).
        </p>
        <p className="text-secondary-text-black text-left text-sm">
          2. Zalijepi link u polje za ocjenu oglasa ili unesi podatke za procjenu vrijednosti automobila.
        </p>
      </div>

      {/* Input and Button Container */}
      <div className={`mb-1 fixed bottom-2 max-w-lg md:relative md:bottom-0 md:max-w-2xl w-11/12 `}>
          <div className="relative">
          <input
            className={`shadow-sm appearance-none border rounded-full w-full py-4 ${isValidUrl ? 'pl-12' : 'pl-6'} pr-6 leading-tight focus:outline-none focus:shadow-outline placeholder-secondary-text-black ${
              isInputFocused || !isValidUrl ? 'text-main-text-black' : 'text-main-text-black'
            }`}
            id="entry"
            type="text"
            placeholder="Zalijepi link oglasa"
            value={isInputFocused ? inputValue : formatUrl(inputValue)}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            disabled={isLoading}
          />
          {getLogoComponent()}
          {isLoading ? (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <LoadingWheel size="sm" className="w-8 h-8" />
            </div>
          ) : (
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-light hover:text-main-text-black text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="button"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              <ArrowIcon className="w-4 h-4 transform rotate-[-90deg]" />
            </button>
          )}
          </div>
          {error && (
            <p className="mt-2 text-center text-red-500 text-sm mx-auto">
              {error}
            </p>
          )}
        </div>

      <Link href="/manualni-unos" className="md:mt-3 py-3 px-4 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white">
        Unesi podatke
      </Link>

      <p className="mt-3 text-xs text-secondary-text-black text-center">
        <Link href="/popularno" legacyBehavior>
          <a className="hover:underline">Ocjene popularnih oglasa</a>
        </Link>
      </p>
      
      <p className="mt-8 mb-2 text-xs text-discreet-text-black text-center max-w-lg fixed bottom-2 -z-10 hidden md:block">
        Napomena: Procjena je izrađena na temelju unesenih informacija i dostupnih podataka. Ne možemo jamčiti potpunu točnost ili ispravnost podataka iz oglasa. Rezultati procjene služe isključivo informativnoj svrsi i ne predstavljaju stručni ili financijski savjet.
      </p>
    </main>
  );
}