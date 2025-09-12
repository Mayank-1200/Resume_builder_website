"use client"

import React, { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence, animate } from "framer-motion"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";
import {
  ArrowRight,
  CheckCircle,
  Download,
  Edit3,
  FileText,
  Globe,
  Target,
  Zap,
  Star,
  Users,
  MessageCircle,
  X,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
} from "lucide-react"
import Image from "next/image";


const typingTexts = ["Software Engineer", "Data Analyst", "Designer", "Marketing Manager", "Product Manager"]



// First Resume Design - Professional
const ProfessionalResume = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [skillProgress, setSkillProgress] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleSections((prev) => [...prev, "header"]), 500)
    const timer2 = setTimeout(() => setVisibleSections((prev) => [...prev, "summary"]), 1000)
    const timer3 = setTimeout(() => setVisibleSections((prev) => [...prev, "experience"]), 1500)
    const timer4 = setTimeout(() => setVisibleSections((prev) => [...prev, "skills"]), 2000)
    const timer5 = setTimeout(() => setVisibleSections((prev) => [...prev, "education"]), 2500)

    const skillTimer = setTimeout(() => {
      setSkillProgress({
        "JavaScript": 90,
        "React": 85,
        "Node.js": 80,
        "TypeScript": 75,
      })
    }, 2200)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
      clearTimeout(skillTimer)
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="p-6 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: visibleSections.includes("skills") ? 1 : 0,
            x: visibleSections.includes("skills") ? 0 : -20,
          }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-brand-navy mb-3 border-b-2 border-brand-accent pb-1">
            Skills
          </h2>
          <div className="space-y-2">
            {Object.entries(skillProgress).map(([skill, progress], index) => (
              <div key={skill}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-700">{skill}</span>
                  <span className="text-[rgb(0,135,158)]">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ delay: index * 0.2, duration: 1, ease: "easeOut" }}
                    className="bg-gradient-to-r from-brand-teal to-brand-accent h-1.5 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{
            opacity: visibleSections.includes("education") ? 1 : 0,
            x: visibleSections.includes("education") ? 0 : -20,
          }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-brand-navy mb-2 border-b-2 border-brand-accent pb-1">
            Education
          </h2>
          <div>
            <h3 className="font-semibold text-sm text-[rgb(0,135,158)]">B.S. Computer Science</h3>
            <p className="text-xs text-gray-500">Stanford University • 2019</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Second Resume Design - Modern Creative
