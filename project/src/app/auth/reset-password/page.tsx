"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingWheel } from "@/components/loadingWheel";

export default function ResetPasswordPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/prijavise');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <div className="text-center space-y-6">
        <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
        </svg>
        <h1 className="text-2xl font-bold text-main-text-black">Email Poslan!</h1>
        <p className="text-secondary-text-black">Provjerite svoj email za promjenu lozinke.</p>
        <p className="text-secondary-text-black">Preusmjeravanje na prijavu...</p>
        <LoadingWheel size="sm" />
      </div>
    </main>
  );
}
