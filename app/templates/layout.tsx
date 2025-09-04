import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume Templates | ResumeBuilder",
  description:
    "Browse our collection of professional, ATS-friendly resume templates. Find the perfect design for your industry and experience level.",
}

export default function TemplatesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
