// Template Registry - Export all available resume templates
export { default as ModernATSTemplate } from './modern-ats';
export { default as ClassicExecutiveTemplate } from './classic-executive';
export { default as MinimalistTechTemplate } from './minimalist-tech';
export { default as CreativeDesignerTemplate } from './creative-designer';
export { default as ModernSidebarTemplate } from './modern-sidebar';

// Template metadata for the selection page
export interface TemplateMetadata {
  id: string;
  name: string;
  category: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeToComplete: string;
  popularity: number;
  preview: string;
  tags: string[];
  component: string; // Component name for dynamic import
}

export const templateRegistry: TemplateMetadata[] = [
  {
    id: 'modern-ats',
    name: 'Modern ATS',
    category: 'Professional',
    description: 'Clean, modern design optimized for Applicant Tracking Systems with excellent readability and structure.',
    difficulty: 'Beginner',
    timeToComplete: '15-20 min',
    popularity: 98,
    preview: 'modern-ats',
    tags: ['ATS-Friendly', 'Professional', 'Clean', 'Modern', 'Corporate'],
    component: 'ModernATSTemplate'
  },
  {
    id: 'classic-executive',
    name: 'Classic Executive',
    category: 'Executive',
    description: 'Timeless and sophisticated template perfect for senior professionals and executives seeking traditional elegance.',
    difficulty: 'Beginner',
    timeToComplete: '15-20 min',
    popularity: 95,
    preview: 'classic-executive',
    tags: ['Executive', 'Classic', 'Sophisticated', 'Timeless', 'Traditional'],
    component: 'ClassicExecutiveTemplate'
  },
  {
    id: 'minimalist-tech',
    name: 'Minimalist Tech',
    category: 'Technology',
    description: 'Clean and minimal design ideal for tech professionals and developers with a focus on content over decoration.',
    difficulty: 'Beginner',
    timeToComplete: '15-20 min',
    popularity: 92,
    preview: 'minimalist-tech',
    tags: ['Tech', 'Minimalist', 'Clean', 'Developer', 'Modern'],
    component: 'MinimalistTechTemplate'
  },
  {
    id: 'creative-designer',
    name: 'Creative Designer',
    category: 'Creative',
    description: 'Bold and artistic template with visual elements perfect for designers, marketers, and creative professionals.',
    difficulty: 'Intermediate',
    timeToComplete: '20-25 min',
    popularity: 88,
    preview: 'creative-designer',
    tags: ['Creative', 'Design', 'Artistic', 'Bold', 'Visual'],
    component: 'CreativeDesignerTemplate'
  },
  {
    id: 'modern-sidebar',
    name: 'Modern Sidebar',
    category: 'Professional',
    description: 'Contemporary sidebar layout with clean design, featuring contact info and skills in a left panel and experience in the main area.',
    difficulty: 'Beginner',
    timeToComplete: '15-20 min',
    popularity: 94,
    preview: '/modern-sidebar-preview.svg',
    tags: ['Professional', 'Sidebar', 'Clean', 'Modern', 'Organized'],
    component: 'ModernSidebarTemplate'
  }
];

// Helper function to get template by ID
export const getTemplateById = (id: string) => {
  return templateRegistry.find(template => template.id === id);
};

// Helper function to get templates by category
export const getTemplatesByCategory = (category: string) => {
  if (category === 'All') return templateRegistry;
  return templateRegistry.filter(template => template.category === category);
};

// Helper function to search templates
export const searchTemplates = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return templateRegistry.filter(template => 
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

