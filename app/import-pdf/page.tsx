"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import * as pdfjs from "pdfjs-dist/legacy/build/pdf"
import { FileUp, Loader2, RefreshCw, Trash2, CheckCircle2, AlertTriangle, FileText, UploadCloud } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

type ParsedResume = {
  name?: string
  email?: string
  phone?: string
  location?: string
  links?: {
    linkedin?: string
    github?: string
    portfolio?: string
  }
  summary?: string
  skills?: string[]
  experienceRaw?: string
  educationRaw?: string
  rawText?: string
}

const MAX_PAGES = 10 // Safety limit for very long PDFs

export default function ImportPdfPage() {
  const router = useRouter()
  const [file, setFile] = React.useState<File | null>(null)
  const [objectUrl, setObjectUrl] = React.useState<string | null>(null)
  const [isParsing, setIsParsing] = React.useState(false)
  const [progress, setProgress] = React.useState(0) // 0 - 100 approximate
  const [error, setError] = React.useState<string | null>(null)
  const [rawText, setRawText] = React.useState("")
  const [parsed, setParsed] = React.useState<ParsedResume>({
    name: "",
    email: "",
    phone: "",
    location: "",
    links: { linkedin: "", github: "", portfolio: "" },
    summary: "",
    skills: [],
    experienceRaw: "",
    educationRaw: "",
    rawText: "",
  })

  React.useEffect(() => {
    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [objectUrl])

  function onFileChange(f: File | null) {
    setError(null)
    setRawText("")
    setParsed({
      name: "",
      email: "",
      phone: "",
      location: "",
      links: { linkedin: "", github: "", portfolio: "" },
      summary: "",
      skills: [],
      experienceRaw: "",
      educationRaw: "",
      rawText: "",
    })
    setProgress(0)
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl)
      setObjectUrl(null)
    }
    setFile(f)
    if (f) setObjectUrl(URL.createObjectURL(f))
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    const f = e.dataTransfer.files?.[0]
    if (f && f.type === "application/pdf") {
      onFileChange(f)
    } else if (f) {
      setError("Please drop a PDF file.")
    }
  }

  function preventDefaults(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  async function parsePdf() {
    try {
      if (!file) return
      setIsParsing(true)
      setError(null)
      setProgress(5)

      const arrayBuffer = await file.arrayBuffer()
      setProgress(10)

      // Use legacy build with disableWorker to simplify setup in browser
      const doc = await pdfjs.getDocument({ data: arrayBuffer, disableWorker: true }).promise
      const totalPages = Math.min(doc.numPages, MAX_PAGES)
      let text = ""
      for (let i = 1; i <= totalPages; i++) {
        const page = await doc.getPage(i)
        const content = await page.getTextContent()
        const strings = content.items.map((item: any) => String(item.str))
        text += strings.join("\n") + "\n"
        setProgress(10 + Math.round((i / totalPages) * 80)) // up to ~90
      }

      setRawText(text.trim())
      const result = parseResumeText(text)
      setParsed({
        ...result,
        rawText: text.trim(),
      })
      setProgress(100)
    } catch (err: any) {
      console.error(err)
      setError("Failed to read this PDF. Please try another file or ensure it is text-based (not scanned).")
    } finally {
      setIsParsing(false)
      setTimeout(() => setProgress(0), 1200)
    }
  }

  function reDetect() {
    if (!rawText) return
    setParsed({
      ...parseResumeText(rawText),
      rawText,
    })
  }

  function clearAll() {
    onFileChange(null)
  }

  function handleSaveAndContinue() {
    try {
      const payload = {
        ...parsed,
        rawText,
        source: "pdf",
        importedAt: new Date().toISOString(),
      }
      localStorage.setItem("importedResume", JSON.stringify(payload))
      router.push("/create-resume?import=1")
    } catch (e) {
      console.error(e)
      setError("Could not persist imported data locally.")
    }
  }

  const skillChips = (parsed.skills ?? []).filter(Boolean)

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <FileUp className="size-6 text-foreground" />
          <h1 className="text-2xl font-semibold tracking-tight">Import from PDF</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={reDetect} disabled={!rawText || isParsing}>
            <RefreshCw className="mr-2 size-4" />
            Re-run detection
          </Button>
          <Button variant="destructive" onClick={clearAll} disabled={isParsing && !file}>
            <Trash2 className="mr-2 size-4" />
            Clear
          </Button>
          <Button onClick={handleSaveAndContinue} disabled={!parsed?.name && !parsed?.email}>
            <CheckCircle2 className="mr-2 size-4" />
            Save & Continue
          </Button>
        </div>
      </div>

      {/* Upload and Preview */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card
          onDrop={handleDrop}
          onDragOver={preventDefaults}
          onDragEnter={preventDefaults}
          onDragLeave={preventDefaults}
          className="border-dashed"
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UploadCloud className="size-5" />
              Upload PDF
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-dashed p-6 text-center">
              <div className="mx-auto mb-3 grid size-10 place-items-center rounded-full bg-muted">
                <FileText className="size-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                Drag & drop your resume PDF here, or select a file from your computer.
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <Input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
                  className="max-w-sm cursor-pointer"
                />
                <Button variant="outline" disabled>
                  .pdf only
                </Button>
              </div>
              {file && (
                <div className="mt-4 text-sm">
                  <span className="font-medium">Selected:</span> {file.name} ({Math.round(file.size / 1024)} KB)
                </div>
              )}
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                The importer works best with text-based PDFs. Scanned PDFs may not parse correctly.
              </div>
              <Button onClick={parsePdf} disabled={!file || isParsing}>
                {isParsing ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" /> Parsing…
                  </>
                ) : (
                  "Detect content"
                )}
              </Button>
            </div>

            {error && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-destructive/40 bg-destructive/10 p-3 text-destructive">
                <AlertTriangle className="size-4" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {progress > 0 && (
              <div className="mt-2 text-xs text-muted-foreground">
                {"Progress: "}
                {progress}
                {"%"}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="size-5" />
              PDF Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {objectUrl ? (
              <object
                data={objectUrl + "#view=FitH"}
                type="application/pdf"
                className="h-[520px] w-full rounded-md border"
              >
                <p className="p-4 text-sm text-muted-foreground">
                  PDF preview not supported by your browser. You can still import using the Detect button.
                </p>
              </object>
            ) : (
              <div className="grid h-[520px] w-full place-items-center rounded-md border bg-muted/40">
                <p className="text-sm text-muted-foreground">No PDF selected.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Detected Fields */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={parsed.name ?? ""}
                  onChange={(e) => setParsed((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Your name"
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={parsed.location ?? ""}
                  onChange={(e) => setParsed((p) => ({ ...p, location: e.target.value }))}
                  placeholder="City, Country"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={parsed.email ?? ""}
                  onChange={(e) => setParsed((p) => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  type="email"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={parsed.phone ?? ""}
                  onChange={(e) => setParsed((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="+1 (555) 555-5555"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={parsed.links?.linkedin ?? ""}
                  onChange={(e) =>
                    setParsed((p) => ({ ...p, links: { ...(p.links ?? {}), linkedin: e.target.value } }))
                  }
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={parsed.links?.github ?? ""}
                  onChange={(e) => setParsed((p) => ({ ...p, links: { ...(p.links ?? {}), github: e.target.value } }))}
                  placeholder="https://github.com/username"
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="portfolio">Portfolio</Label>
                <Input
                  id="portfolio"
                  value={parsed.links?.portfolio ?? ""}
                  onChange={(e) =>
                    setParsed((p) => ({ ...p, links: { ...(p.links ?? {}), portfolio: e.target.value } }))
                  }
                  placeholder="https://your.site"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={7}
              value={parsed.summary ?? ""}
              onChange={(e) => setParsed((p) => ({ ...p, summary: e.target.value }))}
              placeholder="A concise overview of your experience, skills, and achievements."
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Skills</CardTitle>
            <p className="text-sm text-muted-foreground">Comma or bullet separated. We’ll split it for you.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              rows={5}
              value={(parsed.skills ?? []).join(", ")}
              onChange={(e) => setParsed((p) => ({ ...p, skills: normalizeSkills(e.target.value) }))}
              placeholder="JavaScript, React, Node.js, Tailwind CSS, PostgreSQL"
            />
            <div className="flex flex-wrap gap-2">
              {skillChips.length ? (
                skillChips.map((s, i) => (
                  <Badge key={i} variant="secondary">
                    {s}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No skills detected yet.</p>
              )}
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button variant="secondary" onClick={() => setParsed((p) => ({ ...p, skills: [] }))}>
              Clear skills
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={12}
              value={parsed.experienceRaw ?? ""}
              onChange={(e) => setParsed((p) => ({ ...p, experienceRaw: e.target.value }))}
              placeholder={
                "e.g.\nCompany — Role (Dates)\n• Achievement or responsibility\n• Impact and result\n\nNext Company — Role (Dates)\n• ..."
              }
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              rows={6}
              value={parsed.educationRaw ?? ""}
              onChange={(e) => setParsed((p) => ({ ...p, educationRaw: e.target.value }))}
              placeholder={"e.g.\nUniversity Name — Degree (Year)\nGPA: X.YZ | Relevant Coursework: ..."}
            />
          </CardContent>
          <CardFooter className="justify-between">
            <div className="text-xs text-muted-foreground">
              Tip: Keep education concise and highlight achievements or relevant coursework.
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => navigator.clipboard?.writeText(parsed.rawText ?? "")}>
                Copy raw text
              </Button>
              <Button onClick={handleSaveAndContinue}>Save & Continue</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

/* -------------------------- Parsing utilities -------------------------- */

function parseResumeText(text: string): ParsedResume {
  const cleaned = normalizeWhitespace(text)
  const lines = cleaned
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)

  const email = findEmail(cleaned)
  const phone = findPhone(cleaned)
  const linkedin = findLinkedIn(cleaned)
  const github = findGithub(cleaned)
  const portfolio = findPortfolio(cleaned)

  const name = findLikelyName(lines)
  const location = findLikelyLocation(lines)

  // Section extraction
  const summary = getSection(cleaned, ["SUMMARY", "PROFILE", "ABOUT"]).slice(0, 1200)
  const skillsSection = getSection(cleaned, ["SKILLS", "TECHNICAL SKILLS", "CORE SKILLS", "SKILLS & INTERESTS"])
  const experience = getSection(cleaned, ["EXPERIENCE", "WORK EXPERIENCE", "PROFESSIONAL EXPERIENCE"])
  const education = getSection(cleaned, ["EDUCATION", "ACADEMIC BACKGROUND", "ACADEMICS"])

  const skills = normalizeSkills(skillsSection)

  return {
    name,
    email: email ?? "",
    phone: phone ?? "",
    location,
    links: {
      linkedin: linkedin ?? "",
      github: github ?? "",
      portfolio: portfolio ?? "",
    },
    summary,
    skills,
    experienceRaw: experience,
    educationRaw: education,
    rawText: cleaned,
  }
}

function normalizeWhitespace(input: string) {
  return input
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
}

function findEmail(input: string) {
  const m = input.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi)
  return m?.[0]
}

function findPhone(input: string) {
  const m = input.match(/(\+?\d{1,3}[\s-]?)?($$?\d{2,4}$$?[\s-]?)?\d{3,4}[\s-]?\d{4}/g)
  return m?.[0]
}

function findLinkedIn(input: string) {
  const m = input.match(/https?:\/\/(www\.)?linkedin\.com\/[^\s)]+/gi)
  return m?.[0]
}

function findGithub(input: string) {
  const m = input.match(/https?:\/\/(www\.)?github\.com\/[^\s)]+/gi)
  return m?.[0]
}

function findPortfolio(input: string) {
  // Anything that looks like a personal site but not linkedin/github/email
  const candidates = input.match(/https?:\/\/[^\s)]+/gi) ?? []
  return candidates.find((u) => !/linkedin\.com|github\.com|bitbucket\.org|gitlab\.com/i.test(u)) ?? ""
}

function findLikelyName(lines: string[]) {
  // Heuristic: First line that looks like a name (2-4 capitalized words, without @ or http)
  for (const line of lines.slice(0, 10)) {
    if (line.length > 3 && line.length < 60 && !/@|http|www\./i.test(line)) {
      const words = line.split(/\s+/)
      const caps = words.filter((w) => /^[A-Z][a-zA-Z'.-]+$/.test(w))
      if (caps.length >= 2) return line
    }
  }
  return ""
}

function findLikelyLocation(lines: string[]) {
  // Look for line with a comma and letters (e.g., "San Francisco, CA")
  const loc = lines.find((l) => /[A-Za-z].*,\s*[A-Za-z]{2,}/.test(l) && !/@|http|www\./i.test(l))
  return loc ?? ""
}

function getSection(input: string, headings: string[]) {
  const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  const head = headings.map((h) => esc(h)).join("|")
  const re = new RegExp(`(?:^|\\n)\\s*(?:${head})\\s*\\n+([\\s\\S]*?)(?=\\n[A-Z][A-Z \\-\\&]{2,}\\n|$)`, "i")
  const m = input.match(re)
  return (m?.[1] ?? "").trim()
}

function normalizeSkills(input: string) {
  if (!input) return []
  const block = input.replace(/\n/g, " ")
  return block
    .split(/[,•●·;|]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/\s{2,}/g, " "))
    .slice(0, 100)
}
