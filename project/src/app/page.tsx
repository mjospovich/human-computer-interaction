"use client";

import Link from 'next/link';
import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import ListingToScoreImg from "@/assets/listingToScoreImg.svg";

export default function ProcijeniVrijednost() {
  // State to control the navigation menu
  // not needed right now
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Load saved value on component mount
  useEffect(() => {
    const savedValue = localStorage.getItem('inputValue');
    if (savedValue) {
      setInputValue(savedValue);
      validateInput(savedValue); // Validate the saved value
    }
  }, []);

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
    if (!isInputFocused && url.startsWith('https://www.njuskalo.hr/auti/')) {
      const startIndex = url.indexOf('auti/');
      const endIndex = url.indexOf('-oglas');
      const extractedText = endIndex !== -1 
        ? url.substring(startIndex + 5, endIndex)
        : url.substring(startIndex + 5);
      const words = extractedText.split('-').slice(0, 5);
      const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      return formattedWords.join(' ');
    }
    return url;
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    validateInput(value);
    localStorage.setItem('inputValue', value);
  };

  // Handle button click
  const handleButtonClick = () => {
    if (error === '' && inputValue !== '') {
      // Proceed with valid URL
      console.log('Valid URL:', inputValue);
      // Add your submission logic here
    }
  };

  // Handle input reset
  const handleInputReset = () => {
    setInputValue('');
    setError('');
    localStorage.removeItem('inputValue');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:justify-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />

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
            className={`shadow-sm appearance-none border rounded-full w-full py-4 pr-24 pl-10 leading-tight focus:outline-none focus:shadow-outline placeholder-secondary-text-black ${
              error ? 'border-red-500' : 'border-gray-300'
            } ${!error && inputValue ? 'font-semibold' : ''}`}
            id="entry"
            type="text"
            placeholder="Zalijepi link"
            value={isInputFocused || error ? inputValue : formatUrl(inputValue)}
            onChange={handleInputChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          {!error && inputValue && (
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          )}
          {inputValue && (
            <button
              className="absolute right-16 top-1/2 transform -translate-y-1/2 text-discreet-text-black hover:text-main-text-black focus:outline-none"
              type="button"
              onClick={handleInputReset}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-light hover:text-main-text-black text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
              type="button"
              onClick={handleButtonClick}
            >
              <svg
                className="w-4 h-4 transform rotate-[-90deg]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
          {error && (
            <p className="mt-3 text-center text-red-500 text-sm mx-auto">
              {error}
            </p>
          )}
        </div>


      <button className="md:mt-3 py-3 px-4 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white">
        Manualni unos
      </button>

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