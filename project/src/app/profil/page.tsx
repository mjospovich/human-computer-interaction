"use client";

import { Navigation } from "@/components/navigation";
import { useAuth } from "@/context/authContext";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { ProfileAvatar } from "@/components/profileAvatar";
import { Toast } from "@/components/toast";

export default function ProfilPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/prijavise');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(user?.email || '', {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setToastMessage('Email za promjenu lozinke je poslan!');
      setShowToast(true);
    } catch (error) {
      console.error('Error resetting password:', error);
      setToastMessage('Greška pri slanju emaila za promjenu lozinke.');
      setShowToast(true);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const { error } = await supabase.rpc('delete_user');
      if (error) throw error;
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      setToastMessage('Greška pri brisanju računa.');
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation />
      {showToast && (
        <Toast 
          message={toastMessage}
          type={toastMessage.includes('Greška') ? 'error' : 'success'}
          onClose={() => setShowToast(false)}
        />
      )}
      
      <div className="w-full max-w-md my-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm relative">
          {/* Settings Toggle Button */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="absolute top-4 right-4 text-secondary-text-black hover:text-brand transition-colors"
            aria-label={showSettings ? "Close settings" : "Open settings"}
          >
            {showSettings ? (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>

          <div className="flex flex-col items-center mb-6">
            <ProfileAvatar email={user?.email || ''} size="lg" />
            <h1 className="text-2xl font-bold text-main-text-black mt-4">Moj Profil</h1>
          </div>
          
          {!showSettings ? (
            // Profile Info View
            <div className="space-y-6">
              <div className="text-center">
                <p className="text-sm text-secondary-text-black">Email:</p>
                <p className="text-lg text-main-text-black">{user?.email}</p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleLogout}
                  className="w-36 py-3 px-4 bg-brand text-white rounded-full text-sm hover:bg-brand-light hover:text-main-text-black transition-colors duration-300"
                >
                  Odjavi se
                </button>
              </div>
            </div>
          ) : (
            // Settings View
            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handlePasswordReset}
                className="w-48 py-3 px-4 bg-brand-light text-main-text-black rounded-full text-sm hover:bg-brand hover:text-white transition-colors duration-300"
              >
                Promijeni Lozinku
              </button>

              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="w-48 py-3 px-4 border border-red-500 text-red-500 rounded-full text-sm hover:bg-red-500 hover:text-white transition-colors duration-300"
              >
                Izbriši Račun
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm mx-4">
            <h2 className="text-xl font-bold text-main-text-black mb-4">Potvrda Brisanja</h2>
            <p className="text-secondary-text-black mb-6">
              Jeste li sigurni da želite izbrisati svoj račun? Ova akcija je nepovratna.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-secondary-text-black hover:text-main-text-black"
              >
                Odustani
              </button>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Izbriši Račun
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
