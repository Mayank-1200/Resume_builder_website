"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SiteNavbar from "@/components/site-navbar"
import SiteFooter from "@/components/site-footer"
import { Search, Eye, Download, Star, Users, ArrowRight, CheckCircle } from "lucide-react"

// Mock template data
const templates = [
  {
    id: 1,
    name: "Modern Professional",
    category: "Modern",
    industry: "Technology",
    difficulty: "Easy",
    rating: 4.9,
    downloads: 12500,
    isPremium: false,
    tags: ["Clean", "ATS-Friendly", "Tech"],
    description: "A clean, modern design perfect for tech professionals and software engineers.",
    features: ["ATS-Optimized", "Single Page", "Skills Section", "Contact Icons"],
    preview: "/placeholder.svg?height=600&width=450&text=Modern+Professional+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Modern+Professional",
  },
  {
    id: 2,
    name: "Executive Classic",
    category: "Classic",
    industry: "Business",
    difficulty: "Medium",
    rating: 4.8,
    downloads: 8900,
    isPremium: true,
    tags: ["Professional", "Executive", "Traditional"],
    description: "Traditional design ideal for senior executives and business professionals.",
    features: ["Two-Column Layout", "Professional Summary", "Achievement Focus", "References Section"],
    preview: "/placeholder.svg?height=600&width=450&text=Executive+Classic+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Executive+Classic",
  },
  {
    id: 3,
    name: "Creative Designer",
    category: "Creative",
    industry: "Design",
    difficulty: "Advanced",
    rating: 4.7,
    downloads: 6200,
    isPremium: true,
    tags: ["Creative", "Portfolio", "Visual"],
    description: "Eye-catching design perfect for designers, artists, and creative professionals.",
    features: ["Portfolio Section", "Color Accents", "Visual Elements", "Project Showcase"],
    preview: "/placeholder.svg?height=600&width=450&text=Creative+Designer+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Creative+Designer",
  },
  {
    id: 4,
    name: "Minimalist Pro",
    category: "Minimalist",
    industry: "General",
    difficulty: "Easy",
    rating: 4.9,
    downloads: 15600,
    isPremium: false,
    tags: ["Simple", "Clean", "Versatile"],
    description: "Simple, elegant design that works for any industry or experience level.",
    features: ["Minimal Design", "Easy to Edit", "Universal Appeal", "Space Efficient"],
    preview: "/placeholder.svg?height=600&width=450&text=Minimalist+Pro+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Minimalist+Pro",
  },
  {
    id: 5,
    name: "Tech Specialist",
    category: "Modern",
    industry: "Technology",
    difficulty: "Medium",
    rating: 4.8,
    downloads: 9800,
    isPremium: false,
    tags: ["Technical", "Skills-Focused", "Modern"],
    description: "Designed specifically for software developers and technical professionals.",
    features: ["Technical Skills Grid", "Project Timeline", "GitHub Integration", "Code Snippets"],
    preview: "/placeholder.svg?height=600&width=450&text=Tech+Specialist+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Tech+Specialist",
  },
  {
    id: 6,
    name: "Healthcare Professional",
    category: "Professional",
    industry: "Healthcare",
    difficulty: "Medium",
    rating: 4.6,
    downloads: 4300,
    isPremium: true,
    tags: ["Medical", "Professional", "Detailed"],
    description: "Professional template tailored for healthcare workers and medical professionals.",
    features: ["Certifications Section", "Medical Experience", "Patient Care Focus", "References"],
    preview: "/placeholder.svg?height=600&width=450&text=Healthcare+Professional+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Healthcare+Professional",
  },
  {
    id: 7,
    name: "Marketing Maven",
    category: "Creative",
    industry: "Marketing",
    difficulty: "Medium",
    rating: 4.7,
    downloads: 7100,
    isPremium: false,
    tags: ["Marketing", "Results-Driven", "Visual"],
    description: "Perfect for marketing professionals who want to showcase their campaign results.",
    features: ["Campaign Results", "Social Media Links", "Brand Colors", "Metrics Display"],
    preview: "/placeholder.svg?height=600&width=450&text=Marketing+Maven+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Marketing+Maven",
  },
  {
    id: 8,
    name: "Academic Scholar",
    category: "Academic",
    industry: "Education",
    difficulty: "Advanced",
    rating: 4.5,
    downloads: 3200,
    isPremium: true,
    tags: ["Academic", "Research", "Publications"],
    description: "Comprehensive template for academics, researchers, and PhD candidates.",
    features: ["Publications List", "Research Experience", "Conference Presentations", "Grants & Awards"],
    preview: "/placeholder.svg?height=600&width=450&text=Academic+Scholar+Resume",
    thumbnail: "/placeholder.svg?height=400&width=300&text=Academic+Scholar",
  },
]

