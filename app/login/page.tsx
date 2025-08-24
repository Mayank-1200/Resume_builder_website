'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('jwt_token', data.token);
        }
  alert('Login successful!');
  window.location.href = '/';
      } else {
        const data = await res.json();
        alert(data.error || 'Login failed!');
      }
    } catch (error) {
      alert('An error occurred!');
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google Login Triggered');
    // Handle Google OAuth login here
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white shadow-2xl rounded-3xl p-10 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">Welcome back</h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          <FcGoogle className="text-2xl mr-2" />
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
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
