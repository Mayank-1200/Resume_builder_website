'use client'

import { useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Sparkles, Clock, Plus, Upload, LayoutGrid, ArrowRight, BarChart2, FileText } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: any
  label: string
  value: string
  color: string
}) {
  return (
    <Card className="border-amber-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
      <CardContent className="p-5 flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color} shadow-sm`}>
          <Icon className="w-5 h-5 text-slate-800" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-slate-500 font-medium">{label}</p>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function RingStat({ label, value }: { label: string; value: number }) {
  const deg = Math.round((value / 100) * 360)
  return (
    <Card className="border-amber-200">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full grid place-items-center"
          style={{ background: `conic-gradient(rgb(13,148,136) ${deg}deg, rgba(13,148,136,0.15) ${deg}deg)` }}
        >
          <div className="w-12 h-12 rounded-full bg-white grid place-items-center text-slate-800 text-sm font-semibold">
            {value}%
          </div>
        </div>
        <div>
          <p className="text-sm text-slate-500">{label}</p>
          <p className="text-lg font-semibold text-slate-800">Great progress</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default function DashboardPage() {
  const router = useRouter()
  const { user, isLoading, isHydrated } = useAuth()

  // Updated dataset: removed views and downloads
  const recentResumes = useMemo(
    () => [
      {
        id: "r1",
        title: "Software Engineer – Modern Professional",
        updatedAt: "2h ago",
        status: "Draft",
        preview: "/placeholder.svg",
      },
      {
        id: "r2",
        title: "Product Designer – Creative",
        updatedAt: "1d ago",
        status: "Ready",
        preview: "/placeholder.svg",
      },
      {
        id: "r3",
        title: "Data Analyst – Classic Executive",
        updatedAt: "3d ago",
        status: "Draft",
        preview: "/placeholder.svg",
      },
    ],
    [],
  )

  useEffect(() => {
    if (!isHydrated) {
      return;
    }
    
    if (isLoading) {
      return;
    }
    
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent("/dashboard")}`);
    }
  }, [isLoading, user, router, isHydrated])

  if (isLoading || !isHydrated) {
    return (
      <div className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-slate-800 font-medium">Preparing your dashboard…</p>
        </div>
      </div>
    )
  }
  if (!user) return null

  const firstName = user.firstName || user.name || "There"

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50/50">
      {/* Hero */}
      <section className="container mx-auto px-4 py-8 lg:py-12">
        {/* Welcome Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-blue-100 text-slate-700 text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Welcome back, {firstName}!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Ready to build something amazing?
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Your resume journey continues here. Let's make your next career move count.
          </p>
        </div>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 max-w-3xl mx-auto">
          {/* Create New Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <Plus className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Start Fresh</h3>
              <p className="text-emerald-100 mb-5 text-base leading-relaxed">Create a new resume from scratch with our professional templates and step-by-step guidance</p>
              <Button 
                onClick={() => router.push('/create-resume')}
                className="w-full bg-white text-emerald-600 hover:bg-emerald-50 text-base py-2.5 font-semibold"
              >
                Create Resume
              </Button>
            </div>
          </div>

          {/* Import Card */}
          <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-6 text-white hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-5">
                <Upload className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Import Existing</h3>
              <p className="text-purple-100 mb-5 text-base leading-relaxed">Bring your existing resume and enhance it with our powerful editing tools and templates</p>
              <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 text-base py-2.5 font-semibold">
                Import PDF
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Continue banner */}
      <section className="container mx-auto px-4">
        <div className="mb-8 rounded-xl bg-gradient-to-r from-slate-800 to-teal-700 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5" />
            <div>
              <p className="font-semibold">Continue where you left off</p>
              <p className="text-sm opacity-90">Product Designer – Creative • last edited 1 day ago</p>
            </div>
          </div>
          <Button 
            onClick={() => router.push('/create-resume')}
            variant="secondary" 
            className="bg-white text-slate-800 hover:bg-amber-50"
          >
            Resume Editor
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* Main grid */}
      <section className="container mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent resumes */}
        <div className="lg:col-span-2">
          <Card className="border-amber-200 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Recent resumes</h2>
                <Button variant="ghost" className="hover:text-teal-700">
                  View all
                </Button>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {recentResumes.map((r, idx) => (
                  <div
                    key={r.id}
                    className="rounded-xl border border-amber-200 overflow-hidden bg-white hover:shadow-lg hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={r.preview || "/placeholder.svg"}
                        alt={r.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                        priority={idx === 0}
                      />
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-medium text-slate-800 line-clamp-2 group-hover:text-teal-700 transition-colors duration-200">{r.title}</h3>
                        <Badge
                          className={`px-2 py-1 text-xs font-medium ${
                            r.status === "Ready" 
                              ? "bg-emerald-100 text-emerald-700 border border-emerald-200" 
                              : "bg-amber-100 text-amber-700 border border-amber-200"
                          }`}
                        >
                          {r.status}
                        </Badge>
                      </div>
                      {/* Enhanced timestamp with better styling */}
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>Updated {r.updatedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => router.push('/create-resume')}
                          size="sm" 
                          className="bg-slate-800 hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-300 hover:bg-amber-50 hover:border-amber-400 bg-transparent transition-all duration-200"
                        >
                          Export
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced sidebar */}
        <div className="space-y-6">
          {/* Tip of the day */}
          <Card className="border-amber-200 hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <BarChart2 className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-semibold text-slate-800">Tip of the day</h3>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                Lead bullets with strong action verbs and measurable outcomes. E.g., {"Increased conversion by 18% by"}
                {" redesigning checkout flow."}
              </p>
            </CardContent>
          </Card>

          {/* (Smart Suggestions removed) */}
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}
