"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Navigation } from "@/components/navigation";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation />

      <div className="flex flex-col items-center justify-center flex-grow">
        <Image 
          src="/images/404.svg"
          alt="404 Not Found"
          width={370}
          height={141}
          className="mb-0 w-2/3 md:w-1/2 max-w-lg max-h-32"
        />
        
        <h2 className="text-lg md:text-2xl text-main-text-black mb-4">
          Ups! Stranica nije pronađena...
        </h2>

        <Link 
          href="/" 
          className="py-2 px-6 bg-brand text-white rounded-full text-sm hover:bg-brand-light hover:text-main-text-black transition-colors"
        >
          Povratak
        </Link>
      </div>
    </main>
  );
}
