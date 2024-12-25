"use client";

import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function PodrskaPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "kupujemautohr@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="text-center ">
        <p className="text-sm text-secondary-text-black">
          Za više informacija kontaktirajte nas na:
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-main-text-black pl-3">{email}</span>
          <button
            onClick={handleCopy}
            className="p-2 text-discreet-text-black hover:text-main-text-black transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