const ModernResume = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [skillProgress, setSkillProgress] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const timer1 = setTimeout(() => setVisibleSections((prev) => [...prev, "header"]), 500)
    const timer2 = setTimeout(() => setVisibleSections((prev) => [...prev, "sidebar"]), 1000)
    const timer3 = setTimeout(() => setVisibleSections((prev) => [...prev, "main"]), 1500)

    const skillTimer = setTimeout(() => {
      setSkillProgress({
        "UI/UX": 95,
        Frontend: 88,
        Backend: 82,
        Mobile: 78,
      })
    }, 1800)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(skillTimer)
    }
  }, [])

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-2xl overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{
            opacity: visibleSections.includes("sidebar") ? 1 : 0,
            x: visibleSections.includes("sidebar") ? 0 : -30,
          }}
          transition={{ duration: 0.8 }}
          className="w-2/5 bg-gradient-to-b from-[rgb(0,48,146)] to-[rgb(0,135,158)] text-white p-4"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: visibleSections.includes("header") ? 1 : 0,
              y: visibleSections.includes("header") ? 0 : -20,
            }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <div className="w-16 h-16 bg-brand-accent rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-[rgb(0,48,146)] font-bold text-lg">MJ</span>
            </div>
            <h1 className="text-lg font-bold">Michael Johnson</h1>
            <p className="text-brand-accent text-sm">Product Designer</p>
          </motion.div>

          <div className="space-y-4">
            <div>
              <h3 className="text-brand-accent font-semibold text-sm mb-2 flex items-center">
                <Mail className="w-3 h-3 mr-2" />
                CONTACT
              </h3>
              <div className="text-xs space-y-1">
                <p>m.johnson@email.com</p>
                <p>+1 (555) 987-6543</p>
                <p>New York, NY</p>
              </div>
            </div>

            <div>
              <h3 className="text-brand-accent font-semibold text-sm mb-2">SKILLS</h3>
              <div className="space-y-2">
                {Object.entries(skillProgress).map(([skill, progress], index) => (
                  <div key={skill}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{skill}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="w-full bg-[rgb(0,48,146)] rounded-full h-1">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ delay: index * 0.3, duration: 1.2, ease: "easeOut" }}
                        className="bg-brand-accent h-1 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{
            opacity: visibleSections.includes("main") ? 1 : 0,
            x: visibleSections.includes("main") ? 0 : 30,
          }}
          transition={{ duration: 0.8 }}
          className="w-3/5 p-4 space-y-4"
        >
          <div>
            <h2 className="text-[rgb(0,48,146)] font-bold text-sm mb-2 flex items-center">
              <Briefcase className="w-3 h-3 mr-2 text-brand-accent" />
              EXPERIENCE
            </h2>
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: visibleSections.includes("main") ? 1 : 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <h3 className="font-semibold text-xs text-[rgb(0,135,158)]">Senior Product Designer</h3>
                <p className="text-xs text-gray-500 mb-1">DesignCo • 2022 - Present</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-brand-accent rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Led design system implementation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="w-1 h-1 bg-brand-accent rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                    <span>Increased user engagement by 60%</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>

          <div>
            <h2 className="text-[rgb(0,48,146)] font-bold text-sm mb-2 flex items-center">
              <GraduationCap className="w-3 h-3 mr-2 text-brand-accent" />
              EDUCATION
            </h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleSections.includes("main") ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="font-semibold text-xs text-[rgb(0,135,158)]">M.A. Design</h3>
              <p className="text-xs text-gray-500">Art Institute • 2020</p>
            </motion.div>
          </div>

          <div>
            <h2 className="text-[rgb(0,48,146)] font-bold text-sm mb-2">ABOUT</h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: visibleSections.includes("main") ? 1 : 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xs text-gray-600 leading-relaxed"
            >
              Creative designer passionate about user-centered design and innovative digital experiences.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

