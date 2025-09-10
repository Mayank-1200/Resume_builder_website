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

interface ClassicExecutiveTemplateProps {
  data: ResumeData;
  templateId: string;
}

export default function ClassicExecutiveTemplate({ data, templateId }: ClassicExecutiveTemplateProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const formatDateRange = (startDate: string, endDate: string, current: boolean) => {
    const start = formatDate(startDate);
    const end = current ? 'Present' : formatDate(endDate);
    return `${start} - ${end}`;
  };

  return (
    <div className="bg-white text-gray-900 font-serif max-w-4xl mx-auto p-10 shadow-lg print:shadow-none print:p-0 print-area">
      {/* Header Section */}
      <header className="text-center border-b-4 border-gray-800 pb-8 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>
        
        {/* Contact Information - Horizontal Layout */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-700 mb-6">
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
        </div>
        
        {/* Additional Contact Info */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
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
      </header>

      {/* Professional Summary */}
      {data.personalInfo.summary && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-4">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed text-justify">
            {data.personalInfo.summary}
          </p>
        </section>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {exp.position}
                  </h3>
                  <span className="text-sm text-gray-600 font-semibold">
                    {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <p className="text-lg font-semibold text-gray-700">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p className="text-sm text-gray-600 italic">{exp.location}</p>
                  )}
                </div>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {exp.description.map((desc, descIndex) => (
                    <li key={descIndex} className="text-base leading-relaxed">
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            EDUCATION
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm text-gray-600 font-semibold">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <p className="text-lg font-semibold text-gray-700">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-gray-600 italic">{edu.location}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  {edu.gpa && (
                    <span className="font-medium">GPA: {edu.gpa}</span>
                  )}
                  {(
                    (Array.isArray(edu.honors) && edu.honors.length > 0) ||
                    (typeof (edu as any).honors === 'string' && (edu as any).honors.trim().length > 0)
                  ) && (
                    <span className="font-medium">Honors: {Array.isArray(edu.honors) ? edu.honors.join(', ') : (edu as any).honors}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            CORE COMPETENCIES
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-gray-300 pb-2">
                  {skillGroup.category}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {skillGroup.skills.join(' • ')}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            KEY PROJECTS & INITIATIVES
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="mb-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">
                    {project.name}
                  </h3>
                  {(project.startDate || project.endDate) && (
                    <span className="text-sm text-gray-600">
                      {formatDateRange(project.startDate, project.endDate, false)}
                    </span>
                  )}
                </div>
                {project.description && (
                  <p className="text-gray-700 text-base mb-3 leading-relaxed">
                    {project.description}
                  </p>
                )}
                {project.technologies && project.technologies.some(t => t && t.trim().length > 0) && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.technologies.filter(t => t && t.trim().length > 0).map((tech, techIndex) => (
                      <span key={techIndex} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                {project.link && (
                  <p className="text-sm text-gray-600">
                    🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline">
                      View Project Details
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            PROFESSIONAL CERTIFICATIONS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {data.certifications.map((cert, index) => (
              <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-gray-700 font-semibold mb-1">{cert.issuer}</p>
                <p className="text-sm text-gray-600 mb-2">{cert.date}</p>
                {cert.link && (
                  <p className="text-sm text-gray-600">
                    🔗 <a href={cert.link} target="_blank" rel="noopener noreferrer" className="underline">
                      Verify Certification
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 border-b-2 border-gray-400 pb-3 mb-6">
            LANGUAGE PROFICIENCY
          </h2>
          <div className="flex flex-wrap gap-6">
            {data.languages.map((lang, index) => (
              <div key={index} className="bg-gray-100 px-6 py-3 rounded-lg border border-gray-300">
                <span className="font-bold text-gray-900 text-lg">{lang.language}</span>
                <span className="text-gray-600 ml-3 font-medium">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16 pt-8 border-t-2 border-gray-300 no-print">
        <p className="font-medium">Generated with Resume Builder • Template: {templateId}</p>
      </footer>
    </div>
  );
}
