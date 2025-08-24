import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="w-full bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resume Builder</h3>
            <p className="text-sm">
              Create professional resumes with our easy-to-use builder. Stand out from the crowd
              and land your dream job.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/templates" className="text-sm hover:text-accent transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm hover:text-accent transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@resumebuilder.com</li>
              <li>Phone: (555) 123-4567</li>
              <li>Location: New York, NY</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Resume Builder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
