// Reset password page


"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { LoadingWheel } from "@/components/loadingWheel";
import { Toast } from "@/components/toast";
import { Navigation } from "@/components/navigation";
import { useAuth } from "@/context/authContext";
import { VisibilityToggle } from "@/components/visibilityToggle";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { logout } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return "Lozinka mora imati najmanje 8 znakova";
    }
    if (!/\d/.test(password)) {
      return "Lozinka mora sadržavati najmanje jedan broj";
    }
    if (!/[a-zA-Z]/.test(password)) {
      return "Lozinka mora sadržavati najmanje jedno slovo";
    }
    return "";
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    //client side validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      setToastMessage(passwordError);
      setToastType('error');
      setShowToast(true);
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage('Lozinke se ne podudaraju');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setIsLoading(true);

    try {

      //call Supabase to update password
      const { error } = await supabase.auth.updateUser({ password });
      
      if (error) {
        console.error('Password reset error:', error.message);
        throw new Error(error.message);
      }

      setToastMessage('Lozinka uspješno promijenjena!');
      setToastType('success');
      setShowToast(true);

      //logout user after password reset - they need to login again
      logout();
      
      setTimeout(() => {
        router.push('/prijavise');
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Greška pri promjeni lozinke';
      setToastMessage(errorMessage);
      setToastType('error');
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading wheel while waiting for response
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10">
        <Navigation />
        <LoadingWheel size="md" message="Promjena lozinke u tijeku..." />
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation />
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
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent pr-10"
                required
              />
              <VisibilityToggle 
                isVisible={showPassword} 
                onToggle={() => setShowPassword(!showPassword)} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-main-text-black mb-1">
              Potvrdi Novu Lozinku:
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent pr-10"
                required
              />
              <VisibilityToggle 
                isVisible={showConfirmPassword} 
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)} 
              />
            </div>
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
