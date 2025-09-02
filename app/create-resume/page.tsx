'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Eye, 
  Star, 
  Clock, 
  TrendingUp,
  Palette,
  X
} from 'lucide-react';

import { templateRegistry, TemplateMetadata } from '../templates';
import Footer from '@/components/Footer';

export default function CreateResumePage() {
  const router = useRouter();
  const { user, isLoading, isHydrated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateMetadata | null>(null);

  // Check authentication
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.replace(`/login?redirect=${encodeURIComponent("/create-resume")}`);
    return null;
  }

  // Filter templates based on category and search
  const filteredTemplates = templateRegistry.filter(template => {
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });



  const categories = ['All', ...Array.from(new Set(templateRegistry.map(t => t.category)))];

  const handleTemplateSelect = (templateId: string) => {
    router.push(`/edit-resume/${templateId}`);
  };

  const handlePreviewClick = (template: TemplateMetadata) => {
    console.log('Preview clicked for template:', template);
    setPreviewTemplate(template);
    console.log('previewTemplate state set to:', template);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">Choose Your Template</h1>
            <p className="text-gray-600 mt-2">Select a template that matches your style and profession</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search */}
          <div className="flex-1 md:max-w-md">
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

                {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer h-full flex flex-col max-w-sm">
              <CardContent className="p-0 flex flex-col h-full">
                {/* Template Preview */}
                <div className="relative aspect-[3/4] bg-gray-100 rounded-t-lg overflow-hidden flex-shrink-0">

                    
                                        {/* Preview Image */}
                    <div 
                      className="w-full h-full bg-white flex items-center justify-center relative cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handlePreviewClick(template);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {/* Click Overlay */}
                      <div 
                        className="absolute inset-0 bg-transparent z-20"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handlePreviewClick(template);
                        }}
                      />
                      
                      {/* Template-specific preview content */}
                      {template.id === 'modern-ats' && (
                      <div className="w-full h-full bg-white p-2 text-[8px] overflow-hidden">
                        {/* Header Section - Modern ATS Style */}
                        <div className="text-center mb-2 border-b-2 border-blue-600 pb-1">
                          <div className="text-sm font-bold text-gray-900 mb-1">JOHN DOE</div>
                          <div className="text-[7px] text-gray-600 mb-1">Experienced software engineer with 5+ years of development experience.</div>
                          <div className="flex flex-wrap justify-center gap-1 text-[6px] text-gray-700">
                            <span className="flex items-center">📧 john.doe@example.com</span>
                            <span className="flex items-center">📱 +1 (555) 123-4567</span>
                            <span className="flex items-center">📍 New York, NY</span>
                            <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                            <span className="flex items-center">🌐 johndoe.com</span>
                          </div>
                        </div>
                        
                        {/* Professional Experience - Modern ATS Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">PROFESSIONAL EXPERIENCE</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Senior Software Engineer</div>
                              <span className="text-[6px] text-gray-600">Jun 2018 - May 2022</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">Tech Corp • San Francisco, CA</div>
                            <ul className="list-disc list-inside space-y-0.5 text-[6px] text-gray-700 ml-1">
                              <li>Led a team of 5 developers to deliver high-performance web applications</li>
                              <li>Designed and implemented scalable backend systems for real-time data processing</li>
                            </ul>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Software Engineer</div>
                              <span className="text-[6px] text-gray-600">Sep 2016 - May 2018</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">Startup Inc • Boston, MA</div>
                            <ul className="list-disc list-inside space-y-0.5 text-[6px] text-gray-700 ml-1">
                              <li>Developed and maintained web applications using React and Node.js</li>
                              <li>Optimized application performance and implemented caching strategies</li>
                              <li>Collaborated with designers to ensure pixel-perfect UI/UX</li>
                              <li>Implemented CI/CD pipelines and automated testing</li>
                            </ul>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Junior Developer</div>
                              <span className="text-[6px] text-gray-600">Jun 2015 - Aug 2016</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">Web Solutions • Austin, TX</div>
                            <ul className="list-disc list-inside space-y-0.5 text-[6px] text-gray-700 ml-1">
                              <li>Built responsive websites using HTML, CSS, and JavaScript</li>
                              <li>Assisted in database design and optimization</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Education - Modern ATS Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">EDUCATION</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Master of Science in Computer Science</div>
                              <span className="text-[6px] text-gray-600">Sep 2014 - May 2016</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">University of Tech • New York, NY</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Bachelor of Science in Information Technology</div>
                              <span className="text-[6px] text-gray-600">Sep 2010 - May 2014</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">State College • Boston, MA</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.7 • Honors: Cum Laude</div>
                          </div>
                        </div>
                        
                        {/* Skills - Modern ATS Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">TECHNICAL SKILLS</div>
                          <div className="text-[6px] text-gray-600 leading-tight">
                            <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python</div>
                            <div><strong>Frameworks:</strong> React, Next.js, Node.js</div>
                            <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</div>
                            <div><strong>Tools:</strong> Git, Docker, AWS</div>
                          </div>
                        </div>
                        
                        {/* Projects - Modern ATS Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">PROJECTS</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">E-commerce Platform</div>
                              <span className="text-[6px] text-gray-600">Jan 2021 - Jun 2022</span>
                            </div>
                            <div className="text-[6px] text-gray-600 mb-1">A full-stack e-commerce application built with React, Node.js, and MongoDB.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Social Media API</div>
                              <span className="text-[6px] text-gray-600">Jul 2020 - Dec 2021</span>
                            </div>
                            <div className="text-[6px] text-gray-600 mb-1">RESTful API for a social media platform built with Express.js and MongoDB.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-medium text-gray-700">Task Management App</div>
                              <span className="text-[6px] text-gray-600">Mar 2020 - Jun 2020</span>
                            </div>
                            <div className="text-[6px] text-gray-600 mb-1">A collaborative task management application with real-time updates.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                        </div>
                        
                        {/* Certifications - Modern ATS Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">CERTIFICATIONS</div>
                          <div className="mb-1">
                            <div className="text-[8px] font-medium text-gray-700">AWS Certified Developer</div>
                            <div className="text-blue-600 text-[7px]">Amazon Web Services</div>
                            <div className="text-[6px] text-gray-500">Mar 15, 2022</div>
                            <div className="text-blue-600 text-[6px]">🔗 Verify</div>
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-medium text-gray-700">Google Cloud Certified</div>
                            <div className="text-blue-600 text-[7px]">Google Cloud</div>
                            <div className="text-[6px] text-gray-500">Nov 1, 2021</div>
                            <div className="text-blue-600 text-[6px]">🔗 Verify</div>
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-medium text-gray-700">Microsoft Azure Developer</div>
                            <div className="text-blue-600 text-[7px]">Microsoft</div>
                            <div className="text-[6px] text-gray-500">Sep 15, 2021</div>
                            <div className="text-blue-600 text-[6px]">🔗 Verify</div>
                          </div>
                        </div>
                        
                        {/* Languages - Modern ATS Style */}
                        <div>
                          <div className="text-[8px] font-semibold text-gray-800 mb-1 border-b-2 border-gray-300 pb-1">LANGUAGES</div>
                          <div className="text-[6px] text-gray-600">
                            <span className="bg-gray-50 px-2 py-1 rounded mr-2">English (Native)</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">Spanish (Fluent)</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">French (Conversational)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 'classic-executive' && (
                      <div className="w-full h-full bg-white p-2 text-[8px] overflow-hidden">
                        {/* Header - Classic Executive Style */}
                        <div className="text-center mb-2 border-b-4 border-gray-800 pb-1">
                          <div className="text-sm font-bold text-gray-900 mb-1 tracking-wide">JOHN DOE</div>
                          <div className="flex flex-wrap justify-center gap-1 text-[6px] text-gray-700 mb-1">
                            <span className="flex items-center">📧 john.doe@example.com</span>
                            <span className="flex items-center">📱 +1 (555) 123-4567</span>
                            <span className="flex items-center">📍 New York, NY</span>
                          </div>
                          <div className="flex flex-wrap justify-center gap-1 text-[6px] text-gray-600">
                            <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                            <span className="flex items-center">🌐 johndoe.com</span>
                          </div>
                        </div>
                        
                        {/* Executive Summary - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">EXECUTIVE SUMMARY</div>
                          <div className="text-[6px] text-gray-700 leading-relaxed text-justify">
                            Experienced software engineer with 5+ years of development experience.
                          </div>
                        </div>
                        
                        {/* Professional Experience - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">PROFESSIONAL EXPERIENCE</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Senior Software Engineer</div>
                              <span className="text-[6px] text-gray-600 font-semibold">June 2018 - May 2022</span>
                            </div>
                            <div className="text-[7px] text-gray-700 mb-1">Tech Corp • San Francisco, CA</div>
                            <div className="text-[6px] text-gray-600 italic">San Francisco, CA</div>
                            <ul className="list-disc list-inside space-y-0.5 text-[6px] text-gray-700 ml-1 mt-1">
                              <li>Led a team of 5 developers to deliver high-performance web applications</li>
                              <li>Designed and implemented scalable backend systems for real-time data processing</li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Education - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">EDUCATION</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Master of Science in Computer Science</div>
                              <span className="text-[6px] text-gray-600 font-semibold">September 2014 - May 2016</span>
                            </div>
                            <div className="text-[7px] text-gray-700 mb-1">University of Tech • New York, NY</div>
                            <div className="text-[6px] text-gray-600 italic">New York, NY</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                          </div>
                        </div>
                        
                        {/* Skills - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">TECHNICAL SKILLS</div>
                          <div className="text-[6px] text-gray-700 leading-relaxed">
                            <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python</div>
                            <div><strong>Frameworks:</strong> React, Next.js, Node.js</div>
                            <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</div>
                            <div><strong>Tools:</strong> Git, Docker, AWS</div>
                          </div>
                        </div>
                        
                        {/* Projects - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">PROJECTS</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">E-commerce Platform</div>
                              <span className="text-[6px] text-gray-600">January 2021 - June 2022</span>
                            </div>
                            <div className="text-[6px] text-gray-700 mb-1">A full-stack e-commerce application built with React, Node.js, and MongoDB.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Enterprise CRM System</div>
                              <span className="text-[6px] text-gray-600">July 2020 - December 2021</span>
                            </div>
                            <div className="text-[6px] text-gray-700 mb-1">Comprehensive customer relationship management system for enterprise clients.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                        </div>
                        
                        {/* Certifications - Classic Executive Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">CERTIFICATIONS</div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">PMP Certification</div>
                            <div className="text-[7px] text-gray-700">Project Management Institute</div>
                            <div className="text-[6px] text-gray-600">March 15, 2022</div>
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">AWS Solutions Architect</div>
                            <div className="text-[7px] text-gray-700">Amazon Web Services</div>
                            <div className="text-[6px] text-gray-600">November 1, 2021</div>
                          </div>
                        </div>
                        
                        {/* Languages - Classic Executive Style */}
                        <div>
                          <div className="text-[8px] font-bold text-gray-800 mb-1 border-b-2 border-gray-400 pb-1">LANGUAGES</div>
                          <div className="text-[6px] text-gray-700">
                            <span className="bg-gray-50 px-2 py-1 rounded mr-2">English (Native)</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">Spanish (Fluent)</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">German (Intermediate)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 'minimalist-tech' && (
                      <div className="w-full h-full bg-white p-2 text-[8px] overflow-hidden">
                        {/* Header - Minimalist Tech Style */}
                        <div className="border-b border-gray-300 pb-1 mb-2">
                          <div className="text-center">
                            <div className="text-sm font-bold text-gray-900 mb-1 tracking-tight">JOHN DOE</div>
                            <div className="text-[7px] text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
                              Experienced software engineer with 5+ years of development experience.
                            </div>
                            <div className="flex flex-wrap justify-center gap-2 text-[6px] text-gray-700">
                              <span className="flex items-center">📧 john.doe@example.com</span>
                              <span className="flex items-center">📱 +1 (555) 123-4567</span>
                              <span className="flex items-center">📍 New York, NY</span>
                              <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                              <span className="flex items-center">🌐 johndoe.com</span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Skills - Minimalist Tech Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Skills</div>
                          <div className="text-[6px] text-gray-600 leading-tight">
                            <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python</div>
                            <div><strong>Frameworks:</strong> React, Next.js, Node.js</div>
                            <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</div>
                            <div><strong>Tools:</strong> Git, Docker, AWS</div>
                          </div>
                        </div>
                        
                        {/* Projects - Minimalist Tech Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Projects</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">E-commerce Platform</div>
                              <span className="text-[6px] text-gray-600 font-mono">Jan 2021 - Jun 2022</span>
                            </div>
                            <div className="text-[6px] text-gray-600 leading-tight mb-1">A full-stack e-commerce application built with React, Node.js, and MongoDB.</div>
                            <div className="text-blue-600 text-[6px]">🔗 View Project</div>
                          </div>
                        </div>
                        
                        {/* Experience - Minimalist Tech Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Experience</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Senior Software Engineer</div>
                              <span className="text-[6px] text-gray-600 font-mono">Jun 2018 - May 2022</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">Tech Corp • San Francisco, CA</div>
                            <ul className="list-none space-y-0.5 text-[6px] text-gray-700">
                              <li className="flex items-start">
                                <span className="text-blue-500 mr-1">▸</span>
                                Led a team of 5 developers to deliver high-performance web applications
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-500 mr-1">▸</span>
                                Designed and implemented scalable backend systems for real-time data processing
                              </li>
                            </ul>
                          </div>
                        </div>
                        
                        {/* Education - Minimalist Tech Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Education</div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Master of Science in Computer Science</div>
                              <span className="text-[6px] text-gray-600 font-mono">Sep 2014 - May 2016</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">University of Tech • New York, NY</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Bachelor of Science in Information Technology</div>
                              <span className="text-[6px] text-gray-600 font-mono">Sep 2010 - May 2014</span>
                            </div>
                            <div className="text-blue-600 text-[7px] mb-1">State College • Boston, MA</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.7 • Honors: Cum Laude</div>
                          </div>
                        </div>
                        
                        {/* Certifications - Minimalist Tech Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Certifications</div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">AWS Certified Developer</div>
                            <div className="text-blue-600 text-[7px]">Amazon Web Services</div>
                            <div className="text-[6px] text-gray-600">Mar 15, 2022</div>
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">Google Cloud Certified</div>
                            <div className="text-blue-600 text-[7px]">Google Cloud</div>
                            <div className="text-[6px] text-gray-600">Nov 1, 2021</div>
                          </div>
                        </div>
                        
                        {/* Languages - Minimalist Tech Style */}
                        <div>
                          <div className="text-[8px] font-bold text-gray-900 mb-1 uppercase tracking-wide">Languages</div>
                          <div className="text-[6px] text-gray-600">
                            <span className="bg-gray-50 px-2 py-1 rounded mr-2">English (Native)</span>
                            <span className="bg-gray-50 px-2 py-1 rounded">Spanish (Fluent)</span>
                            <span className="bg-gray-50 px-1 py-0.5 rounded">Japanese (Basic)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 'creative-designer' && (
                      <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 p-2 text-[8px] overflow-hidden">
                        {/* Header - Creative Designer Style */}
                        <div className="relative mb-2">
                          <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-md p-2 text-center">
                            <div className="text-sm font-bold text-gray-900 mb-1 tracking-wide">
                              JOHN <span className="text-purple-600">DOE</span>
                            </div>
                            <div className="text-[7px] text-gray-600 mb-2 max-w-2xl mx-auto leading-relaxed">
                              Experienced software engineer with 5+ years of development experience.
                            </div>
                            <div className="grid grid-cols-2 gap-1 text-[6px] text-gray-700">
                              <div className="bg-white/80 backdrop-blur-sm rounded p-1 shadow-sm">
                                <span className="text-purple-500 mr-1">📧</span>
                                john.doe@example.com
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded p-1 shadow-sm">
                                <span className="text-purple-500 mr-1">📱</span>
                                +1 (555) 123-4567
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded p-1 shadow-sm">
                                <span className="text-purple-500 mr-1">📍</span>
                                New York, NY
                              </div>
                              <div className="bg-white/80 backdrop-blur-sm rounded p-1 shadow-sm">
                                <span className="text-purple-500 mr-1">💼</span>
                                linkedin.com/in/johndoe
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Projects - Creative Designer Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">💼</span>
                            </div>
                            Projects
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">E-commerce Platform</div>
                              <span className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                                Jan 2021 - Jun 2022
                              </span>
                            </div>
                            <div className="text-[6px] text-gray-600 leading-tight mb-1">A full-stack e-commerce application built with React, Node.js, and MongoDB.</div>
                            <div className="text-purple-600 text-[6px]">🔗 View Project</div>
                          </div>
                        </div>
                        
                        {/* Skills - Creative Designer Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">⚡</span>
                            </div>
                            Technical Skills
                          </div>
                          <div className="text-[6px] text-purple-700 leading-tight">
                            <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python</div>
                            <div><strong>Frameworks:</strong> React, Next.js, Node.js</div>
                            <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis</div>
                            <div><strong>Tools:</strong> Git, Docker, AWS</div>
                          </div>
                        </div>
                        
                        {/* Experience - Creative Designer Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">💼</span>
                            </div>
                            Professional Experience
                          </div>
                          <div className="mb-1 relative">
                            <div className="absolute left-0 top-0 w-1.5 h-1.5 bg-purple-500 rounded-full border border-white shadow-sm"></div>
                            <div className="ml-3 pl-2 border-l border-purple-200">
                              <div className="flex justify-between items-start mb-1">
                                <div className="text-[8px] font-bold text-gray-900">Senior Software Engineer</div>
                                <span className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                                  Jun 2018 - May 2022
                                </span>
                              </div>
                              <div className="text-purple-600 text-[7px] mb-1">Tech Corp • San Francisco, CA</div>
                              <div className="text-[6px] text-gray-600 italic">San Francisco, CA</div>
                              <ul className="list-none space-y-0.5 text-[6px] text-gray-700 mt-1">
                                <li>• Led a team of 5 developers to deliver high-performance web applications</li>
                                <li>• Designed and implemented scalable backend systems for real-time data processing</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        {/* Education - Creative Designer Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">🎓</span>
                            </div>
                            Education
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Master of Science in Computer Science</div>
                              <span className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                                Sep 2014 - May 2016
                              </span>
                            </div>
                            <div className="text-purple-600 text-[7px] mb-1">University of Tech • New York, NY</div>
                            <div className="text-[6px] text-gray-600 italic">New York, NY</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                          </div>
                          <div className="mb-1">
                            <div className="flex justify-between items-start mb-1">
                              <div className="text-[8px] font-bold text-gray-900">Bachelor of Fine Arts in Design</div>
                              <span className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                                Sep 2010 - May 2014
                              </span>
                            </div>
                            <div className="text-purple-600 text-[7px] mb-1">Art Institute • Boston, MA</div>
                            <div className="text-[6px] text-gray-600 italic">Boston, MA</div>
                            <div className="text-[6px] text-gray-600">GPA: 3.8 • Honors: Magna Cum Laude</div>
                          </div>
                        </div>
                        
                        {/* Certifications - Creative Designer Style */}
                        <div className="mb-2">
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">🏆</span>
                            </div>
                            Certifications
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">Adobe Creative Suite Expert</div>
                            <div className="text-pink-600 text-[7px] mb-1">Adobe</div>
                            <div className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                              Mar 15, 2022
                            </div>
                            <div className="text-purple-600 text-[6px]">🔗 Verify</div>
                          </div>
                          <div className="mb-1">
                            <div className="text-[8px] font-bold text-gray-900">Figma Design Specialist</div>
                            <div className="text-pink-600 text-[7px] mb-1">Figma</div>
                            <div className="text-[6px] text-purple-600 font-semibold bg-purple-50 px-1 py-0.5 rounded-full">
                              Nov 1, 2021
                            </div>
                            <div className="text-purple-600 text-[6px]">🔗 Verify</div>
                          </div>
                        </div>
                        
                        {/* Languages - Creative Designer Style */}
                        <div>
                          <div className="text-[8px] font-bold text-gray-900 mb-1 flex items-center">
                            <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-1 flex items-center justify-center">
                              <span className="text-white text-[6px] font-bold">🌍</span>
                            </div>
                            Languages
                          </div>
                          <div className="text-purple-700 text-[6px]">
                            <span className="bg-purple-100 px-1 py-0.5 rounded mr-1">English (Native)</span>
                            <span className="bg-purple-100 px-1 py-0.5 rounded mr-1">Spanish (Fluent)</span>
                            <span className="bg-purple-100 px-1 py-0.5 rounded">Italian (Conversational)</span>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Fallback for unknown templates */}
                    {!['modern-ats', 'classic-executive', 'minimalist-tech', 'creative-designer'].includes(template.id) && (
                      <div className="text-center p-4">
                        <div className="text-4xl mb-2">📄</div>
                        <div className="text-sm font-medium text-gray-700">{template.name}</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Template Information Below Preview */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>
                    </div>
                    
                    {/* Template Features */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Key Features</h4>
                      <div className="flex flex-wrap gap-2">
                        {template.id === 'modern-ats' && (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              ATS Optimized
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Clean Layout
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Professional
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Easy to Scan
                            </span>
                          </>
                        )}
                        
                        {template.id === 'classic-executive' && (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Executive Style
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Traditional
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Corporate Ready
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Formal
                            </span>
                          </>
                        )}
                        
                        {template.id === 'minimalist-tech' && (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Minimalist
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Tech Focused
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Clean Design
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                              Modern
                            </span>
                          </>
                        )}
                        
                        {template.id === 'creative-designer' && (
                          <>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                              Creative
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                              Designer Focused
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                              Visual Appeal
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Artistic
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Best For Section */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-800">Best For</h4>
                      <div className="text-sm text-gray-600">
                        {template.id === 'modern-ats' && (
                          "Software engineers, developers, and tech professionals who want a clean, ATS-friendly resume that highlights technical skills and experience."
                        )}
                        {template.id === 'classic-executive' && (
                          "Senior professionals, executives, and corporate roles that require a traditional, formal resume format with strong visual hierarchy."
                        )}
                        {template.id === 'minimalist-tech' && (
                          "Tech professionals who prefer a clean, minimal design that focuses on content without visual distractions."
                        )}
                        {template.id === 'creative-designer' && (
                          "Creative professionals, designers, and those in artistic fields who want a visually appealing resume with modern design elements."
                        )}
                      </div>
                    </div>
                    
                    {/* Template Stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-gray-200">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {template.id === 'modern-ats' && '95%'}
                          {template.id === 'classic-executive' && '92%'}
                          {template.id === 'minimalist-tech' && '89%'}
                          {template.id === 'creative-designer' && '87%'}
                        </div>
                        <div className="text-xs text-gray-500">ATS Score</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {template.id === 'modern-ats' && '4.9/5'}
                          {template.id === 'classic-executive' && '4.8/5'}
                          {template.id === 'minimalist-tech' && '4.7/5'}
                          {template.id === 'creative-designer' && '4.6/5'}
                        </div>
                        <div className="text-xs text-gray-500">User Rating</div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  


                  {/* Difficulty Badge */}
                  <div className="absolute top-3 left-3">
                    <Badge 
                      className={`${
                        template.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                        template.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {template.difficulty}
                    </Badge>
                  </div>

                  {/* Preview Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button className="bg-white text-gray-800 hover:bg-gray-100">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>

                {/* Template Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">{template.name}</h3>
                      <p className="text-sm text-gray-500">{template.category}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-2 flex-grow">{template.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {template.timeToComplete}
                      </span>

                    </div>
                  </div>

                  {/* Action Button */}
                  <Button 
                    onClick={() => handleTemplateSelect(template.id)}
                    className="w-full bg-blue-600 hover:bg-blue-700 mt-auto"
                  >
                    Use This Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </div>
        )}
      </div>
      

      

      
      {/* Template Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{previewTemplate.name}</h2>
                <p className="text-gray-600 mt-1">{previewTemplate.description}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPreviewTemplate(null)}
                className="hover:bg-gray-100"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                {/* Render the actual template component */}
                {previewTemplate.id === 'modern-ats' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-8 border-b-2 border-blue-600 pb-6">
                      <h1 className="text-4xl font-bold text-gray-900 mb-4">JOHN DOE</h1>
                      <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                        Experienced software engineer with 5+ years of development experience specializing in full-stack web development, 
                        cloud architecture, and team leadership. Passionate about creating scalable, high-performance applications 
                        and mentoring junior developers.
                      </p>
                      <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-700">
                        <span className="flex items-center">📧 john.doe@example.com</span>
                        <span className="flex items-center">📱 +1 (555) 123-4567</span>
                        <span className="flex items-center">📍 New York, NY</span>
                        <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                        <span className="flex items-center">🌐 johndoe.com</span>
                      </div>
                    </div>
                    
                    {/* Professional Experience */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">PROFESSIONAL EXPERIENCE</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Senior Software Engineer</h3>
                          <span className="text-lg text-gray-600">June 2018 - May 2022</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-3">Tech Corp • San Francisco, CA</div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>Led a team of 5 developers to deliver high-performance web applications, resulting in 40% improvement in user engagement</li>
                          <li>Designed and implemented scalable backend systems for real-time data processing, handling 10M+ daily requests</li>
                          <li>Collaborated with product managers to define and refine technical requirements, ensuring alignment with business goals</li>
                          <li>Mentored junior developers and conducted code reviews, improving team productivity by 25%</li>
                          <li>Implemented CI/CD pipelines and automated testing, reducing deployment time from 2 hours to 15 minutes</li>
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Software Engineer</h3>
                          <span className="text-lg text-gray-600">September 2016 - May 2018</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-3">Startup Inc • Boston, MA</div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>Developed and maintained web applications using React and Node.js, improving performance by 35%</li>
                          <li>Optimized application performance and implemented caching strategies, reducing load times by 50%</li>
                          <li>Worked closely with designers to ensure pixel-perfect UI/UX implementation</li>
                          <li>Participated in agile development processes and sprint planning meetings</li>
                        </ul>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Junior Developer</h3>
                          <span className="text-lg text-gray-600">June 2015 - August 2016</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-3">Web Solutions • Austin, TX</div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                          <li>Built responsive websites using HTML, CSS, and JavaScript for various clients</li>
                          <li>Assisted in database design and optimization for e-commerce platforms</li>
                          <li>Collaborated with senior developers on large-scale projects</li>
                        </ul>
                      </div>
                    </section>
                    
                    {/* Education */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">EDUCATION</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Master of Science in Computer Science</h3>
                          <span className="text-lg text-gray-600">September 2014 - May 2016</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-2">University of Tech • New York, NY</div>
                        <div className="text-gray-600">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                        <div className="text-gray-600 mt-1">Relevant Coursework: Advanced Algorithms, Machine Learning, Distributed Systems, Software Engineering</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Bachelor of Science in Information Technology</h3>
                          <span className="text-lg text-gray-600">September 2010 - May 2014</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-2">State College • Boston, MA</div>
                        <div className="text-gray-600">GPA: 3.7 • Honors: Cum Laude</div>
                        <div className="text-gray-600 mt-1">Relevant Coursework: Data Structures, Web Development, Database Systems, Network Security</div>
                      </div>
                    </section>
                    
                    {/* Technical Skills */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">TECHNICAL SKILLS</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Programming Languages</h4>
                          <p className="text-gray-600">JavaScript (ES6+), TypeScript, Python, Java, SQL, HTML5, CSS3</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Frameworks & Libraries</h4>
                          <p className="text-gray-600">React, Next.js, Node.js, Express.js, Angular, Vue.js, Django, Flask</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Databases & Cloud</h4>
                          <p className="text-gray-600">PostgreSQL, MongoDB, Redis, MySQL, AWS, Google Cloud, Docker, Kubernetes</p>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-gray-800 mb-2">Tools & Methodologies</h4>
                          <p className="text-gray-600">Git, CI/CD, Agile, Scrum, JIRA, Postman, VS Code, Figma</p>
                        </div>
                      </div>
                    </section>
                    
                    {/* Projects */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">PROJECTS</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">E-commerce Platform</h3>
                          <span className="text-lg text-gray-600">January 2021 - June 2022</span>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, 
                          product catalog, shopping cart, payment processing, and admin dashboard. Implemented real-time inventory 
                          management and analytics dashboard.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Social Media API</h3>
                          <span className="text-lg text-gray-600">July 2020 - December 2021</span>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          RESTful API for a social media platform built with Express.js and MongoDB. Includes user profiles, posts, 
                          comments, likes, and real-time notifications. Handles 1M+ daily API requests with 99.9% uptime.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-medium text-gray-700">Task Management App</h3>
                          <span className="text-lg text-gray-600">March 2020 - June 2020</span>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">
                          A collaborative task management application with real-time updates, team collaboration, and progress tracking. 
                          Built with React frontend and Node.js backend, featuring drag-and-drop interface and mobile responsiveness.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                    </section>
                    
                    {/* Certifications */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">CERTIFICATIONS</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-medium text-gray-700 mb-2">AWS Certified Developer</h4>
                          <div className="text-blue-600 text-lg mb-2">Amazon Web Services</div>
                          <div className="text-gray-500">March 15, 2022</div>
                          <div className="text-blue-600 mt-2">🔗 Verify</div>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-medium text-gray-700 mb-2">Google Cloud Certified</h4>
                          <div className="text-blue-600 text-lg mb-2">Google Cloud</div>
                          <div className="text-gray-500">November 1, 2021</div>
                          <div className="text-blue-600 mt-2">🔗 Verify</div>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-medium text-gray-700 mb-2">Microsoft Azure Developer</h4>
                          <div className="text-blue-600 text-lg mb-2">Microsoft</div>
                          <div className="text-gray-500">September 15, 2021</div>
                          <div className="text-blue-600 mt-2">🔗 Verify</div>
                        </div>
                      </div>
                    </section>
                    
                    {/* Languages */}
                    <section>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">LANGUAGES</h2>
                      <div className="flex flex-wrap gap-4">
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">English (Native)</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">Spanish (Fluent)</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">French (Conversational)</span>
                      </div>
                    </section>
                  </div>
                )}
                
                {previewTemplate.id === 'classic-executive' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8 border-b-4 border-gray-800 pb-6">
                      <h1 className="text-5xl font-bold text-gray-900 mb-4 tracking-wide">JOHN DOE</h1>
                      <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-700 mb-4">
                        <span className="flex items-center">📧 john.doe@example.com</span>
                        <span className="flex items-center">📱 +1 (555) 123-4567</span>
                        <span className="flex items-center">📍 New York, NY</span>
                      </div>
                      <div className="flex flex-wrap justify-center gap-6 text-lg text-gray-600">
                        <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                        <span className="flex items-center">🌐 johndoe.com</span>
                      </div>
                    </div>
                    
                    {/* Executive Summary */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">EXECUTIVE SUMMARY</h2>
                      <p className="text-gray-700 text-lg leading-relaxed text-justify">
                        Experienced software engineer with 5+ years of development experience specializing in full-stack web development, 
                        cloud architecture, and team leadership. Demonstrated success in leading development teams, architecting scalable 
                        solutions, and delivering high-impact projects that drive business growth and operational efficiency.
                      </p>
                    </section>
                    
                    {/* Professional Experience */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">PROFESSIONAL EXPERIENCE</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Senior Software Engineer</h3>
                          <span className="text-lg text-gray-600 font-semibold">June 2018 - May 2022</span>
                        </div>
                        <div className="text-gray-700 text-lg mb-2">Tech Corp • San Francisco, CA</div>
                        <div className="text-gray-600 text-lg italic mb-3">San Francisco, CA</div>
                        <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4 text-lg">
                          <li>Led a team of 5 developers to deliver high-performance web applications, resulting in 40% improvement in user engagement</li>
                          <li>Designed and implemented scalable backend systems for real-time data processing, handling 10M+ daily requests</li>
                          <li>Collaborated with product managers to define and refine technical requirements, ensuring alignment with business goals</li>
                          <li>Mentored junior developers and conducted code reviews, improving team productivity by 25%</li>
                        </ul>
                      </div>
                    </section>
                    
                    {/* Education */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">EDUCATION</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Master of Science in Computer Science</h3>
                          <span className="text-lg text-gray-600 font-semibold">September 2014 - May 2016</span>
                        </div>
                        <div className="text-gray-700 text-lg mb-2">University of Tech • New York, NY</div>
                        <div className="text-gray-600 text-lg italic mb-2">New York, NY</div>
                        <div className="text-gray-600 text-lg">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                      </div>
                    </section>
                    
                    {/* Technical Skills */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">TECHNICAL SKILLS</h2>
                      <div className="text-gray-700 text-lg leading-relaxed">
                        <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3</div>
                        <div><strong>Frameworks:</strong> React, Next.js, Node.js, Express.js, Angular, Vue.js, Django, Flask</div>
                        <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis, MySQL, AWS, Google Cloud, Docker, Kubernetes</div>
                        <div><strong>Tools:</strong> Git, CI/CD, Agile, Scrum, JIRA, Postman, VS Code, Figma</div>
                      </div>
                    </section>
                    
                    {/* Projects */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">PROJECTS</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">E-commerce Platform</h3>
                          <span className="text-lg text-gray-600">January 2021 - June 2022</span>
                        </div>
                        <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                          A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, 
                          product catalog, shopping cart, payment processing, and admin dashboard.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Enterprise CRM System</h3>
                          <span className="text-lg text-gray-600">July 2020 - December 2021</span>
                        </div>
                        <p className="text-lg text-gray-700 mb-3 leading-relaxed">
                          Comprehensive customer relationship management system for enterprise clients with advanced analytics and reporting.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                    </section>
                    
                    {/* Certifications */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">CERTIFICATIONS</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">PMP Certification</h4>
                          <div className="text-gray-700 text-lg mb-2">Project Management Institute</div>
                          <div className="text-gray-600 text-lg">March 15, 2022</div>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">AWS Solutions Architect</h4>
                          <div className="text-gray-700 text-lg mb-2">Amazon Web Services</div>
                          <div className="text-gray-600 text-lg">November 1, 2021</div>
                        </div>
                      </div>
                    </section>
                    
                    {/* Languages */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-400 pb-2">LANGUAGES</h2>
                      <div className="flex flex-wrap gap-4">
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">English (Native)</span>
                        <span className="bg-gray-600 text-white px-4 py-2 rounded-lg text-lg">Spanish (Fluent)</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">German (Intermediate)</span>
                      </div>
                    </section>
                  </div>
                )}
                
                {previewTemplate.id === 'minimalist-tech' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="border-b border-gray-300 pb-6 mb-8">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">JOHN DOE</h1>
                        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                          Experienced software engineer with 5+ years of development experience specializing in full-stack web development, 
                          cloud architecture, and team leadership.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-lg text-gray-700">
                          <span className="flex items-center">📧 john.doe@example.com</span>
                          <span className="flex items-center">📱 +1 (555) 123-4567</span>
                          <span className="flex items-center">📍 New York, NY</span>
                          <span className="flex items-center">💼 LinkedIn: linkedin.com/in/johndoe</span>
                          <span className="flex items-center">🌐 johndoe.com</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Skills */}
                    <section className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Skills</h2>
                      <div className="text-gray-600 text-lg leading-tight">
                        <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3</div>
                        <div><strong>Frameworks:</strong> React, Next.js, Node.js, Express.js, Angular, Vue.js, Django, Flask</div>
                        <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis, MySQL, AWS, Google Cloud, Docker, Kubernetes</div>
                        <div><strong>Tools:</strong> Git, CI/CD, Agile, Scrum, JIRA, Postman, VS Code, Figma</div>
                      </div>
                    </section>
                    
                    {/* Projects */}
                    <section className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Projects</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">E-commerce Platform</h3>
                          <span className="text-lg text-gray-600 font-mono">Jan 2021 - Jun 2022</span>
                        </div>
                        <p className="text-gray-600 text-lg leading-tight mb-3">
                          A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, 
                          product catalog, shopping cart, payment processing, and admin dashboard.
                        </p>
                        <div className="text-blue-600 text-lg">🔗 View Project</div>
                      </div>
                    </section>
                    
                    {/* Experience */}
                    <section className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Experience</h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Senior Software Engineer</h3>
                          <span className="text-lg text-gray-600 font-mono">Jun 2018 - May 2022</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-3">Tech Corp • San Francisco, CA</div>
                        <ul className="list-none space-y-2 text-lg text-gray-700">
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-3 text-xl">▸</span>
                            Led a team of 5 developers to deliver high-performance web applications, resulting in 40% improvement in user engagement
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-3 text-xl">▸</span>
                            Designed and implemented scalable backend systems for real-time data processing, handling 10M+ daily requests
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-500 mr-3 text-xl">▸</span>
                            Mentored junior developers and conducted code reviews, improving team productivity by 25%
                          </li>
                        </ul>
                      </div>
                    </section>
                    
                    {/* Education */}
                    <section className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Education</h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Master of Science in Computer Science</h3>
                          <span className="text-lg text-gray-600 font-mono">Sep 2014 - May 2016</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-2">University of Tech • New York, NY</div>
                        <div className="text-gray-600 text-lg">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Bachelor of Science in Information Technology</h3>
                          <span className="text-lg text-gray-600 font-mono">Sep 2010 - May 2014</span>
                        </div>
                        <div className="text-blue-600 text-lg mb-2">State College • Boston, MA</div>
                        <div className="text-gray-600 text-lg">GPA: 3.7 • Honors: Cum Laude</div>
                      </div>
                    </section>
                    
                    {/* Certifications */}
                    <section className="mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Certifications</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">AWS Certified Developer</h4>
                          <div className="text-blue-600 text-lg mb-2">Amazon Web Services</div>
                          <div className="text-gray-600 text-lg">Mar 15, 2022</div>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Google Cloud Certified</h4>
                          <div className="text-blue-600 text-lg mb-2">Google Cloud</div>
                          <div className="text-gray-600 text-lg">Nov 1, 2021</div>
                        </div>
                      </div>
                    </section>
                    
                    {/* Languages */}
                    <section>
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 uppercase tracking-wide">Languages</h2>
                      <div className="flex flex-wrap gap-4">
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">English (Native)</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">Spanish (Fluent)</span>
                        <span className="bg-gray-100 px-4 py-2 rounded-lg text-lg">Japanese (Basic)</span>
                      </div>
                    </section>
                  </div>
                )}
                
                {previewTemplate.id === 'creative-designer' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="relative mb-8">
                      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-2xl p-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
                          JOHN <span className="text-purple-600">DOE</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
                          Experienced software engineer with 5+ years of development experience specializing in full-stack web development, 
                          cloud architecture, and team leadership. Passionate about creating beautiful, user-centric applications.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-lg text-gray-700 max-w-2xl mx-auto">
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <span className="text-purple-500 mr-2">📧</span>
                            john.doe@example.com
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <span className="text-purple-500 mr-2">📱</span>
                            +1 (555) 123-4567
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <span className="text-purple-500 mr-2">📍</span>
                            New York, NY
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-sm">
                            <span className="text-purple-500 mr-2">💼</span>
                            linkedin.com/in/johndoe
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Projects */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">💼</span>
                        </div>
                        Projects
                      </h2>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">E-commerce Platform</h3>
                          <span className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                            Jan 2021 - Jun 2022
                          </span>
                        </div>
                        <p className="text-gray-600 text-lg leading-tight mb-3">
                          A full-stack e-commerce application built with React, Node.js, and MongoDB. Features include user authentication, 
                          product catalog, shopping cart, payment processing, and admin dashboard.
                        </p>
                        <div className="text-purple-600 text-lg">🔗 View Project</div>
                      </div>
                    </section>
                    
                    {/* Skills */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">⚡</span>
                        </div>
                        Technical Skills
                      </h2>
                      <div className="text-purple-700 text-lg leading-tight">
                        <div><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java, SQL, HTML5, CSS3</div>
                        <div><strong>Frameworks:</strong> React, Next.js, Node.js, Express.js, Angular, Vue.js, Django, Flask</div>
                        <div><strong>Databases:</strong> PostgreSQL, MongoDB, Redis, MySQL, AWS, Google Cloud, Docker, Kubernetes</div>
                        <div><strong>Tools:</strong> Git, CI/CD, Agile, Scrum, JIRA, Postman, VS Code, Figma</div>
                      </div>
                    </section>
                    
                    {/* Experience */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">💼</span>
                        </div>
                        Professional Experience
                      </h2>
                      
                      <div className="mb-6 relative">
                        <div className="absolute left-0 top-0 w-3 h-3 bg-purple-500 rounded-full border-2 border-white shadow-sm"></div>
                        <div className="ml-6 pl-4 border-l-2 border-purple-200">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-gray-900">Senior Software Engineer</h3>
                            <span className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                              Jun 2018 - May 2022
                            </span>
                          </div>
                          <div className="text-purple-600 text-lg mb-2">Tech Corp • San Francisco, CA</div>
                          <div className="text-gray-600 text-lg italic mb-3">San Francisco, CA</div>
                          <ul className="list-none space-y-2 text-lg text-gray-700">
                            <li>• Led a team of 5 developers to deliver high-performance web applications, resulting in 40% improvement in user engagement</li>
                            <li>• Designed and implemented scalable backend systems for real-time data processing, handling 10M+ daily requests</li>
                            <li>• Mentored junior developers and conducted code reviews, improving team productivity by 25%</li>
                          </ul>
                        </div>
                      </div>
                    </section>
                    
                    {/* Education */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-xl font-bold">🎓</span>
                        </div>
                        Education
                      </h2>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Master of Science in Computer Science</h3>
                          <span className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                            Sep 2014 - May 2016
                          </span>
                        </div>
                        <div className="text-purple-600 text-lg mb-2">University of Tech • New York, NY</div>
                        <div className="text-gray-600 text-lg italic mb-2">New York, NY</div>
                        <div className="text-gray-600 text-lg">GPA: 3.9 • Honors: Dean's List, Summa Cum Laude</div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">Bachelor of Fine Arts in Design</h3>
                          <span className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                            Sep 2010 - May 2014
                          </span>
                        </div>
                        <div className="text-purple-600 text-lg mb-2">Art Institute • Boston, MA</div>
                        <div className="text-gray-600 text-lg italic mb-2">Boston, MA</div>
                        <div className="text-gray-600 text-lg">GPA: 3.8 • Honors: Magna Cum Laude</div>
                      </div>
                    </section>
                    
                    {/* Certifications */}
                    <section className="mb-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">🏆</span>
                        </div>
                        Certifications
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Adobe Creative Suite Expert</h4>
                          <div className="text-pink-600 text-lg mb-2">Adobe</div>
                          <div className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                            Mar 15, 2022
                          </div>
                          <div className="text-purple-600 mt-2">🔗 Verify</div>
                        </div>
                        
                        <div className="text-center p-4 border border-gray-200 rounded-lg">
                          <h4 className="text-lg font-bold text-gray-900 mb-2">Figma Design Specialist</h4>
                          <div className="text-pink-600 text-lg mb-2">Figma</div>
                          <div className="text-lg text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                            Nov 1, 2021
                          </div>
                          <div className="text-purple-600 mt-2">🔗 Verify</div>
                        </div>
                      </div>
                    </section>
                    
                    {/* Languages */}
                    <section>
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-3 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">🌍</span>
                        </div>
                        Languages
                      </h2>
                      <div className="text-purple-700 text-lg">
                        <span className="bg-purple-100 px-4 py-2 rounded-lg mr-3">English (Native)</span>
                        <span className="bg-purple-100 px-4 py-2 rounded-lg mr-3">Spanish (Fluent)</span>
                        <span className="bg-purple-100 px-4 py-2 rounded-lg">Italian (Conversational)</span>
                      </div>
                    </section>
                  </div>
                )}
                
                {/* Modern Sidebar Template Preview */}
                {previewTemplate.id === 'modern-sidebar' && (
                  <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 mb-6 rounded-lg">
                      <div className="text-center">
                        <h1 className="text-4xl font-bold mb-2 tracking-wide">JOHN DOE</h1>
                        <p className="text-xl text-blue-100">Experienced software engineer with 5+ years of development experience specializing in full-stack web development, cloud architecture, and team leadership.</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Left Sidebar */}
                      <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg">
                        {/* Contact Information */}
                        <section className="mb-6">
                          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">CONTACT</h2>
                          <div className="space-y-3">
                            <div className="flex items-center text-gray-700">
                              <span className="text-sm">📧 john.doe@example.com</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="text-sm">📱 +1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="text-sm">📍 New York, NY</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <span className="text-sm">💼 linkedin.com/in/johndoe</span>
                            </div>
                          </div>
                        </section>
                        
                        {/* Skills Section */}
                        <section className="mb-6">
                          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">SKILLS</h2>
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Technical</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">React</span>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Node.js</span>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Python</span>
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">AWS</span>
                            </div>
                          </div>
                          <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">Soft Skills</h3>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Leadership</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Communication</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Problem Solving</span>
                            </div>
                          </div>
                        </section>
                        
                        {/* Education Section */}
                        <section>
                          <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">EDUCATION</h2>
                          <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Master of Science in Computer Science</h3>
                            <div className="text-blue-600 text-sm font-medium mb-1">MIT</div>
                            <div className="text-gray-600 text-sm mb-1">Cambridge, MA</div>
                            <div className="text-gray-500 text-xs mb-1">Sep 2014 - May 2016</div>
                            <div className="text-gray-600 text-sm">GPA: 3.9</div>
                          </div>
                        </section>
                      </div>
                      
                      {/* Main Content Area */}
                      <div className="lg:w-2/3">
                        {/* Professional Experience */}
                        <section className="mb-6">
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">PROFESSIONAL EXPERIENCE</h2>
                          
                          <div className="mb-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-900">Senior Software Engineer</h3>
                              <span className="text-sm text-gray-600 font-medium bg-gray-100 px-3 py-1 rounded-full">Jun 2018 - May 2022</span>
                            </div>
                            <div className="text-blue-600 text-lg font-medium mb-2">Tech Corp</div>
                            <div className="text-gray-600 text-sm italic mb-3">San Francisco, CA</div>
                            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                              <li className="text-sm">Led a team of 5 developers to deliver high-performance web applications</li>
                              <li className="text-sm">Designed and implemented scalable backend systems for real-time data processing</li>
                              <li className="text-sm">Mentored junior developers and conducted code reviews</li>
                            </ul>
                          </div>
                        </section>
                        
                        {/* Projects Section */}
                        <section>
                          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">PROJECTS</h2>
                          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-xl font-bold text-gray-900">E-commerce Platform</h3>
                              <span className="text-blue-600 hover:text-blue-800 text-sm bg-blue-100 px-3 py-1 rounded-full">🔗 View Project</span>
                            </div>
                            <p className="text-gray-700 mb-3 leading-relaxed text-sm">Built a scalable e-commerce platform using React, Node.js, and MongoDB</p>
                            <div className="text-gray-600 text-sm"><strong>Technologies:</strong> React, Node.js, MongoDB, AWS</div>
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-600">
                Click outside or press ESC to close
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    handleTemplateSelect(previewTemplate.id);
                    setPreviewTemplate(null);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Use This Template
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Spacing before footer */}
      <div className="py-8"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
