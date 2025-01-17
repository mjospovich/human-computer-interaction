//callback page for authentication, it handles:
// 1. Google OAuth redirects
// 2. Magic link confirmations
// 3. Password reset confirmations

"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingWheel } from "@/components/loadingWheel";
import { supabase } from '@/lib/supabase';
import { CheckmarkIcon } from "@/components/icons/checkmarkIcon";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error during auth callback:', error);
      }

      // Add a small delay before redirecting
      setTimeout(() => {
        router.push('/'); //home page
      }, 2000);
    };

    handleAuthCallback();
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10">
      <div className="text-center space-y-6">
        <CheckmarkIcon size="lg" className="text-green-500 mx-auto" />
        <h1 className="text-2xl font-bold text-main-text-black">Prijava Uspješna!</h1>
        <p className="text-secondary-text-black">Preusmjeravanje...</p>
        <LoadingWheel size="sm" />
      </div>
    </main>
  );
}