// Main Component with Resume Rotation
const AnimatedResumeRotator = () => {
  const [currentResume, setCurrentResume] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentResume((prev) => (prev + 1) % 2)
    }, 8000) // Switch every 8 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {currentResume === 0 ? (
          <motion.div
            key="professional"
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <ProfessionalResume />
          </motion.div>
        ) : (
          <motion.div
            key="modern"
            initial={{ opacity: 0, rotateY: 90, scale: 0.8 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: -90, scale: 0.8 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          >
            <ModernResume />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Success Indicators */}
      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-3 right-3 bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        <CheckCircle className="w-4 h-4" />
      </motion.div>

      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-3 left-3 bg-brand-accent text-brand-navy p-2 rounded-full shadow-lg"
      >
        <Zap className="w-4 h-4" />
      </motion.div>

      {/* Resume Type Indicator */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentResume === 0 ? "bg-brand-accent" : "bg-gray-300"
            }`}
          />
          <div
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              currentResume === 1 ? "bg-brand-accent" : "bg-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  )
}

// Hero Templates Carousel using real template images
const TemplateImageCarousel = () => {
  const templates = [
    { title: "Modern ATS", src: "/modern-ats.jpg" },
    { title: "Modern Sidebar", src: "/modern-sidebar.jpg" },
    { title: "Minimalist Tech", src: "/minimalist-tech.jpg" },
    { title: "Creative Designer", src: "/creative-designer.jpg" },
    { title: "Classic Executive", src: "/classic-executive.jpg" },
  ]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % templates.length)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  const visible = [
    (index + templates.length - 1) % templates.length,
    index,
    (index + 1) % templates.length,
  ]

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative h-[460px]">
        {templates.map((t, i) => {
          const position = visible.indexOf(i)
          const isCenter = position === 1
          return (
            <motion.div
              key={t.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{
                opacity: isCenter ? 1 : 0.6,
                scale: isCenter ? 1 : 0.9,
                x: position === 0 ? -140 : position === 2 ? 140 : 0,
                zIndex: isCenter ? 30 : position === 0 ? 20 : 10,
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className={`relative h-full rounded-xl shadow-2xl overflow-hidden border ${
                isCenter ? "border-brand-accent/40" : "border-transparent"
              }`}>
                <Image
                  src={t.src}
                  alt={t.title}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 80vw, 460px"
                  priority={i < 2}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
        className="absolute -top-8 -right-8 bg-green-500 text-white p-2 rounded-full shadow-lg"
      >
        <CheckCircle className="w-4 h-4" />
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute -bottom-8 -left-8 bg-brand-accent text-brand-navy p-2 rounded-full shadow-lg"
      >
        <Zap className="w-4 h-4" />
      </motion.div>

      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          {templates.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === index ? "bg-brand-accent" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const { user } = useAuth()
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [isPageReady, setIsPageReady] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -50])

  // Set page as ready after initial render
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (!isPageReady) return;
    
    const currentFullText = typingTexts[currentTextIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, displayText.length - 1))
          } else {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentTextIndex, isPageReady])

  // Show loading state until page is ready
  if (!isPageReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-bg/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[rgb(0,48,146)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[rgb(0,48,146)] text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  const benefits = [
    {
      icon: Target,
      title: "Pre-made Templates",
      description: "Choose from professionally designed templates",
    },
    {
      icon: Edit3,
      title: "Easy Drag-and-Drop Editor",
      description: "Intuitive interface for effortless customization",
    },
    {
      icon: FileText,
      title: "ATS-Friendly Formatting",
      description: "Optimized to pass through applicant tracking systems",
    },
    {
      icon: Download,
      title: "Multiple Download Formats",
      description: "Export as PDF, Word, or other popular formats",
    },
    {
      icon: Globe,
      title: "Cloud Save & Edit Later",
      description: "Access your resumes from anywhere, anytime",
    },
  ]

  const steps = [
    {
      number: "01",
      title: "Choose a Template",
      description: "Select from our collection of professional templates",
    },
    {
      number: "02",
      title: "Fill in Your Details",
      description: "Add your information with our intuitive editor",
    },
    {
      number: "03",
      title: "Customize & Perfect",
      description: "Fine-tune colors, fonts, and layout to match your style",
    },
    {
      number: "04",
      title: "Download and Apply",
      description: "Export your resume and start applying to jobs",
    },
  ]

  const sampleResumes = [
    { title: "Modern ATS", category: "Modern", image: "/modern-ats.jpg" },
    { title: "Modern Sidebar", category: "Modern", image: "/modern-sidebar.jpg" },
    { title: "Minimalist Tech", category: "Minimal", image: "/minimalist-tech.jpg" },
    { title: "Creative Designer", category: "Creative", image: "/creative-designer.jpg" },
    { title: "Classic Executive", category: "Classic", image: "/classic-executive.jpg" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-brand-bg/30">
  {/* Header removed: now handled globally by Navbar component */}

      {/* Hero Section */}
      <section className="relative overflow-hidden py-10 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 pt-2 lg:pt-6"
            >
              <div className="space-y-4">
                <Badge className="bg-brand-bg text-brand-navy hover:bg-brand-bg border border-brand-accent">
                  ✨ Create Professional Resumes in Minutes
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-[rgb(0,48,146)] leading-tight">
                  Land Your Dream Job with a <span className="text-[rgb(0,135,158)]">Perfect Resume</span>
                </h1>
                <div className="text-xl text-gray-600 h-8">
                  Resume for{" "}
                  <span className="text-[rgb(0,135,158)] font-semibold">
                    {displayText}
                    <span className="animate-pulse">|</span>
                  </span>
                </div>
                <p className="text-lg text-gray-600 max-w-lg">
                  Create stunning, ATS-friendly resumes with our intuitive drag-and-drop editor. Choose from
                  professional templates and land more interviews.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {user ? (
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-navy to-brand-teal hover:from-brand-teal hover:to-brand-accent text-lg px-8 py-6"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-navy to-brand-teal hover:from-brand-teal hover:to-brand-accent text-lg px-8 py-6"
                    >
                      Create My Resume
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                )}
                <Link href="/templates">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-6 border-brand-accent text-brand-teal hover:bg-brand-bg/50 bg-transparent"
                  >
                    View Templates
                  </Button>
                </Link>
              </div>

            </motion.div>

            <motion.div
              style={{ y }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative pt-0"
            >
              <TemplateImageCarousel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(0,48,146)] mb-4">Why Choose Our Resume Builder?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to create a professional resume that gets you hired
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-brand-accent/20">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-brand-accent/20 to-brand-bg/50 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-6 h-6 text-[rgb(0,135,158)]" />
                      </div>
                      <h3 className="text-xl font-semibold text-[rgb(0,48,146)]">{benefit.title}</h3>
                    </div>
                    <p className="text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Resume Preview */}
      <section className="py-20 bg-gradient-to-b from-brand-bg to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(0,48,146)] mb-4">
              Professional Templates for Every Industry
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from our collection of expertly designed templates
            </p>
            <div className="h-1 w-16 bg-gradient-to-r from-brand-accent to-brand-teal rounded-full mx-auto mt-4" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleResumes.slice(0, 4).map((resume, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="cursor-pointer"
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-brand-accent/20">
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <Image
                      src={resume.image || "/placeholder.svg"}
                      alt={resume.title}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 25vw"
                      priority={index < 2}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2 bg-brand-bg text-brand-navy">
                      {resume.category}
                    </Badge>
                    <h3 className="font-semibold text-[rgb(0,48,146)]">{resume.title}</h3>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[rgb(0,48,146)] mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Create your professional resume in just 4 simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-brand-accent/30 -translate-y-0.5" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-[rgb(0,48,146)] mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Callout */}
      <section className="py-20 bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Start Building Your Resume Today</h2>
            <p className="text-xl mb-8 opacity-90">Get started with our free plan or unlock premium features</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-brand-accent text-brand-navy hover:bg-brand-bg"
                  >
                    Go to Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-brand-accent text-brand-navy hover:bg-brand-bg"
                  >
                    Start Free
                  </Button>
                </Link>
              )}
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-[rgb(0,48,146)] bg-transparent"
              >
                View Pricing
              </Button>
            </div>
            <p className="text-sm mt-4 opacity-75">Free plan includes 2 templates • No credit card required</p>
          </motion.div>
        </div>
      </section>



      {/* Chat Support Bubble */}
      <div className="fixed bottom-6 right-6 z-50">
        {showChat ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col"
          >
            <div className="bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)] text-white p-4 rounded-t-lg flex items-center justify-between">
              <h3 className="font-semibold">Chat Support</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-[rgb(0,135,158)] p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex-1 p-4 bg-gray-50">
              <div className="bg-white p-3 rounded-lg shadow-sm">
                <p className="text-sm text-gray-600">Hi! How can I help you create the perfect resume today?</p>
              </div>
            </div>
            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-lg text-sm"
                />
                <Button size="sm" className="bg-gradient-to-r from-[rgb(0,48,146)] to-[rgb(0,135,158)]">
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowChat(true)}
            className="bg-gradient-to-r from-brand-navy to-brand-teal hover:from-brand-teal hover:to-brand-accent text-white p-4 rounded-full shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </motion.button>
        )}
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}
