"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, isLoading, isHydrated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to get current URL safely
  const getCurrentUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '/';
  };

  // Don't render anything until mounted and hydrated to prevent hydration issues
  if (!mounted || !isHydrated) {
    return (
      <nav className="flex items-center justify-between py-4 px-8 bg-white shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="text-2xl font-bold text-[rgb(0,48,146)]">Resume Builder</div>
          <div className="text-gray-600">About</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-20 h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white shadow-sm">
      <div className="flex items-center space-x-8">
        <Link href="/" className="text-2xl font-bold text-[rgb(0,48,146)]">
          Resume Builder
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
          About
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
              Dashboard
            </Link>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <User className="w-5 h-5 text-[rgb(0,48,146)]" />
              <span className="text-sm text-[rgb(0,48,146)]">
                {user.firstName || user.name || user.email}
              </span>
            </div>
            <Button variant="outline" onClick={logout} className="hover:text-[rgb(0,135,158)]">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href={`/login?redirect=${encodeURIComponent(getCurrentUrl())}`}>
              <Button variant="ghost" className="hover:text-[rgb(0,135,158)]">
                Login
              </Button>
            </Link>
            <Link href={`/signup?redirect=${encodeURIComponent(getCurrentUrl())}`}>
              <Button className="bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] hover:from-[rgb(0,135,158)] hover:to-[rgb(255,171,91)]">
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
