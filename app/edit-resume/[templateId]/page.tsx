'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Download, 
  Plus, 
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Award,
  FileText,
  Globe,
  X
} from 'lucide-react';

// Import the template components
import ModernATSTemplate from '@/app/templates/modern-ats';
import ClassicExecutiveTemplate from '@/app/templates/classic-executive';
import MinimalistTechTemplate from '@/app/templates/minimalist-tech';
import CreativeDesignerTemplate from '@/app/templates/creative-designer';

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
  };
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    gpa: string;
    honors: string[];
  }>;
  skills: Array<{
    category: string;
    skills: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    link: string;
    startDate: string;
    endDate: string;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    date: string;
    link: string;
  }>;
  languages: Array<{
    language: string;
    proficiency: string;
  }>;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: ''
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: []
};

export default function EditResumePage() {
  const router = useRouter();
  const params = useParams();
  const { user, isLoading, isHydrated } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  const templateId = params.templateId as string;

  // Load saved resume data on component mount
  useEffect(() => {
    if (templateId) {
      const savedData = localStorage.getItem(`resume_${templateId}`);
      if (savedData) {
        try {
          setResumeData(JSON.parse(savedData));
        } catch (error) {
          console.error('Error parsing saved resume data:', error);
        }
      }
    }
  }, [templateId]);

  // Auto-populate with user data if available
  useEffect(() => {
    if (user && resumeData.personalInfo.firstName === '') {
      setResumeData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || ''
        }
      }));
    }
  }, [user, resumeData.personalInfo.firstName]);

  // Save resume data to localStorage
  const saveResumeData = () => {
    if (templateId) {
      localStorage.setItem(`resume_${templateId}`, JSON.stringify(resumeData));
      setIsSaving(false);
    }
  };

  // Handle form field changes
  const handlePersonalInfoChange = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  const handleExperienceChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, {
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ['']
      }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addExperienceDescription = (expIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { ...exp, description: [...exp.description, ''] }
          : exp
      )
    }));
  };

  const removeExperienceDescription = (expIndex: number, descIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { ...exp, description: exp.description.filter((_, j) => j !== descIndex) }
          : exp
      )
    }));
  };

  const handleExperienceDescriptionChange = (expIndex: number, descIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === expIndex 
          ? { 
              ...exp, 
              description: exp.description.map((desc, j) => 
                j === descIndex ? value : desc
              )
            }
          : exp
      )
    }));
  };

  const handleEducationChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, {
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        gpa: '',
        honors: ['']
      }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addEducationHonor = (eduIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === eduIndex 
          ? { ...edu, honors: [...edu.honors, ''] }
          : edu
      )
    }));
  };

  const removeEducationHonor = (eduIndex: number, honorIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === eduIndex 
          ? { ...edu, honors: edu.honors.filter((_, j) => j !== honorIndex) }
          : edu
      )
    }));
  };

  const handleEducationHonorChange = (eduIndex: number, honorIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === eduIndex 
          ? { 
              ...edu, 
              honors: edu.honors.map((honor, j) => 
                j === honorIndex ? value : honor
              )
            }
          : edu
      )
    }));
  };

  const handleSkillsChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skill, i) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addSkillGroup = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, { category: '', skills: [''] }]
    }));
  };

  const removeSkillGroup = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addSkill = (skillGroupIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skillGroup, i) => 
        i === skillGroupIndex 
          ? { ...skillGroup, skills: [...skillGroup.skills, ''] }
          : skillGroup
      )
    }));
  };

  const removeSkill = (skillGroupIndex: number, skillIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skillGroup, i) => 
        i === skillGroupIndex 
          ? { ...skillGroup, skills: skillGroup.skills.filter((_, j) => j !== skillIndex) }
          : skillGroup
      )
    }));
  };

  const handleSkillChange = (skillGroupIndex: number, skillIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skillGroup, i) => 
        i === skillGroupIndex 
          ? { 
              ...skillGroup, 
              skills: skillGroup.skills.map((skill, j) => 
                j === skillIndex ? value : skill
              )
            }
          : skillGroup
      )
    }));
  };

  const handleProjectsChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === index ? { ...project, [field]: value } : project
      )
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, {
        name: '',
        description: '',
        technologies: [''],
        link: '',
        startDate: '',
        endDate: ''
      }]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addProjectTechnology = (projectIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === projectIndex 
          ? { ...project, technologies: [...project.technologies, ''] }
          : project
      )
    }));
  };

  const removeProjectTechnology = (projectIndex: number, techIndex: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === projectIndex 
          ? { ...project, technologies: project.technologies.filter((_, j) => j !== techIndex) }
          : project
      )
    }));
  };

  const handleProjectTechnologyChange = (projectIndex: number, techIndex: number, value: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map((project, i) => 
        i === projectIndex 
          ? { 
              ...project, 
              technologies: project.technologies.map((tech, j) => 
                j === techIndex ? value : tech
              )
            }
          : project
      )
    }));
  };

  const handleCertificationsChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) => 
        i === index ? { ...cert, [field]: value } : cert
      )
    }));
  };

  const addCertification = () => {
    setResumeData(prev => ({
      ...prev,
      certifications: [...prev.certifications, {
        name: '',
        issuer: '',
        date: '',
        link: ''
      }]
    }));
  };

  const removeCertification = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const handleLanguagesChange = (index: number, field: string, value: any) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.map((lang, i) => 
        i === index ? { ...lang, [field]: value } : lang
      )
    }));
  };

  const addLanguage = () => {
    setResumeData(prev => ({
      ...prev,
      languages: [...prev.languages, { language: '', proficiency: '' }]
    }));
  };

  const removeLanguage = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index)
    }));
  };

  // Check authentication
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading editor...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.replace(`/login?redirect=${encodeURIComponent("/edit-resume")}`);
    return null;
  }

  const sections = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'projects', label: 'Projects', icon: FileText },
    { id: 'languages', label: 'Languages', icon: Globe }
  ];

  // Get the template component
  let TemplateComponent: React.ComponentType<{ data: ResumeData; templateId: string }> | null = null;
  let templateName: string | null = null;

  switch (templateId) {
    case 'modern-ats':
      TemplateComponent = ModernATSTemplate;
      templateName = 'Modern ATS';
      break;
    case 'classic-executive':
      TemplateComponent = ClassicExecutiveTemplate;
      templateName = 'Classic Executive';
      break;
    case 'minimalist-tech':
      TemplateComponent = MinimalistTechTemplate;
      templateName = 'Minimalist Tech';
      break;
    case 'creative-designer':
      TemplateComponent = CreativeDesignerTemplate;
      templateName = 'Creative Designer';
      break;
    default:
      TemplateComponent = null;
      templateName = 'Unknown Template';
      break;
  }

  const loadSampleData = () => {
    setResumeData({
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        location: 'New York, NY',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.com',
        summary: 'Experienced software engineer with 5+ years of development experience.'
      },
      experience: [
        {
          company: 'Tech Corp',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2018-06-01',
          endDate: '2022-05-31',
          current: false,
          description: ['Led a team of 5 developers to deliver high-performance web applications.', 'Designed and implemented scalable backend systems for real-time data processing.', 'Collaborated with product managers to define and refine technical requirements.']
        },
        {
          company: 'Startup Inc',
          position: 'Software Engineer',
          location: 'Boston, MA',
          startDate: '2016-09-01',
          endDate: '2018-05-31',
          current: false,
          description: ['Developed and maintained web applications using React and Node.js.', 'Optimized application performance and implemented caching strategies.', 'Worked closely with designers to ensure pixel-perfect UI/UX.']
        }
      ],
      education: [
        {
          institution: 'University of Tech',
          degree: 'Master of Science',
          field: 'Computer Science',
          location: 'New York, NY',
          startDate: '2014-09-01',
          endDate: '2016-05-31',
          current: false,
          gpa: '3.9',
          honors: ['Dean\'s List', 'Summa Cum Laude']
        },
        {
          institution: 'State College',
          degree: 'Bachelor of Science',
          field: 'Information Technology',
          location: 'Boston, MA',
          startDate: '2010-09-01',
          endDate: '2014-05-31',
          current: false,
          gpa: '3.7',
          honors: ['Cum Laude']
        }
      ],
      skills: [
        { category: 'Programming Languages', skills: ['JavaScript', 'TypeScript', 'Python'] },
        { category: 'Frameworks', skills: ['React', 'Next.js', 'Node.js'] },
        { category: 'Databases', skills: ['PostgreSQL', 'MongoDB', 'Redis'] },
        { category: 'Tools', skills: ['Git', 'Docker', 'AWS'] }
      ],
      projects: [
        {
          name: 'E-commerce Platform',
          description: 'A full-stack e-commerce application built with React, Node.js, and MongoDB.',
          technologies: ['React', 'Node.js', 'MongoDB', 'Express.js'],
          link: 'https://ecommerce-platform.com',
          startDate: '2021-01-01',
          endDate: '2022-06-30'
        },
        {
          name: 'Social Media API',
          description: 'RESTful API for a social media platform built with Express.js and MongoDB.',
          technologies: ['Express.js', 'MongoDB', 'Node.js'],
          link: 'https://social-media-api.com',
          startDate: '2020-07-01',
          endDate: '2021-12-31'
        }
      ],
      certifications: [
        { name: 'AWS Certified Developer', issuer: 'Amazon Web Services', date: '2022-03-15', link: 'https://aws.com/cert/123456789' },
        { name: 'Google Cloud Certified', issuer: 'Google Cloud', date: '2021-11-01', link: 'https://cloud.google.com/cert/123456789' }
      ],
      languages: [
        { language: 'English', proficiency: 'Native' },
        { language: 'Spanish', proficiency: 'Fluent' }
      ]
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.back()}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Resume</h1>
                <p className="text-gray-600 text-sm">Template: {templateName}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={loadSampleData}
              >
                <span>Load Sample Data</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center space-x-2"
                onClick={() => setShowPreview(!showPreview)}
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Hide Preview' : 'Preview'}</span>
              </Button>
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </Button>
              <Button 
                onClick={saveResumeData}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? 'Saving...' : 'Save'}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Sections</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 px-4 py-3 text-left text-sm font-medium rounded-md transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!showPreview ? (
              <Card>
                <CardHeader>
                  <CardTitle>{sections.find(s => s.id === activeSection)?.label}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information Section */}
                  {activeSection === 'personal' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={resumeData.personalInfo.firstName}
                            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={resumeData.personalInfo.lastName}
                            onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                            placeholder="Doe"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={resumeData.personalInfo.linkedin}
                            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo.website}
                            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                            placeholder="johndoe.com"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={resumeData.personalInfo.summary}
                          onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                          placeholder="Experienced software engineer with 5+ years..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Work Experience</h3>
                        <Button onClick={addExperience} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Experience
                        </Button>
                      </div>
                      {resumeData.experience.map((exp, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Experience #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeExperience(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Company</Label>
                                <Input
                                  value={exp.company}
                                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                  placeholder="Company Name"
                                />
                              </div>
                              <div>
                                <Label>Position</Label>
                                <Input
                                  value={exp.position}
                                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                  placeholder="Job Title"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={exp.location}
                                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                  placeholder="City, State"
                                />
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={exp.startDate}
                                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={exp.endDate}
                                  onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                  disabled={exp.current}
                                />
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`current-${index}`}
                                checked={exp.current}
                                onCheckedChange={(checked) => handleExperienceChange(index, 'current', checked)}
                              />
                              <Label htmlFor={`current-${index}`}>Current Position</Label>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Description</Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addExperienceDescription(index)}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Point
                                </Button>
                              </div>
                              {exp.description.map((desc, descIndex) => (
                                <div key={descIndex} className="flex items-center space-x-2 mb-2">
                                  <Input
                                    value={desc}
                                    onChange={(e) => handleExperienceDescriptionChange(index, descIndex, e.target.value)}
                                    placeholder="Describe your responsibilities and achievements..."
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeExperienceDescription(index, descIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Education Section */}
                  {activeSection === 'education' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Education</h3>
                        <Button onClick={addEducation} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Education
                        </Button>
                      </div>
                      {resumeData.education.map((edu, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Education #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeEducation(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Institution</Label>
                                <Input
                                  value={edu.institution}
                                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                                  placeholder="University Name"
                                />
                              </div>
                              <div>
                                <Label>Degree</Label>
                                <Input
                                  value={edu.degree}
                                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                                  placeholder="Bachelor's"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Field of Study</Label>
                                <Input
                                  value={edu.field}
                                  onChange={(e) => handleEducationChange(index, 'field', e.target.value)}
                                  placeholder="Computer Science"
                                />
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={edu.startDate}
                                  onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={edu.endDate}
                                  onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                                  disabled={edu.current}
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>GPA</Label>
                                <Input
                                  value={edu.gpa}
                                  onChange={(e) => handleEducationChange(index, 'gpa', e.target.value)}
                                  placeholder="3.8"
                                />
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`edu-current-${index}`}
                                  checked={edu.current}
                                  onCheckedChange={(checked) => handleEducationChange(index, 'current', checked)}
                                />
                                <Label htmlFor={`edu-current-${index}`}>Currently Studying</Label>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Honors & Awards</Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addEducationHonor(index)}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Honor
                                </Button>
                              </div>
                              {edu.honors.map((honor, honorIndex) => (
                                <div key={honorIndex} className="flex items-center space-x-2 mb-2">
                                  <Input
                                    value={honor}
                                    onChange={(e) => handleEducationHonorChange(index, honorIndex, e.target.value)}
                                    placeholder="Dean's List, Summa Cum Laude..."
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeEducationHonor(index, honorIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Skills</h3>
                        <Button onClick={addSkillGroup} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Skill Category
                        </Button>
                      </div>
                      {resumeData.skills.map((skillGroup, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Skill Category #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSkillGroup(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Category Name</Label>
                              <Input
                                value={skillGroup.category}
                                onChange={(e) => handleSkillsChange(index, 'category', e.target.value)}
                                placeholder="Programming Languages, Tools, etc."
                              />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Skills</Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addSkill(index)}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Skill
                                </Button>
                              </div>
                              {skillGroup.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center space-x-2 mb-2">
                                  <Input
                                    value={skill}
                                    onChange={(e) => handleSkillChange(index, skillIndex, e.target.value)}
                                    placeholder="JavaScript, React, Node.js..."
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSkill(index, skillIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Projects Section */}
                  {activeSection === 'projects' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Projects</h3>
                        <Button onClick={addProject} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Project
                        </Button>
                      </div>
                      {resumeData.projects.map((project, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Project #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeProject(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Project Name</Label>
                                <Input
                                  value={project.name}
                                  onChange={(e) => handleProjectsChange(index, 'name', e.target.value)}
                                  placeholder="Project Name"
                                />
                              </div>
                              <div>
                                <Label>Project Link</Label>
                                <Input
                                  value={project.link}
                                  onChange={(e) => handleProjectsChange(index, 'link', e.target.value)}
                                  placeholder="https://project-url.com"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={project.startDate}
                                  onChange={(e) => handleProjectsChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={project.endDate}
                                  onChange={(e) => handleProjectsChange(index, 'endDate', e.target.value)}
                                />
                              </div>
                            </div>
                            <div>
                              <Label>Description</Label>
                              <Textarea
                                value={project.description}
                                onChange={(e) => handleProjectsChange(index, 'description', e.target.value)}
                                placeholder="Describe your project..."
                                rows={3}
                              />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Technologies Used</Label>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addProjectTechnology(index)}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  Add Technology
                                </Button>
                              </div>
                              {project.technologies.map((tech, techIndex) => (
                                <div key={techIndex} className="flex items-center space-x-2 mb-2">
                                  <Input
                                    value={tech}
                                    onChange={(e) => handleProjectTechnologyChange(index, techIndex, e.target.value)}
                                    placeholder="React, Node.js, MongoDB..."
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProjectTechnology(index, techIndex)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  {/* Languages Section */}
                  {activeSection === 'languages' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Languages</h3>
                        <Button onClick={addLanguage} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Language
                        </Button>
                      </div>
                      {resumeData.languages.map((lang, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Language #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeLanguage(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Language</Label>
                              <Input
                                value={lang.language}
                                onChange={(e) => handleLanguagesChange(index, 'language', e.target.value)}
                                placeholder="English, Spanish, French..."
                              />
                            </div>
                            <div>
                              <Label>Proficiency Level</Label>
                              <Input
                                value={lang.proficiency}
                                onChange={(e) => handleLanguagesChange(index, 'proficiency', e.target.value)}
                                placeholder="Native, Fluent, Intermediate..."
                              />
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              /* Template Preview */
              <div className="bg-white rounded-lg shadow-lg">
                {TemplateComponent ? (
                  <TemplateComponent data={resumeData} templateId={templateId} />
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-gray-600">Template not found</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