const categories = ["All", "Modern", "Classic", "Creative", "Minimalist", "Professional", "Academic"]
const industries = ["All", "Technology", "Business", "Design", "Healthcare", "Marketing", "Education", "General"]
const difficulties = ["All", "Easy", "Medium", "Advanced"]

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showPremiumOnly, setShowPremiumOnly] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[0] | null>(null)
  const [sortBy, setSortBy] = useState("popular")

  // Filter and sort templates
  const filteredTemplates = useMemo(() => {
    const filtered = templates.filter((template) => {
      const matchesCategory = selectedCategory === "All" || template.category === selectedCategory
      const matchesIndustry = selectedIndustry === "All" || template.industry === selectedIndustry
      const matchesDifficulty = selectedDifficulty === "All" || template.difficulty === selectedDifficulty
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesPremium = !showPremiumOnly || template.isPremium

      return matchesCategory && matchesIndustry && matchesDifficulty && matchesSearch && matchesPremium
    })

    // Sort templates
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.downloads - a.downloads)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
    }

    return filtered
  }, [selectedCategory, selectedIndustry, selectedDifficulty, searchQuery, showPremiumOnly, sortBy])

  const clearFilters = () => {
    setSelectedCategory("All")
    setSelectedIndustry("All")
    setSelectedDifficulty("All")
    setSearchQuery("")
    setShowPremiumOnly(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-[rgb(255,242,219)]/30">
      <SiteNavbar />

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Choose Your Perfect Resume Template</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
              Browse our collection of professionally designed, ATS-friendly resume templates. Find the perfect style
              for your industry and experience level.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[rgb(255,171,91)]" />
                <span>50+ Templates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[rgb(255,171,91)]" />
                <span>ATS-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[rgb(255,171,91)]" />
                <span>Easy to Customize</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Difficulty" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={clearFilters}
                className="text-[rgb(0,135,158)] border-[rgb(255,171,91)] bg-transparent"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Filter Summary */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredTemplates.length} of {templates.length} templates
            </p>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="premium-only"
                checked={showPremiumOnly}
                onChange={(e) => setShowPremiumOnly(e.target.checked)}
                className="rounded border-gray-300"
              />
              <label htmlFor="premium-only" className="text-sm text-gray-600">
                Premium only
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatePresence>
            <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 border-[rgb(255,171,91)]/20 overflow-hidden">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <img
                        src={template.thumbnail || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setSelectedTemplate(template)}
                            className="bg-white/90 hover:bg-white"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button size="sm" className="bg-[rgb(0,48,146)] hover:bg-[rgb(0,135,158)]">
                            Use Template
                          </Button>
                        </div>
                      </div>

                      {/* Premium Badge */}
                      {template.isPremium && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-[rgb(255,171,91)] text-[rgb(0,48,146)] hover:bg-[rgb(255,171,91)]">
                            Premium
                          </Badge>
                        </div>
                      )}

                      {/* Difficulty Badge */}
                      <div className="absolute top-3 left-3">
                        <Badge
                          variant="secondary"
                          className={`${
                            template.difficulty === "Easy"
                              ? "bg-green-100 text-green-800"
                              : template.difficulty === "Medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {template.difficulty}
                        </Badge>
                      </div>
                    </div>

                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-[rgb(0,48,146)] mb-1">{template.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{template.description}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{template.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            <span>{template.downloads.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {template.tags.slice(0, 2).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs border-[rgb(255,171,91)]/50 text-[rgb(0,135,158)]"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {template.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{template.tags.length - 2}
                            </Badge>
                          )}
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedTemplate(template)}
                            className="flex-1 border-[rgb(255,171,91)] text-[rgb(0,135,158)] hover:bg-[rgb(255,242,219)]/50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] hover:from-[rgb(0,135,158)] hover:to-[rgb(255,171,91)]"
                          >
                            Use Template
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredTemplates.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
              <div className="w-16 h-16 bg-[rgb(255,242,219)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[rgb(0,135,158)]" />
              </div>
              <h3 className="text-xl font-semibold text-[rgb(0,48,146)] mb-2">No templates found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <Button onClick={clearFilters} variant="outline">
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Template Preview Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
          {selectedTemplate && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Preview */}
              <div className="space-y-4">
                <DialogHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <DialogTitle className="text-xl text-[rgb(0,48,146)]">{selectedTemplate.name}</DialogTitle>
                      <DialogDescription className="text-gray-600">
                        {selectedTemplate.category} • {selectedTemplate.industry}
                      </DialogDescription>
                    </div>
                    {selectedTemplate.isPremium && (
                      <Badge className="bg-[rgb(255,171,91)] text-[rgb(0,48,146)]">Premium</Badge>
                    )}
                  </div>
                </DialogHeader>

                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={selectedTemplate.preview || "/placeholder.svg"}
                    alt={selectedTemplate.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-[rgb(0,48,146)] mb-2">Description</h4>
                  <p className="text-gray-600">{selectedTemplate.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-[rgb(0,48,146)] mb-2">Features</h4>
                  <ul className="space-y-1">
                    {selectedTemplate.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-[rgb(0,48,146)] mb-1">Rating</h4>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{selectedTemplate.rating}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[rgb(0,48,146)] mb-1">Downloads</h4>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{selectedTemplate.downloads.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[rgb(0,48,146)] mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-[rgb(255,171,91)]/50 text-[rgb(0,135,158)]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button className="flex-1 bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] hover:from-[rgb(0,135,158)] hover:to-[rgb(255,171,91)]">
                    Use This Template
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[rgb(255,171,91)] text-[rgb(0,135,158)] hover:bg-[rgb(255,242,219)]/50 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <SiteFooter />
    </div>
  )
}
