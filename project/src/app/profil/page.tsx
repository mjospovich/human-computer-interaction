"use client";

import { Navigation } from "@/components/navigation";
import { useAuth } from "@/context/authContext";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { ProfileAvatar } from "@/components/profileAvatar";

export default function ProfilPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/prijavise');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-10">
      <Navigation isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="w-full max-w-md my-auto">
        <div className="bg-white p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col items-center mb-6">
            <ProfileAvatar email={user?.email || ''} size="lg" />
            <h1 className="text-2xl font-bold text-main-text-black mt-4">Moj Profil</h1>
          </div>
          
          <div className="mb-6 text-center">
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
      </div>
    </main>
  );
}
