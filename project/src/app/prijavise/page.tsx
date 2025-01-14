"use client";

import { Navigation } from "@/components/navigation";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { LoadingWheel } from "@/components/loadingWheel";

type FormType = 'login' | 'register';

export default function PrijaviSePage() {
  const router = useRouter();
  const [formType, setFormType] = useState<FormType>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

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

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear errors when typing
    setErrors(prev => ({ ...prev, [field]: '' }));

    // Validate password match when typing in either password field
    if (formType === 'register' && (field === 'password' || field === 'confirmPassword')) {
      if (field === 'password') {
        const passwordError = validatePassword(value);
        if (passwordError) {
          setErrors(prev => ({ ...prev, password: passwordError })); 
        }
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          setErrors(prev => ({ ...prev, confirmPassword: "Lozinke se ne podudaraju" }));
        }
      } else if (field === 'confirmPassword' && value !== formData.password) {
        setErrors(prev => ({ ...prev, confirmPassword: "Lozinke se ne podudaraju" }));
      }
    }
  };

  const testSupabaseConnection = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        console.log('User is authenticated');
      }
    } catch (error) {
      console.error('Connection error occurred:', error);
    }
  };

  // Test connection on component mount
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setAuthError('');

    const startTime = Date.now();
    const minLoadingTime = 800;

    try {
      if (formType === 'register') {
        if (formData.password !== formData.confirmPassword) {
          setAuthError('Lozinke se ne podudaraju');
          return;
        }

        const { data, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });

        if (signUpError) {
          if (signUpError.message.includes('already registered')) {
            setAuthError('Email je već registriran');
          } else {
            setAuthError('Greška prilikom registracije');
          }
          console.error('Registration failed:', signUpError.message);
          return;
        }

        if (data.user) {
          console.log('Successfully registered');
          setRegistrationSuccess(true);
        }
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) {
          if (signInError.message.includes('Invalid login')) {
            setAuthError('Pogrešan email ili lozinka');
          } else {
            setAuthError('Greška prilikom prijave');
          }
          console.error('Login failed:', signInError.message);
          return;
        }

        if (data.user) {
          console.log('Successfully logged in');
          router.push('/');
        }
      }
    } catch (error) {
      console.error('Authentication error occurred:', error);
      setAuthError('Došlo je do greške. Pokušajte ponovno.');
    } finally {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minLoadingTime) {
        await new Promise(resolve => setTimeout(resolve, minLoadingTime - elapsedTime));
      }
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error: googleError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (googleError) {
        setAuthError('Greška prilikom prijave s Googleom');
        console.error('Google login failed:', googleError.message);
      }
    } catch (error) {
      console.error('Authentication error occurred:', error);
      setAuthError('Došlo je do greške. Pokušajte ponovno.');
    } finally {
      setIsLoading(false);
    }
  };

  // Show success message after registration
  if (registrationSuccess) {
    return (
      <main className="flex min-h-screen flex-col items-center p-10">
        <Navigation />
        <div className="w-full max-w-md my-auto">
          <div className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4">
            <svg className="w-16 h-16 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
            </svg>
            <h2 className="text-2xl font-bold text-main-text-black">Registracija uspješna!</h2>
            <p className="text-secondary-text-black">
              Provjerite svoj email za potvrdu registracije.
            </p>
            <p className="text-secondary-text-black">
              Nakon potvrde možete se prijaviti u svoj račun.
            </p>
            <button
              onClick={() => {
                setRegistrationSuccess(false);
                setFormType('login');
              }}
              className="mt-4 text-brand hover:text-brand-light transition-colors duration-300"
            >
              Povratak na prijavu
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Move loading state check to the main render
  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10">
        <Navigation />
        <LoadingWheel 
          size="md" 
          message={formType === 'login' ? 'Prijava u tijeku...' : 'Registracija u tijeku...'} 
        />
      </main>
    );
  }

  const passwordInputStyle = `
    input::-ms-reveal,
    input::-ms-clear {
      display: none;
    }
    input::-webkit-credentials-auto-fill-button {
      visibility: hidden;
      position: absolute;
      right: 0;
    }
  `;

  return (
    <>
      <style jsx global>{passwordInputStyle}</style>
      <main className="flex min-h-screen flex-col items-center p-10">
        <Navigation />
        
        <div className="w-full max-w-md my-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
            {/* Google Login Button */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg text-main-text-black hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {formType === 'login' ? 'Prijavi se s Googleom' : 'Registriraj se s Googleom'}
              </button>
            </div>

            {/* Separator */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-secondary-text-black">ili</span>
              </div>
            </div>

            {/* Show auth error if any */}
            {authError && (
              <div className="p-3 rounded bg-red-50 text-red-500 text-sm text-center">
                {authError}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-main-text-black mb-1">
                Email:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-main-text-black mb-1">
                Lozinka:
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent pr-10"
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Remove the duplicate eye icon from the general input section */}
            {formType === 'register' && (
              <div>
                <label className="block text-sm font-medium text-main-text-black mb-1">
                  Potvrdi Lozinku:
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent pr-10"
                    required
                  />
                  {/* Only one eye icon here */}
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            <div className="flex flex-col items-center gap-3">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-36 py-3 px-4 bg-brand text-white rounded-full text-sm hover:bg-brand-light hover:text-main-text-black transition-colors duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Učitavanje...' : formType === 'login' ? 'Prijavi se' : 'Registriraj se'}
              </button>

              <button
                type="button"
                onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
                className="text-xs text-secondary-text-black hover:text-brand transition-colors duration-300"
              >
                {formType === 'login' ? (
                  <span>Nemaš račun? <span className="font-semibold">Registriraj se</span></span>
                ) : (
                  <span>Već imaš račun? <span className="font-semibold">Prijavi se</span></span>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}