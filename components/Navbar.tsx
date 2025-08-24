"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { User } from "lucide-react";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("jwt_token");
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUserEmail(decoded.email || null);
      } catch {
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwt_token");
    setIsLoggedIn(false);
    setUserEmail(null);
    window.location.reload();
  };

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <nav className="flex items-center justify-between py-4 px-8 bg-white shadow">
      <Link href="/" className="flex items-center space-x-2">
        <span className="text-xl font-bold text-[rgb(0,48,146)]">ResumeBuilder</span>
      </Link>
      <div className="hidden md:flex items-center space-x-6 flex-1 justify-center">
        <Link href="/templates" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
          Templates
        </Link>
        <Link href="/pricing" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
          Pricing
        </Link>
        <Link href="/resources" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
          Resources
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
          About
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {isLoggedIn && userEmail ? (
          <>
            <Link href="/dashboard" className="text-gray-600 hover:text-[rgb(0,135,158)] transition-colors">
              Dashboard
            </Link>
            <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-full">
              <User className="w-5 h-5 text-[rgb(0,48,146)]" />
              <span className="text-sm text-[rgb(0,48,146)]">{userEmail}</span>
            </div>
            <Button variant="outline" onClick={logout} className="hover:text-[rgb(0,135,158)]">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link href="/login">
              <Button variant="ghost" className="hover:text-[rgb(0,135,158)]">
                Login
              </Button>
            </Link>
            <Link href="/signup">
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
