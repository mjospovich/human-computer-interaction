"use client";

import Link from 'next/link';
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import ListingToScoreImg from "@/assets/listingToScoreImg.svg";
import { Toast } from "@/components/toast";
import { useAuth } from "@/context/authContext";
import { ArrowIcon } from "@/components/icons/arrowIcon";
import { CheckmarkIcon } from "@/components/icons/checkmarkIcon";

export default function ProcijeniVrijednost() {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { showLoginToast, setShowLoginToast } = useAuth();

  // Validation function for input URL
  const validateInput = (value: string) => {
    if (!value.startsWith('https://www.njuskalo.hr/auti/')) {
      setError('Uneseni link ne izgleda kao oglas automobila!');
    } else {
      setError('');
    }
  };

  // Add URL formatting function
  const formatUrl = (url: string) => {
    if (!isInputFocused && isValidUrl && url.includes('auti/')) {
      const startIndex = url.indexOf('auti/');
      const endIndex = url.indexOf('-oglas');
      const extractedText = endIndex !== -1 
        ? url.substring(startIndex + 5, endIndex)
        : url.substring(startIndex + 5);
      return extractedText.replace(/-/g, ' ');
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
  const handleButtonClick = () => {
    if (error === '' && inputValue !== '') {
      // Proceed with valid URL
      console.log('Valid URL:', inputValue);
      // Add your submission logic here
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

  const isValidUrl = inputValue.startsWith('https://www.njuskalo.hr/auti/') && !error;

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
        <ListingToScoreImg className="mb-3 md:mb-0 mx-auto w-2/3 md:w-1/2" />
        <p className="text-secondary-text-black text-left mb-2 text-sm">
          1. Kopiraj link oglasa automobila s jednog od podržanih oglasnika (Njuškalo).
        </p>
        <p className="text-secondary-text-black text-left text-sm">
          2. Zalijepi link u polje ili manunalno unesi podatke za procjenu vrijednosti automobila.
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
            placeholder="Zalijepi link"
            value={isInputFocused ? inputValue : formatUrl(inputValue)}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          {isValidUrl && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500">
              <CheckmarkIcon />
            </div>
          )}
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-light hover:text-main-text-black text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="button"
              onClick={handleButtonClick}
            >
              <ArrowIcon className="w-4 h-4 transform rotate-[-90deg]" />
            </button>
          </div>
          {error && (
            <p className="mt-2 text-center text-red-500 text-sm mx-auto">
              {error}
            </p>
          )}
        </div>

      <Link href="/manualni-unos" className="md:mt-3 py-3 px-4 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white">
        Manualni unos
      </Link>

      <p className="mt-3 text-xs text-secondary-text-black text-center">
        <Link href="/popularno" legacyBehavior>
          <a className="hover:underline">Nemam Link?</a>
        </Link>
      </p>
      
      <p className="mt-8 mb-2 text-xs text-discreet-text-black text-center max-w-lg fixed bottom-2 -z-10 hidden md:block">
        Napomena: Procjena je izrađena na temelju unesenih informacija i dostupnih podataka. Ne možemo jamčiti potpunu točnost ili ispravnost podataka iz oglasa. Rezultati procjene služe isključivo informativnoj svrsi i ne predstavljaju stručni ili financijski savjet.
      </p>
    </main>
  );
}