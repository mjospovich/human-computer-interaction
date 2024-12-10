"use client";

import { Navigation } from "@/components/navigation";
import { useState } from "react";

export default function ONamaPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <Navigation setIsOpen={setIsOpen} />
      <div className="text-center text-xl font-medium tracking-tight">
        No content in /O nama for now.
      </div>
    </main>
  );
}
