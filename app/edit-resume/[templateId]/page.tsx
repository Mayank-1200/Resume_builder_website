'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Footer from '@/components/Footer';
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
  X,
  Star
} from 'lucide-react';

// Import the template components
import ModernATSTemplate from '@/app/templates/modern-ats';
import ClassicExecutiveTemplate from '@/app/templates/classic-executive';
import MinimalistTechTemplate from '@/app/templates/minimalist-tech';
import CreativeDesignerTemplate from '@/app/templates/creative-designer';
import ModernSidebarTemplate from '@/app/templates/modern-sidebar';

// Template-specific functionality will be added inline

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
    skills: Array<{
      name: string;
      level: number;
    }>;
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
  skills: [{ category: '', skills: [{ name: '', level: 3 }] }],
  projects: [],
  certifications: [],
  languages: []
};

// Skill selector data with predefined skills for different professions
const PROFESSION_SKILLS = {
  'Software Engineer': {
    'Programming Languages': [
      { name: 'JavaScript', level: 4 },
      { name: 'Python', level: 4 },
      { name: 'Java', level: 3 },
      { name: 'C++', level: 3 },
      { name: 'TypeScript', level: 4 },
      { name: 'Go', level: 2 },
      { name: 'Rust', level: 2 },
      { name: 'PHP', level: 3 },
      { name: 'Ruby', level: 2 },
      { name: 'Swift', level: 2 }
    ],
    'Frontend Development': [
      { name: 'React', level: 4 },
      { name: 'Vue.js', level: 3 },
      { name: 'Angular', level: 3 },
      { name: 'HTML5', level: 5 },
      { name: 'CSS3', level: 4 },
      { name: 'Sass/SCSS', level: 3 },
      { name: 'Tailwind CSS', level: 4 },
      { name: 'Bootstrap', level: 3 },
      { name: 'Next.js', level: 3 },
      { name: 'Nuxt.js', level: 2 }
    ],
    'Backend Development': [
      { name: 'Node.js', level: 4 },
      { name: 'Express.js', level: 4 },
      { name: 'Django', level: 3 },
      { name: 'Flask', level: 3 },
      { name: 'Spring Boot', level: 3 },
      { name: 'FastAPI', level: 3 },
      { name: 'Laravel', level: 2 },
      { name: 'ASP.NET', level: 2 },
      { name: 'GraphQL', level: 3 },
      { name: 'REST APIs', level: 4 }
    ],
    'Databases': [
      { name: 'PostgreSQL', level: 4 },
      { name: 'MySQL', level: 4 },
      { name: 'MongoDB', level: 3 },
      { name: 'Redis', level: 3 },
      { name: 'SQLite', level: 4 },
      { name: 'Elasticsearch', level: 2 },
      { name: 'DynamoDB', level: 2 },
      { name: 'Firebase', level: 3 }
    ],
    'DevOps & Tools': [
      { name: 'Git', level: 4 },
      { name: 'Docker', level: 3 },
      { name: 'Kubernetes', level: 2 },
      { name: 'AWS', level: 3 },
      { name: 'Azure', level: 2 },
      { name: 'GCP', level: 2 },
      { name: 'Jenkins', level: 2 },
      { name: 'CI/CD', level: 3 },
      { name: 'Linux', level: 3 },
      { name: 'Nginx', level: 2 }
    ],
    'Testing': [
      { name: 'Jest', level: 3 },
      { name: 'Mocha', level: 3 },
      { name: 'Cypress', level: 2 },
      { name: 'Selenium', level: 2 },
      { name: 'Unit Testing', level: 4 },
      { name: 'Integration Testing', level: 3 },
      { name: 'E2E Testing', level: 2 }
    ]
  },
  'Data Scientist': {
    'Programming Languages': [
      { name: 'Python', level: 5 },
      { name: 'R', level: 4 },
      { name: 'SQL', level: 4 },
      { name: 'Julia', level: 2 },
      { name: 'Scala', level: 2 }
    ],
    'Data Analysis': [
      { name: 'Pandas', level: 5 },
      { name: 'NumPy', level: 4 },
      { name: 'Matplotlib', level: 4 },
      { name: 'Seaborn', level: 3 },
      { name: 'Plotly', level: 3 },
      { name: 'Jupyter Notebooks', level: 5 },
      { name: 'Data Cleaning', level: 4 },
      { name: 'Exploratory Data Analysis', level: 4 }
    ],
    'Machine Learning': [
      { name: 'Scikit-learn', level: 4 },
      { name: 'TensorFlow', level: 3 },
      { name: 'PyTorch', level: 3 },
      { name: 'Keras', level: 3 },
      { name: 'XGBoost', level: 3 },
      { name: 'LightGBM', level: 2 },
      { name: 'Deep Learning', level: 3 },
      { name: 'NLP', level: 2 },
      { name: 'Computer Vision', level: 2 }
    ],
    'Big Data': [
      { name: 'Apache Spark', level: 3 },
      { name: 'Hadoop', level: 2 },
      { name: 'Kafka', level: 2 },
      { name: 'Hive', level: 2 },
      { name: 'Airflow', level: 2 }
    ],
    'Databases': [
      { name: 'PostgreSQL', level: 4 },
      { name: 'MongoDB', level: 3 },
      { name: 'Redis', level: 3 },
      { name: 'Elasticsearch', level: 2 },
      { name: 'Cassandra', level: 2 }
    ],
    'Visualization': [
      { name: 'Tableau', level: 3 },
      { name: 'Power BI', level: 2 },
      { name: 'D3.js', level: 2 },
      { name: 'Bokeh', level: 2 },
      { name: 'Dash', level: 2 }
    ]
  },
  'Product Manager': {
    'Product Strategy': [
      { name: 'Product Roadmapping', level: 4 },
      { name: 'Market Research', level: 4 },
      { name: 'Competitive Analysis', level: 4 },
      { name: 'User Research', level: 3 },
      { name: 'A/B Testing', level: 3 },
      { name: 'Product Metrics', level: 4 },
      { name: 'Go-to-Market Strategy', level: 3 }
    ],
    'Tools & Platforms': [
      { name: 'Jira', level: 4 },
      { name: 'Confluence', level: 3 },
      { name: 'Figma', level: 3 },
      { name: 'Miro', level: 3 },
      { name: 'Slack', level: 4 },
      { name: 'Notion', level: 3 },
      { name: 'Amplitude', level: 2 },
      { name: 'Mixpanel', level: 2 },
      { name: 'Google Analytics', level: 3 }
    ],
    'Methodologies': [
      { name: 'Agile', level: 4 },
      { name: 'Scrum', level: 4 },
      { name: 'Kanban', level: 3 },
      { name: 'Design Thinking', level: 3 },
      { name: 'Lean Startup', level: 3 },
      { name: 'User Story Mapping', level: 3 }
    ],
    'Data Analysis': [
      { name: 'SQL', level: 3 },
      { name: 'Excel', level: 4 },
      { name: 'Google Sheets', level: 4 },
      { name: 'Tableau', level: 2 },
      { name: 'Data Visualization', level: 3 }
    ]
  },
  'UX/UI Designer': {
    'Design Tools': [
      { name: 'Figma', level: 5 },
      { name: 'Adobe XD', level: 4 },
      { name: 'Sketch', level: 3 },
      { name: 'Adobe Photoshop', level: 4 },
      { name: 'Adobe Illustrator', level: 3 },
      { name: 'InVision', level: 3 },
      { name: 'Principle', level: 2 },
      { name: 'Framer', level: 2 }
    ],
    'Design Systems': [
      { name: 'Design Systems', level: 4 },
      { name: 'Component Libraries', level: 4 },
      { name: 'Style Guides', level: 4 },
      { name: 'Design Tokens', level: 3 },
      { name: 'Atomic Design', level: 3 }
    ],
    'User Research': [
      { name: 'User Interviews', level: 4 },
      { name: 'Usability Testing', level: 4 },
      { name: 'Surveys', level: 3 },
      { name: 'A/B Testing', level: 3 },
      { name: 'Analytics', level: 3 },
      { name: 'Persona Development', level: 4 }
    ],
    'Prototyping': [
      { name: 'Wireframing', level: 5 },
      { name: 'Prototyping', level: 4 },
      { name: 'User Flows', level: 4 },
      { name: 'Information Architecture', level: 3 },
      { name: 'Interaction Design', level: 4 }
    ],
    'Frontend Development': [
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'JavaScript', level: 3 },
      { name: 'React', level: 2 },
      { name: 'Vue.js', level: 2 }
    ]
  },
  'Marketing Specialist': {
    'Digital Marketing': [
      { name: 'Google Ads', level: 4 },
      { name: 'Facebook Ads', level: 4 },
      { name: 'Instagram Ads', level: 3 },
      { name: 'LinkedIn Ads', level: 3 },
      { name: 'SEO', level: 4 },
      { name: 'Content Marketing', level: 4 },
      { name: 'Email Marketing', level: 4 },
      { name: 'Social Media Marketing', level: 4 }
    ],
    'Analytics & Tools': [
      { name: 'Google Analytics', level: 4 },
      { name: 'Google Tag Manager', level: 3 },
      { name: 'Facebook Pixel', level: 3 },
      { name: 'Hotjar', level: 2 },
      { name: 'SEMrush', level: 3 },
      { name: 'Ahrefs', level: 2 },
      { name: 'Mailchimp', level: 3 },
      { name: 'HubSpot', level: 2 }
    ],
    'Content Creation': [
      { name: 'Copywriting', level: 4 },
      { name: 'Content Strategy', level: 4 },
      { name: 'Blog Writing', level: 3 },
      { name: 'Video Editing', level: 2 },
      { name: 'Graphic Design', level: 2 },
      { name: 'Canva', level: 3 }
    ],
    'Campaign Management': [
      { name: 'Campaign Planning', level: 4 },
      { name: 'A/B Testing', level: 3 },
      { name: 'Conversion Optimization', level: 3 },
      { name: 'Lead Generation', level: 3 },
      { name: 'Marketing Automation', level: 2 }
    ]
  },
  'Sales Representative': {
    'Sales Techniques': [
      { name: 'Consultative Selling', level: 4 },
      { name: 'Solution Selling', level: 4 },
      { name: 'Relationship Building', level: 4 },
      { name: 'Negotiation', level: 4 },
      { name: 'Objection Handling', level: 4 },
      { name: 'Closing Techniques', level: 4 },
      { name: 'Prospecting', level: 4 }
    ],
    'CRM & Tools': [
      { name: 'Salesforce', level: 4 },
      { name: 'HubSpot CRM', level: 3 },
      { name: 'Pipedrive', level: 3 },
      { name: 'Zoho CRM', level: 2 },
      { name: 'LinkedIn Sales Navigator', level: 3 },
      { name: 'Zoom', level: 4 },
      { name: 'Microsoft Teams', level: 3 }
    ],
    'Sales Process': [
      { name: 'Lead Qualification', level: 4 },
      { name: 'Pipeline Management', level: 4 },
      { name: 'Forecasting', level: 3 },
      { name: 'Sales Presentations', level: 4 },
      { name: 'Contract Negotiation', level: 3 },
      { name: 'Account Management', level: 3 }
    ],
    'Industry Knowledge': [
      { name: 'Market Analysis', level: 3 },
      { name: 'Competitive Intelligence', level: 3 },
      { name: 'Product Knowledge', level: 4 },
      { name: 'Industry Trends', level: 3 }
    ]
  },
  'Project Manager': {
    'Project Management': [
      { name: 'Project Planning', level: 4 },
      { name: 'Risk Management', level: 4 },
      { name: 'Stakeholder Management', level: 4 },
      { name: 'Resource Allocation', level: 4 },
      { name: 'Budget Management', level: 3 },
      { name: 'Timeline Management', level: 4 },
      { name: 'Quality Assurance', level: 3 }
    ],
    'Methodologies': [
      { name: 'Agile', level: 4 },
      { name: 'Scrum', level: 4 },
      { name: 'Kanban', level: 3 },
      { name: 'Waterfall', level: 3 },
      { name: 'Lean', level: 2 },
      { name: 'Six Sigma', level: 2 }
    ],
    'Tools': [
      { name: 'Microsoft Project', level: 3 },
      { name: 'Jira', level: 4 },
      { name: 'Asana', level: 3 },
      { name: 'Trello', level: 3 },
      { name: 'Monday.com', level: 2 },
      { name: 'Smartsheet', level: 2 },
      { name: 'Slack', level: 4 },
      { name: 'Microsoft Teams', level: 3 }
    ],
    'Leadership': [
      { name: 'Team Leadership', level: 4 },
      { name: 'Conflict Resolution', level: 3 },
      { name: 'Communication', level: 4 },
      { name: 'Decision Making', level: 4 },
      { name: 'Problem Solving', level: 4 }
    ]
  },
  'Financial Analyst': {
    'Financial Analysis': [
      { name: 'Financial Modeling', level: 4 },
      { name: 'Valuation', level: 4 },
      { name: 'Budgeting', level: 4 },
      { name: 'Forecasting', level: 4 },
      { name: 'Risk Analysis', level: 3 },
      { name: 'Investment Analysis', level: 3 },
      { name: 'Cost Analysis', level: 3 }
    ],
    'Tools & Software': [
      { name: 'Excel', level: 5 },
      { name: 'PowerPoint', level: 4 },
      { name: 'Bloomberg Terminal', level: 3 },
      { name: 'FactSet', level: 2 },
      { name: 'S&P Capital IQ', level: 2 },
      { name: 'QuickBooks', level: 3 },
      { name: 'SAP', level: 2 },
      { name: 'Oracle', level: 2 }
    ],
    'Data Analysis': [
      { name: 'SQL', level: 3 },
      { name: 'Python', level: 2 },
      { name: 'R', level: 2 },
      { name: 'Tableau', level: 3 },
      { name: 'Power BI', level: 2 },
      { name: 'Statistical Analysis', level: 3 }
    ],
    'Financial Knowledge': [
      { name: 'GAAP', level: 4 },
      { name: 'IFRS', level: 3 },
      { name: 'Financial Statements', level: 4 },
      { name: 'Ratio Analysis', level: 4 },
      { name: 'Capital Markets', level: 3 },
      { name: 'Corporate Finance', level: 3 }
    ]
  }
};

