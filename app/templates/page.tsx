"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

type TemplateCard = { title: string; src: string; category: string }
const templates: TemplateCard[] = [
  { title: "Modern ATS", src: "/modern-ats.jpg", category: "Modern" },
  { title: "Modern Sidebar", src: "/modern-sidebar.jpg", category: "Modern" },
  { title: "Minimalist Tech", src: "/minimalist-tech.jpg", category: "Minimal" },
  { title: "Creative Designer", src: "/creative-designer.jpg", category: "Creative" },
  { title: "Classic Executive", src: "/classic-executive.jpg", category: "Classic" },
]

export default function TemplatesGalleryPage() {
  const [active, setActive] = useState<TemplateCard | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = useMemo(() => ["All", ...Array.from(new Set(templates.map((t) => t.category)))], [])
  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesQuery = t.title.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCat = selectedCategory === "All" || t.category === selectedCategory
      return matchesQuery && matchesCat
    })
  }, [searchQuery, selectedCategory])

  return (
    <section className="min-h-screen bg-gradient-to-b from-brand-bg to-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[rgb(0,48,146)]">Browse Templates</h1>
            <p className="text-gray-600 mt-2 max-w-2xl">Explore professionally designed, ATS-friendly resume templates. Click any card to view an enlarged preview.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <div className="relative flex-1 min-w-[240px]">
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white"
              />
            </div>
            <div className="relative w-[120px]">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[120px] h-8 pr-9 text-xs">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="text-sm text-gray-500 mb-4">Showing {filtered.length} of {templates.length} templates</div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((t) => (
            <Dialog key={t.src} onOpenChange={(open) => !open && setActive(null)}>
              <DialogTrigger asChild>
                <button
                  type="button"
                  onClick={() => setActive(t)}
                  className="text-left"
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-brand-accent/20">
                    <div className="aspect-[3/4] relative">
                      <Image
                        src={t.src}
                        alt={t.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                        priority={false}
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-[rgb(0,48,146)]">{t.title}</h3>
                        <Badge variant="secondary" className="bg-brand-bg text-brand-navy">{t.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </button>
              </DialogTrigger>

              <DialogContent hideClose className="max-w-3xl p-0 bg-transparent border-0 shadow-none">
                {active && (
                  <DialogTitle className="sr-only">{active.title}</DialogTitle>
                )}
                {active && (
                  <div className="relative w-full h-[75vh]">
                    <Image
                      src={active.src}
                      alt={active.title}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </div>
                )}
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
