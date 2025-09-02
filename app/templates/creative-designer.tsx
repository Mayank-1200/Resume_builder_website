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

interface CreativeDesignerTemplateProps {
  data: ResumeData;
  templateId: string;
}

function CreativeDesignerTemplate({ data, templateId }: CreativeDesignerTemplateProps) {
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
      {/* Header Section with Creative Design */}
      <header className="relative mb-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 rounded-2xl"></div>
        <div className="relative p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-wide">
            {data.personalInfo.firstName} <span className="text-purple-600">{data.personalInfo.lastName}</span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
            {data.personalInfo.summary}
          </p>
          
          {/* Contact Information with Creative Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-700">
            {data.personalInfo.email && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <span className="text-purple-500 mr-2">📧</span>
                {data.personalInfo.email}
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <span className="text-purple-500 mr-2">📱</span>
                {data.personalInfo.phone}
              </div>
            )}
            {data.personalInfo.location && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <span className="text-purple-500 mr-2">📍</span>
                {data.personalInfo.location}
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <span className="text-purple-500 mr-2">💼</span>
                {data.personalInfo.linkedin}
              </div>
            )}
            {data.personalInfo.website && (
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-sm">
                <span className="text-purple-500 mr-2">🌐</span>
                {data.personalInfo.website}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">💼</span>
            </div>
            Professional Experience
          </h2>
          <div className="space-y-8">
            {data.experience.map((exp, index) => (
              <div key={index} className="relative">
                {/* Timeline Element */}
                <div className="absolute left-0 top-0 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg"></div>
                <div className="ml-8 pl-6 border-l-2 border-purple-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <span className="text-sm text-purple-600 font-semibold bg-purple-50 px-3 py-1 rounded-full">
                      {formatDateRange(exp.startDate, exp.endDate, exp.current)}
                    </span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <p className="text-lg font-semibold text-purple-600">
                      {exp.company}
                    </p>
                    {exp.location && (
                      <p className="text-sm text-gray-600 italic">{exp.location}</p>
                    )}
                  </div>
                  <ul className="list-none space-y-2 text-gray-700">
                    {exp.description.map((desc, descIndex) => (
                      <li key={descIndex} className="text-sm leading-relaxed flex items-start">
                        <span className="text-purple-400 mr-3 text-lg">✦</span>
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎓</span>
            </div>
            Education
          </h2>
          <div className="space-y-6">
            {data.education.map((edu, index) => (
              <div key={index} className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-100">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <span className="text-sm text-indigo-600 font-semibold bg-white px-3 py-1 rounded-full">
                    {formatDateRange(edu.startDate, edu.endDate, edu.current)}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <p className="text-lg font-semibold text-indigo-600">
                    {edu.institution}
                  </p>
                  {edu.location && (
                    <p className="text-sm text-gray-600 italic">{edu.location}</p>
                  )}
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  {edu.gpa && (
                    <span className="bg-white px-3 py-1 rounded-full">GPA: {edu.gpa}</span>
                  )}
                  {Array.isArray(edu.honors) && edu.honors.length > 0 && (
                    <span className="bg-white px-3 py-1 rounded-full">Honors: {Array.isArray(edu.honors) ? edu.honors.join(', ') : edu.honors || ''}</span>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">⚡</span>
            </div>
            Creative Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.skills.map((skillGroup, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-xl border border-pink-100">
                <h3 className="text-lg font-bold text-gray-900 mb-3 border-b border-pink-200 pb-2">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="bg-white text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">🎨</span>
            </div>
            Creative Projects
          </h2>
          <div className="space-y-6">
            {data.projects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {project.name}
                  </h3>
                  <span className="text-sm text-purple-600 font-semibold bg-white px-3 py-1 rounded-full">
                    {formatDateRange(project.startDate, project.endDate, false)}
                  </span>
                </div>
                <p className="text-gray-700 text-base mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="bg-white text-purple-700 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
                {project.link && (
                  <p className="text-sm text-purple-600">
                    🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-purple-800">
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏆</span>
            </div>
            Certifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.certifications.map((cert, index) => (
              <div key={index} className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {cert.name}
                </h3>
                <p className="text-indigo-600 font-semibold mb-2">{cert.issuer}</p>
                <p className="text-sm text-gray-600 mb-3">{cert.date}</p>
                {cert.link && (
                  <p className="text-sm text-indigo-600">
                    🔗 <a href={cert.link} target="_blank" rel="noopener noreferrer" className="underline hover:text-indigo-800">
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
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full mr-4 flex items-center justify-center">
              <span className="text-white text-sm font-bold">🌍</span>
            </div>
            Languages
          </h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang, index) => (
              <div key={index} className="bg-gradient-to-r from-pink-100 to-purple-100 px-6 py-3 rounded-xl border border-pink-200">
                <span className="font-bold text-gray-900">{lang.language}</span>
                <span className="text-gray-600 ml-3 font-medium">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-16 pt-8 border-t-2 border-purple-200">
        <p className="font-medium">Generated with Resume Builder • Template: {templateId}</p>
      </footer>
    </div>
  );
}

export default CreativeDesignerTemplate;
