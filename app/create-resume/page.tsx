'use client';

import { useState } from 'react';
import Image from 'next/image';
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

  

  // Local component: use JPG previews with a placeholder fallback
  const TemplatePreviewImage = ({ id, alt }: { id: string; alt: string }) => {
    const [src, setSrc] = useState(`/${id}.jpg?v=2`);
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="relative z-10 object-cover"
        onError={() => setSrc('/placeholder.jpg')}
        priority={false}
      />
    );
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
                      className="w-full h-full bg-white flex items-center justify-center relative transition-colors"
                    >
                      
                      {/* Template-specific preview content */}
                      {template.id === 'modern-ats' && (
                        <TemplatePreviewImage id="modern-ats" alt="Modern ATS preview" />
                      )}
                      {template.id === 'classic-executive' && (
                        <TemplatePreviewImage id="classic-executive" alt="Classic Executive preview" />
                      )}
                      {template.id === 'minimalist-tech' && (
                        <TemplatePreviewImage id="minimalist-tech" alt="Minimalist Tech preview" />
                      )}
                      {template.id === 'creative-designer' && (
                        <TemplatePreviewImage id="creative-designer" alt="Creative Designer preview" />
                      )}
                      {template.id === 'modern-sidebar' && (
                        <TemplatePreviewImage id="modern-sidebar" alt="Modern Sidebar preview" />
                      )}
                
                    
                    {/* Fallback for unknown templates */}
                    {!['modern-ats', 'classic-executive', 'minimalist-tech', 'creative-designer', 'modern-sidebar'].includes(template.id) && (
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
      

      


      
      
      {/* Spacing before footer */}
      <div className="py-8"></div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
