"use client";

import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function PrijaviSePage() {
  const [isOpen, setIsOpen] = useState(false);
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="text-center text-xl font-medium tracking-tight">
        No content in /Prijavi se for now.
      </div>
    </main>
  );
}