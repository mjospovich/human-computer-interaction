"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";

export default function PopularnoPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation setIsOpen={setIsOpen} />
      <div className="text-center text-xl font-medium tracking-tight">
        No content in /Popularno for now.
      </div>
    </main>
  );
}
