'use client';

import React from 'react';

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

interface ModernATSTemplateProps {
  data: ResumeData;
  templateId: string;
}

export default function ModernATSTemplate({ data, templateId }: ModernATSTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white text-gray-900 font-sans max-w-4xl mx-auto p-8 shadow-lg print:shadow-none print:p-0">
      {/* Header Section */}
      <header className="border-b-2 border-blue-600 pb-6 mb-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{data.personalInfo.summary}</p>
          
          {/* Contact Information */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700">
            {data.personalInfo.email && (
              <span className="flex items-center">
                <span className="mr-2">📧</span>
                {data.personalInfo.email}
              </span>
            )}
            {data.personalInfo.phone && (
              <span className="flex items-center">
                <span className="mr-2">📱</span>
                {data.personalInfo.phone}
              </span>
            )}
            {data.personalInfo.location && (
              <span className="flex items-center">
                <span className="mr-2">📍</span>
                {data.personalInfo.location}
              </span>
            )}
            {data.personalInfo.linkedin && (
              <span className="flex items-center">
                <span className="mr-2">💼</span>
                LinkedIn: {data.personalInfo.linkedin}
              </span>
            )}
            {data.personalInfo.website && (
              <span className="flex items-center">
                <span className="mr-2">🌐</span>
                {data.personalInfo.website}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-6">
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <p className="text-lg font-medium text-blue-600">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p className="text-sm text-gray-600">{exp.location}</p>
                  )}
                </div>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-sm leading-relaxed">
                      {desc}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            EDUCATION
          </h2>
          <div className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm text-gray-600 font-medium">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <p className="text-lg font-medium text-blue-600">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-gray-600">{edu.location}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {edu.gpa && (
                    <span>GPA: {edu.gpa}</span>
                  )}
                                      {Array.isArray(edu.honors) && edu.honors.length > 0 && (
                    <span>Honors: {Array.isArray(edu.honors) ? edu.honors.join(', ') : edu.honors || ''}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            TECHNICAL SKILLS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {skillGroup.category}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {skillGroup.skills.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            PROJECTS
          </h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {project.name}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {formatDateRange(project.startDate, project.endDate, false)}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <p className="text-sm text-blue-600 mt-2">
                    🔗 <a href={project.link} target="_blank" rel="noopener noreferrer">
                      View Project
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900">
                  {cert.name}
                </h3>
                <p className="text-blue-600 font-medium">{cert.issuer}</p>
                <p className="text-sm text-gray-600">{cert.date}</p>
                {cert.link && (
                  <p className="text-sm text-blue-600">
                    🔗 <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      Verify
                    </a>
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 mb-6">
            LANGUAGES
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="bg-gray-50 px-4 py-2 rounded">
                <span className="font-medium text-gray-900">{lang.language}</span>
                <span className="text-gray-600 ml-2">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200">
        <p>Generated with Resume Builder • Template: {templateId}</p>
      </footer>
    </div>
  );
}