export default function EditResumePage() {
  const router = useRouter();
  const params = useParams();
  const { user, isLoading, isHydrated } = useAuth();
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [showSkillSelector, setShowSkillSelector] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<string>('');
  const [selectedSkillCategories, setSelectedSkillCategories] = useState<string[]>([]);
  const [skillsHeading, setSkillsHeading] = useState<string>('Technical Skills');

  const templateId = params.templateId as string;

  // Helper function to get skills for a profession
  const getSkillsForProfession = (profession: string) => {
    const professionData = PROFESSION_SKILLS[profession as keyof typeof PROFESSION_SKILLS];
    return professionData || {};
  };

  // Helper function to add skills from selector
  const addSkillsFromSelector = (profession: string, selectedCategories: string[]) => {
    const professionSkills = getSkillsForProfession(profession);
    const newSkills = selectedCategories.map(category => ({
      category,
      skills: professionSkills[category as keyof typeof professionSkills] || []
    }));
    
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ...newSkills]
    }));
  };

  // Load saved resume data on component mount
  useEffect(() => {
    if (templateId) {
      const savedData = localStorage.getItem(`resume_${templateId}`);
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          // Ensure all fields have proper initial values to prevent controlled/uncontrolled input warnings
          setResumeData({
            personalInfo: {
              firstName: parsedData.personalInfo?.firstName || '',
              lastName: parsedData.personalInfo?.lastName || '',
              email: parsedData.personalInfo?.email || '',
              phone: parsedData.personalInfo?.phone || '',
              location: parsedData.personalInfo?.location || '',
              linkedin: parsedData.personalInfo?.linkedin || '',
              website: parsedData.personalInfo?.website || '',
              summary: parsedData.personalInfo?.summary || ''
            },
            experience: parsedData.experience || [],
            education: parsedData.education || [],
            skills: parsedData.skills || [{ category: '', skills: [{ name: '', level: 3 }] }],
            projects: parsedData.projects || [],
            certifications: parsedData.certifications || [],
            languages: parsedData.languages || []
          });
        } catch (error) {
          console.error('Error parsing saved resume data:', error);
        }
      }
    }
  }, [templateId]);

  // Auto-populate with user data if available
  useEffect(() => {
    if (user && resumeData.personalInfo.firstName === '' && resumeData.personalInfo.lastName === '' && resumeData.personalInfo.email === '') {
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
  }, [user]);

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
      skills: [...prev.skills, { category: '', skills: [{ name: '', level: 3 }] }]
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
          ? { ...skillGroup, skills: [...skillGroup.skills, { name: '', level: 3 }] }
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

  const handleSkillChange = (skillGroupIndex: number, skillIndex: number, field: 'name' | 'level', value: string | number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map((skillGroup, i) => 
        i === skillGroupIndex 
          ? { 
              ...skillGroup, 
              skills: skillGroup.skills.map((skill, j) => 
                j === skillIndex ? { ...skill, [field]: value } : skill
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
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'languages', label: 'Languages', icon: Globe }
  ];

  // Star rating component for proficiency levels
  const ProficiencyStars = ({ level, onLevelChange }: { level: number; onLevelChange: (level: number) => void }) => (
    <div className="flex items-center space-x-2">
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((starLevel) => (
          <button
            key={starLevel}
            type="button"
            onClick={() => onLevelChange(starLevel)}
            className={`w-6 h-6 rounded-full border-2 transition-colors ${
              starLevel <= level
                ? 'bg-blue-500 border-blue-500 text-white'
                : 'border-blue-500 text-transparent hover:bg-blue-100'
            }`}
            title={`Level ${starLevel}`}
          >
            {starLevel <= level ? '★' : '☆'}
          </button>
        ))}
      </div>
      <span className="text-sm text-gray-600 font-medium">({level}/5)</span>
    </div>
  );

  // Transform data for template compatibility
  const transformDataForTemplate = (data: ResumeData) => {
    const baseData = {
      personalInfo: {
        firstName: data.personalInfo?.firstName || '',
        lastName: data.personalInfo?.lastName || '',
        email: data.personalInfo?.email || '',
        phone: data.personalInfo?.phone || '',
        location: data.personalInfo?.location || '',
        linkedin: data.personalInfo?.linkedin || '',
        website: data.personalInfo?.website || '',
        summary: data.personalInfo?.summary || ''
      },
      summary: data.personalInfo?.summary || '',
      experience: (data.experience || []).map(exp => ({
        title: exp.position || '',
        company: exp.company || '',
        location: exp.location || '',
        startDate: exp.startDate || '',
        endDate: exp.endDate || '',
        description: exp.description || []
      })),
      education: (data.education || []).map(edu => ({
        degree: `${edu.degree || ''} in ${edu.field || ''}`,
        institution: edu.institution || '',
        location: edu.location || '',
        startDate: edu.startDate || '',
        endDate: edu.endDate || '',
        gpa: edu.gpa || '',
        honors: Array.isArray(edu.honors) ? edu.honors.join(', ') : edu.honors || ''
      })),
      projects: (data.projects || []).map(proj => ({
        name: proj.name || '',
        description: proj.description || '',
        technologies: proj.technologies || [],
        link: proj.link || '',
        startDate: proj.startDate || '',
        endDate: proj.endDate || ''
      })),
      certifications: (data.certifications || []).map(cert => ({
        name: cert.name || '',
        issuer: cert.issuer || '',
        date: cert.date || '',
        link: cert.link || ''
      }))
    };

    // Template-specific data transformations
    if (templateId === 'modern-sidebar') {
      return {
        ...baseData,
        skills: {
          technical: (data.skills || []).flatMap(skill => 
            (skill.skills || []).map(s => ({
              name: s.name || '',
              level: s.level || 3
            }))
          ),
          soft: (data.skills || []).filter(skill => 
            skill.category?.toLowerCase().includes('soft') || 
            skill.category?.toLowerCase().includes('communication') ||
            skill.category?.toLowerCase().includes('leadership')
          ).flatMap(skill => 
            (skill.skills || []).map(s => ({
              name: s.name || '',
              level: s.level || 3
            }))
          ),
          languages: (data.languages || []).map(lang => ({
            name: lang.language || '',
            level: lang.proficiency === 'Native' ? 5 : 
                   lang.proficiency === 'Fluent' ? 4 :
                   lang.proficiency === 'Intermediate' ? 3 :
                   lang.proficiency === 'Basic' ? 2 : 1
          }))
        }
      };
    } else {
      // For modern-ats, classic-executive, minimalist-tech, creative-designer
      return {
        ...baseData,
        skills: (data.skills || []).map(skillGroup => ({
          category: skillGroup.category || '',
          skills: (skillGroup.skills || []).map(skill => skill.name || '')
        })),
        languages: (data.languages || []).map(lang => ({
          language: lang.language || '',
          proficiency: lang.proficiency || ''
        }))
      };
    }
  };

  // Get the template component
  let TemplateComponent: React.ComponentType<{ data: any; templateId: string }> | null = null;
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
    case 'modern-sidebar':
      TemplateComponent = ModernSidebarTemplate;
      templateName = 'Modern Sidebar';
      break;
    default:
      TemplateComponent = null;
      templateName = 'Unknown Template';
      break;
  }

  // Template-specific features
  const isModernSidebar = templateId === 'modern-sidebar';
  const isCreativeDesigner = templateId === 'creative-designer';
  const isModernATS = templateId === 'modern-ats';
  const isClassicExecutive = templateId === 'classic-executive';
  const isMinimalistTech = templateId === 'minimalist-tech';

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
        { category: 'Programming Languages', skills: [
          { name: 'JavaScript', level: 4 },
          { name: 'TypeScript', level: 4 },
          { name: 'Python', level: 3 }
        ]},
        { category: 'Frameworks', skills: [
          { name: 'React', level: 4 },
          { name: 'Next.js', level: 3 },
          { name: 'Node.js', level: 4 }
        ]},
        { category: 'Databases', skills: [
          { name: 'PostgreSQL', level: 4 },
          { name: 'MongoDB', level: 3 },
          { name: 'Redis', level: 3 }
        ]},
        { category: 'Tools', skills: [
          { name: 'Git', level: 4 },
          { name: 'Docker', level: 3 },
          { name: 'AWS', level: 3 }
        ]}
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

  const handleExport = async () => {
    // Ensure preview is visible so we print the rendered resume
    if (!showPreview) {
      setShowPreview(true);
      // Wait for preview to render
      setTimeout(() => {
        window.print();
      }, 0);
      return;
    }
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10 no-print">
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
              <Button variant="outline" className="flex items-center space-x-2" onClick={handleExport}>
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
          <div className="lg:col-span-1 no-print">
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
              <Card className="no-print">
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
                            value={resumeData.personalInfo?.firstName || ''}
                            onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                            placeholder="John"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={resumeData.personalInfo?.lastName || ''}
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
                            value={resumeData.personalInfo?.email || ''}
                            onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={resumeData.personalInfo?.phone || ''}
                            onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                            placeholder="+1 (555) 123-4567"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={resumeData.personalInfo?.location || ''}
                          onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
                          placeholder="New York, NY"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="linkedin">LinkedIn</Label>
                          <Input
                            id="linkedin"
                            value={resumeData.personalInfo?.linkedin || ''}
                            onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                            placeholder="linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <Label htmlFor="website">
                            {isCreativeDesigner ? 'Portfolio Website' : 'Website'}
                          </Label>
                          <Input
                            id="website"
                            value={resumeData.personalInfo?.website || ''}
                            onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                            placeholder={isCreativeDesigner ? "https://yourportfolio.com" : "johndoe.com"}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="summary">Professional Summary</Label>
                        <Textarea
                          id="summary"
                          value={resumeData.personalInfo?.summary || ''}
                          onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                          placeholder={isCreativeDesigner ? "Describe your creative expertise and artistic vision..." : "Experienced software engineer with 5+ years..."}
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
                                  value={exp.company || ''}
                                  onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                  placeholder="Company Name"
                                />
                              </div>
                              <div>
                                <Label>Position</Label>
                                <Input
                                  value={exp.position || ''}
                                  onChange={(e) => handleExperienceChange(index, 'position', e.target.value)}
                                  placeholder="Job Title"
                                />
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div>
                                <Label>Location</Label>
                                <Input
                                  value={exp.location || ''}
                                  onChange={(e) => handleExperienceChange(index, 'location', e.target.value)}
                                  placeholder="City, State"
                                />
                              </div>
                              <div>
                                <Label>Start Date</Label>
                                <Input
                                  type="date"
                                  value={exp.startDate || ''}
                                  onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label>End Date</Label>
                                <Input
                                  type="date"
                                  value={exp.endDate || ''}
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
                                    value={desc || ''}
                                    onChange={(e) => handleExperienceDescriptionChange(index, descIndex, e.target.value)}
                                    placeholder={isCreativeDesigner ? "Describe your creative achievements and impact..." : "Describe your responsibilities and achievements..."}
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

                  {/* Skills Section with Template-Specific Features */}
                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">
                          {isCreativeDesigner ? 'Creative Skills' : 
                           isModernATS ? 'Technical Skills' :
                           isClassicExecutive ? 'Core Competencies' :
                           'Skills'}
                        </h3>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => setShowSkillSelector(true)} 
                            variant="outline" 
                            size="sm"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Add from Template
                          </Button>
                          <Button onClick={addSkillGroup} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Skill Category
                          </Button>
                        </div>
                      </div>

                      {/* Custom heading for Modern ATS */}
                      {isModernATS && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label>Skills Section Heading</Label>
                            <Input
                              value={skillsHeading}
                              onChange={(e) => setSkillsHeading(e.target.value)}
                              placeholder="Technical Skills"
                            />
                          </div>
                        </div>
                      )}

                      {/* Modern Sidebar Template - Proficiency Circles Info */}
                      {isModernSidebar && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm text-blue-700 mb-2">
                            <Star className="w-4 h-4 inline mr-1" />
                            Use the proficiency level to indicate your skill level (1-5) - this will show as circles in the template
                          </p>
                        </div>
                      )}

                      {/* Template-specific skill section titles */}
                      {isModernATS && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700 mb-2">
                            💡 This template displays skills as "Technical Skills" with categories
                          </p>
                        </div>
                      )}
                      {isClassicExecutive && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700 mb-2">
                            💡 This template displays skills as "Core Competencies" with bullet separators
                          </p>
                        </div>
                      )}
                      {isMinimalistTech && (
                        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                          <p className="text-sm text-gray-700 mb-2">
                            💡 This template displays skills with a minimalist tech style
                          </p>
                        </div>
                      )}

                      {/* Skill Selector Modal */}
                      {showSkillSelector && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
                            <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">Select Skills from Template</h3>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setShowSkillSelector(false);
                                  setSelectedProfession('');
                                  setSelectedSkillCategories([]);
                                }}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <Label>Select Profession</Label>
                                <select
                                  value={selectedProfession}
                                  onChange={(e) => {
                                    setSelectedProfession(e.target.value);
                                    setSelectedSkillCategories([]);
                                  }}
                                  className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                >
                                  <option value="">Choose a profession...</option>
                                  {Object.keys(PROFESSION_SKILLS).map(profession => (
                                    <option key={profession} value={profession}>
                                      {profession}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              {selectedProfession && (
                                <div>
                                  <Label>Select Skill Categories</Label>
                                  <div className="grid grid-cols-2 gap-2 mt-2">
                                    {Object.keys(getSkillsForProfession(selectedProfession)).map(category => (
                                      <label key={category} className="flex items-center space-x-2">
                                        <input
                                          type="checkbox"
                                          checked={selectedSkillCategories.includes(category)}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              setSelectedSkillCategories([...selectedSkillCategories, category]);
                                            } else {
                                              setSelectedSkillCategories(selectedSkillCategories.filter(c => c !== category));
                                            }
                                          }}
                                          className="rounded"
                                        />
                                        <span className="text-sm">{category}</span>
                                      </label>
                                    ))}
                                  </div>
                                </div>
                              )}

                              <div className="flex justify-end space-x-2 pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => {
                                    setShowSkillSelector(false);
                                    setSelectedProfession('');
                                    setSelectedSkillCategories([]);
                                  }}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  onClick={() => {
                                    if (selectedProfession && selectedSkillCategories.length > 0) {
                                      addSkillsFromSelector(selectedProfession, selectedSkillCategories);
                                      setShowSkillSelector(false);
                                      setSelectedProfession('');
                                      setSelectedSkillCategories([]);
                                    }
                                  }}
                                  disabled={!selectedProfession || selectedSkillCategories.length === 0}
                                >
                                  Add Selected Skills
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
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
                                value={skillGroup.category || ''}
                                onChange={(e) => handleSkillsChange(index, 'category', e.target.value)}
                                placeholder={
                                  isCreativeDesigner ? "Design Tools, Creative Software, etc." :
                                  isModernATS ? "Programming Languages, Frameworks, etc." :
                                  isClassicExecutive ? "Leadership, Management, etc." :
                                  isMinimalistTech ? "Languages, Frameworks, etc." :
                                  "Programming Languages, Tools, etc."
                                }
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
                              {isModernSidebar && (
                                <p className="text-sm text-gray-500 mb-3">
                                  Set proficiency level: 1=Beginner, 2=Basic, 3=Intermediate, 4=Advanced, 5=Expert
                                </p>
                              )}
                              {skillGroup.skills.map((skill, skillIndex) => (
                                <div key={skillIndex} className="flex items-center space-x-2 mb-2">
                                  <div className="flex-1">
                                    <Input
                                      value={skill.name || ''}
                                      onChange={(e) => handleSkillChange(index, skillIndex, 'name', e.target.value)}
                                      placeholder={
                                        isCreativeDesigner ? "Adobe Photoshop, Figma, etc." :
                                        isModernATS ? "JavaScript, React, Node.js..." :
                                        isClassicExecutive ? "Strategic Planning, Team Leadership..." :
                                        isMinimalistTech ? "Python, Docker, Kubernetes..." :
                                        "JavaScript, React, Node.js..."
                                      }
                                    />
                                  </div>
                                  {isModernSidebar && (
                                    <div className="flex items-center space-x-2">
                                      <Label className="text-sm whitespace-nowrap">Level:</Label>
                                      <ProficiencyStars 
                                        level={skill.level} 
                                        onLevelChange={(level) => handleSkillChange(index, skillIndex, 'level', level)} 
                                      />
                                    </div>
                                  )}
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
                            <div>
                              <Label>Location</Label>
                              <Input
                                value={edu.location}
                                onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                                placeholder="City, State"
                              />
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

                  {/* Certifications Section */}
                  {activeSection === 'certifications' && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Certifications</h3>
                        <Button onClick={addCertification} size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Certification
                        </Button>
                      </div>
                      {resumeData.certifications.map((cert, index) => (
                        <Card key={index} className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-md font-medium">Certification #{index + 1}</h4>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeCertification(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label>Certification Name</Label>
                              <Input
                                value={cert.name || ''}
                                onChange={(e) => handleCertificationsChange(index, 'name', e.target.value)}
                                placeholder="AWS Certified Solutions Architect"
                              />
                            </div>
                            <div>
                              <Label>Issuing Organization</Label>
                              <Input
                                value={cert.issuer || ''}
                                onChange={(e) => handleCertificationsChange(index, 'issuer', e.target.value)}
                                placeholder="Amazon Web Services"
                              />
                            </div>
                            <div>
                              <Label>Date Obtained</Label>
                              <Input
                                value={cert.date || ''}
                                onChange={(e) => handleCertificationsChange(index, 'date', e.target.value)}
                                placeholder="January 2024"
                              />
                            </div>
                            <div>
                              <Label>Verification Link (Optional)</Label>
                              <Input
                                value={cert.link || ''}
                                onChange={(e) => handleCertificationsChange(index, 'link', e.target.value)}
                                placeholder="https://example.com/verify"
                              />
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
              <div className="bg-white rounded-lg shadow-lg print-area">
                {TemplateComponent ? (
                  isModernATS ? (
                    <ModernATSTemplate 
                      data={transformDataForTemplate(resumeData)} 
                      templateId={templateId} 
                      skillsHeading={skillsHeading || 'Technical Skills'}
                    />
                  ) : (
                    <TemplateComponent 
                      data={transformDataForTemplate(resumeData)} 
                      templateId={templateId} 
                    />
                  )
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
      
      {/* Footer */}
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
}
