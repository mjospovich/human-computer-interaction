"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LoadingWheel } from "@/components/loadingWheel";
import { Toast } from "@/components/toast";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setToastMessage('Lozinke se ne podudaraju');
      setToastType('error');
      setShowToast(true);
      return;
    }

    if (password.length < 8) {
      setToastMessage('Lozinka mora imati najmanje 8 znakova');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) throw error;

      setToastMessage('Lozinka uspješno promijenjena!');
      setToastType('success');
      setShowToast(true);

      // Redirect after successful password reset
      setTimeout(() => {
        router.push('/prijavise');
      }, 2000);

    } catch (error) {
      setToastMessage('Greška pri promjeni lozinke');
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10">
        <LoadingWheel size="md" message="Promjena lozinke u tijeku..." />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      {showToast && (
        <Toast 
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="w-full max-w-md my-auto">
        <form onSubmit={handleResetPassword} className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
          <h1 className="text-2xl font-bold text-main-text-black mb-6 text-center">
            Nova Lozinka
          </h1>

          <div>
            <label className="block text-sm font-medium text-main-text-black mb-1">
              Nova Lozinka:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-main-text-black mb-1">
              Potvrdi Novu Lozinku:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="w-48 py-3 px-4 bg-brand text-white rounded-full text-sm hover:bg-brand-light hover:text-main-text-black transition-colors duration-300"
            >
              Promijeni Lozinku
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
