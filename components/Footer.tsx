import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileText, Github, Linkedin, Mail, Twitter, Globe } from "lucide-react"

export default function SiteFooter() {
  return (
    <footer className="bg-brand-navy text-white">
      {/* Pre-footer CTA */}
      <div className="container mx-auto px-4">
        <div className="relative -translate-y-6">
          <div className="rounded-2xl bg-gradient-to-r from-brand-navy to-brand-teal p-6 sm:p-8 shadow-xl">
            <div className="grid gap-6 md:grid-cols-[1.2fr,1fr] md:items-center">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-wide text-brand-bg/80">Level up your job search</p>
                <h3 className="text-2xl sm:text-3xl font-bold">Get pro tips and resume templates in your inbox</h3>
                <p className="text-brand-bg/80">One email a week. No spam. Unsubscribe anytime.</p>
              </div>
              <form className="flex flex-col sm:flex-row gap-3" noValidate>
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <Input
                  id="newsletter-email"
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white text-brand-navy placeholder:text-brand-navy/60"
                  aria-label="Email address"
                />
                <Button type="submit" className="bg-brand-accent text-brand-navy hover:bg-brand-bg">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 pt-0 pb-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-brand-teal to-brand-accent flex items-center justify-center">
                <FileText className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <span className="text-xl font-bold">ResumeBuilder</span>
            </div>
            <p className="text-brand-bg/80">
              Create ATS-friendly resumes that help you land interviews faster.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Visit us on Twitter"
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Visit us on LinkedIn"
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Visit our GitHub"
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-label="Email support"
                className="rounded-full p-2 bg-white/10 hover:bg-white/20 transition-colors"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Product */}
          <nav aria-labelledby="footer-product" className="space-y-3">
            <h4 id="footer-product" className="text-sm font-semibold tracking-wide">
              Product
            </h4>
            <ul className="space-y-2 text-brand-bg/90">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Create Resume
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Resume Templates
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Resume Designs
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a className="hover:underline underline-offset-4" href="#">
                  Cover Letter
                </a>
                <Badge className="bg-brand-accent text-brand-navy hover:bg-brand-accent">Soon</Badge>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  ATS Check
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-labelledby="footer-resources" className="space-y-3">
            <h4 id="footer-resources" className="text-sm font-semibold tracking-wide">
              Resources
            </h4>
            <ul className="space-y-2 text-brand-bg/90">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Resume Examples
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Guides
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Tips & Tricks
                </a>
              </li>
            </ul>
          </nav>

          {/* Support */}
          <nav aria-labelledby="footer-support" className="space-y-3">
            <h4 id="footer-support" className="text-sm font-semibold tracking-wide">
              Support
            </h4>
            <ul className="space-y-2 text-brand-bg/90">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Terms & Services
                </a>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-labelledby="footer-company" className="space-y-3">
            <h4 id="footer-company" className="text-sm font-semibold tracking-wide">
              Company
            </h4>
            <ul className="space-y-2 text-brand-bg/90">
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="hover:underline underline-offset-4" href="#">
                  Press
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-brand-bg/80">
            © {new Date().getFullYear()} ResumeBuilder. All rights reserved.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="flex items-center gap-4 text-sm text-brand-bg/90">
              <a href="#" className="hover:underline underline-offset-4">
                Privacy Policy
              </a>
              <span className="opacity-40">•</span>
              <a href="#" className="hover:underline underline-offset-4">
                Terms of Service
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 opacity-80" aria-hidden="true" />
              <label htmlFor="language" className="sr-only">
                Language
              </label>
              <select
                id="language"
                className="bg-white/10 border border-white/20 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                defaultValue="en"
                aria-label="Select language"
              >
                <option className="text-black" value="en">
                  English
                </option>
                <option className="text-black" value="es">
                  Español
                </option>
                <option className="text-black" value="fr">
                  Français
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
