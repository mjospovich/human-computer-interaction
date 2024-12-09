"use client";

import Link from 'next/link';
import { useState } from "react";
import { Navigation } from "@/components/navigation";
import ListingToScoreImg from "@/assets/listingToScoreImg.svg";

export default function ProcijeniVrijednost() {
  // State to control the navigation menu
  // not needed right now
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center md:justify-center p-10">
      <Navigation setIsOpen={setIsOpen} />

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

      {/*Input*/}
      <div className={`mb-1 fixed bottom-2 max-w-lg md:relative md:bottom-0 md:max-w-2xl w-11/12 `}>
        <input
          className="shadow-sm appearance-none border rounded-full w-full py-4 px-6 text-main-text-black leading-tight focus:outline-none focus:shadow-outline placeholder-secondary-text-black"
          id="entry"
          type="text"
          placeholder="Zalijepi link"
        />
        <button
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-brand hover:bg-brand-light hover:text-main-text-black text-white font-bold p-3 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center"
          type="button"
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