//Navigation component

"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "../assets/KupujemAutoLogo.svg";
import { usePathname } from "next/navigation";
import { useAuth } from '@/context/authContext';
import { ProfileAvatar } from './profileAvatar';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  
  const navigationLinks = [
    { title: "Procijeni vrijednost", path: "/" },
    { title: "Popularno", path: "/popularno" },
    { title: "Podrška", path: "/podrska" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={`bg-background fixed top-0 left-0 w-full flex justify-between items-center p-4 z-50 ${isOpen ? "bg-container-white shadow-md" : ""}`}>
      {/* Logo Section */}
      <div className="text-lg font-bold">
        <Link href="/">
          <Logo className="h-5 w-auto" alt="My Logo" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {navigationLinks.map((link, index) => (
          <Link 
            key={index}
            href={link.path} 
            className={pathname === link.path ? "font-bold text-main-text-black" : "text-main-text-black"}
          >
            {link.title}
          </Link>
        ))}
        {isAuthenticated ? (
          <Link href="/profil">
            <ProfileAvatar email={user?.email || ''} size="sm" />
          </Link>
        ) : (
          <Link href="/prijavise" className="text-main-text-black">
            Prijavi se
          </Link>
        )}
      </div>

      {/* Mobile Menu Button - Only show if not authenticated */}
      {!isAuthenticated && (
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-main-text-black hover:text-secondary-text-black focus:outline-none"
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      )}

      {/* Mobile Avatar - Only show if authenticated */}
      {isAuthenticated && (
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center"
          >
            <ProfileAvatar email={user?.email || ''} size="sm" />
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-0 bg-black opacity-50 z-50"></div>
          <div ref={menuRef} className="relative z-50 bg-white shadow-md w-full p-4">
            <div className="flex justify-between items-center">
              <Link href="/">
                <Logo className="h-5 w-auto" alt="My Logo" />
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-main-text-black hover:text-secondary-text-black focus:outline-none"
              >
                <span className="sr-only">Close main menu</span>
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <ul className="mt-4 space-y-4 text-main-text-black">
              {navigationLinks.map((link, index) => (
                <li key={index} className="text-center">
                  <Link
                    href={link.path}
                    className={pathname === link.path ? "font-bold text-main-text-black" : "text-main-text-black"}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="text-center">
                {isAuthenticated ? (
                  <Link href="/profil" className="text-main-text-black">
                    Profil
                  </Link>
                ) : (
                  <Link href="/prijavise" className="text-main-text-black">
                    Prijavi se
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
