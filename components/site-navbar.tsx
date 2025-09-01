"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Menu, X } from "lucide-react"

const links = [
  { href: "/resume", label: "Resume" },
  { href: "/resources", label: "Resources" },
  { href: "/pricing", label: "Pricing" },
]

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <>
      {links.map((l) => {
        const isActive = pathname === l.href
        return (
          <Link
            key={l.href}
            href={l.href}
            onClick={onNavigate}
            className={`text-sm font-medium transition-colors ${
              isActive ? "text-[rgb(0,48,146)]" : "text-gray-600 hover:text-[rgb(0,135,158)]"
            }`}
          >
            {l.label}
          </Link>
        )
      })}
    </>
  )
}

export default function SiteNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 6)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-shadow ${
        scrolled ? "shadow-sm" : "shadow-none"
      } bg-white/80 backdrop-blur-md`}
      role="banner"
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 bg-white text-[rgb(0,48,146)] px-3 py-2 rounded-md border"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4 py-3">
        <nav aria-label="Primary" className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] grid place-items-center">
                <FileText className="w-5 h-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-lg font-bold text-[rgb(0,48,146)]">ResumeBuilder</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <NavLinks />
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium text-[rgb(0,135,158)] hover:text-[rgb(0,48,146)]">
              Login
            </Link>
            <Link href="/signup" aria-label="Sign up">
              <Button className="bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] hover:from-[rgb(0,135,158)] hover:to-[rgb(255,171,91)]">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  )
}

function MobileMenu() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open menu"
          className="text-[rgb(0,48,146)] hover:text-[rgb(0,135,158)]"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 gap-0 max-w-sm w-[92vw] rounded-xl overflow-hidden" aria-label="Mobile navigation">
        <div className="bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] text-white px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center">
              <FileText className="w-5 h-5 text-white" aria-hidden="true" />
            </div>
            <DialogHeader className="p-0">
              <DialogTitle className="text-white text-base">ResumeBuilder</DialogTitle>
              <DialogDescription className="text-white/80 text-xs">Build job-winning resumes</DialogDescription>
            </DialogHeader>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 py-4 space-y-6">
          <div className="flex flex-col gap-3">
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex gap-3">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 text-center rounded-md border border-[rgb(255,171,91)] text-[rgb(0,135,158)] px-3 py-2 text-sm font-medium hover:bg-[rgb(255,242,219)]/60"
            >
              Login
            </Link>
            <Link href="/signup" onClick={() => setOpen(false)} className="flex-1">
              <Button className="w-full bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] hover:from-[rgb(0,135,158)] hover:to-[rgb(255,171,91)]">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
