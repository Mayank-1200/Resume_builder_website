'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  // Function to get the redirect URL
  const getRedirectUrl = () => {
    // Check if there's a redirect query parameter
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const redirectUrl = urlParams.get('redirect');
      if (redirectUrl) {
        return redirectUrl;
      }
      
      // Check referrer for internal navigation
      if (document.referrer && document.referrer.includes(window.location.origin)) {
        return document.referrer;
      }
    }
    
    // Default to dashboard
    return '/dashboard';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token) {
          console.log('Login successful, calling login function...');
          await login(data.token);
          console.log('Login function completed, redirecting to:', getRedirectUrl()+'/dashboard');
          alert('Login successful!');
          // Redirect back to the appropriate URL
          const redirectUrl = getRedirectUrl()+'/dashboard';
          console.log('Attempting to navigate to:', redirectUrl);
          
          // Try router.push first
          router.push(redirectUrl);
          
          // Fallback: if router.push doesn't work, use window.location
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.location.pathname !== redirectUrl) {
              console.log('Fallback navigation to:', redirectUrl);
              window.location.href = redirectUrl;
            }
          }, 500); // Increased timeout for more reliability
        } else {
          alert('Login successful!');
          // Redirect back to the appropriate URL
          const redirectUrl = getRedirectUrl()+'/dashboard';
          router.push(redirectUrl);
          
          // Fallback: if router.push doesn't work, use window.location
          setTimeout(() => {
            if (typeof window !== 'undefined' && window.location.pathname !== redirectUrl) {
              window.location.href = redirectUrl;
            }
          }, 200);
        }
      } else {
        setError(data.error || 'Login failed!');
      }
    } catch (error) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Get the redirect URL
      const redirectUrl = getRedirectUrl()+'/dashboard';
      console.log('Google login initiated, redirect URL:', redirectUrl);
      
      // For Google OAuth, we'll use a direct approach
      // Start the OAuth flow and then navigate directly
      signIn('google', {
        callbackUrl: redirectUrl,
        redirect: false
      }).then((result) => {
        console.log('Google OAuth result:', result);
        
        if (result?.ok) {
          console.log('Google OAuth successful, navigating to dashboard');
          // Navigate directly to dashboard
          window.location.href = redirectUrl;
        } else if (result?.error) {
          console.error('Google OAuth error:', result.error);
          setError('Google login failed. Please try again.');
        }
      }).catch((error) => {
        console.error('Google OAuth error:', error);
        setError('Failed to login with Google');
      });
      
    } catch (error) {
      console.error('Google Login error:', error);
      setError('Failed to login with Google');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome back</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-100 transition disabled:opacity-50"
        >
          <span className="text-2xl mr-2">G</span>
          Continue with Google
        </button>

        <div className="flex items-center justify-center text-gray-400">
          <span className="h-px w-1/5 bg-gray-300" />
          <span className="mx-2 text-sm">Or login with email</span>
          <span className="h-px w-1/5 bg-gray-300" />
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don't have an account?{' '}
          <a href={`/signup?redirect=${encodeURIComponent(getRedirectUrl()+'/dashboard')}`} className="text-blue-600 hover:text-blue-700 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
