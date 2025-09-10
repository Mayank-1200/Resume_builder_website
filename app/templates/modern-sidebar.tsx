import React from 'react';

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    gpa?: string;
    honors?: string;
  }>;
  skills: {
    technical: Array<{ name: string; level: number }>;
    soft: Array<{ name: string; level: number }>;
    languages: Array<{ name: string; level: number }>;
  };
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    startDate?: string;
    endDate?: string;
  }>;
  certifications?: Array<{
    name: string;
    issuer: string;
    date: string;
    link?: string;
  }>;
}

interface TemplateProps {
  data: ResumeData;
  templateId: string;
}

const ModernSidebarTemplate: React.FC<TemplateProps> = ({ data, templateId }) => {
  const formatDate = (date: string) => {
    if (!date) return 'Present';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  // Safety check for required data
  if (!data || !data.personalInfo) {
    return (
      <div className="min-h-screen bg-white font-sans text-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Template Error</h1>
          <p className="text-gray-600">Required personal information is missing.</p>
        </div>
      </div>
    );
  }

  // Helper to render proficiency circles (5 circles, filled based on level)
  const renderProficiency = (level: number) => (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-2.5 h-2.5 rounded-full ${
            i < level ? 'bg-blue-500' : 'border border-blue-500'
          }`}
        ></div>
      ))}
    </div>
  );

  return (
    <div className="font-sans text-gray-900 bg-white min-h-screen flex shadow-lg max-w-5xl mx-auto my-8 print-area">
      {/* Left Sidebar */}
      <div className="w-1/3 bg-gray-900 text-white p-8 flex flex-col">
        {/* Name and Title */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-blue-300 mb-2">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>
          <p className="text-xl text-gray-400 font-medium">ENTRY-LEVEL DATA SCIENTIST</p>
        </div>

        {/* Contact Info */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">CONTACT</h2>
          <div className="space-y-3 text-gray-300 text-sm">
            {data.personalInfo.email && (
              <div className="flex items-center">
                <span className="text-blue-400 mr-3 text-lg">📧</span>
                <span>{data.personalInfo.email}</span>
              </div>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center">
                <span className="text-blue-400 mr-3 text-lg">📞</span>
                <span>{data.personalInfo.phone}</span>
              </div>
            )}
            {data.personalInfo.location && (
              <div className="flex items-center">
                <span className="text-blue-400 mr-3 text-lg">📍</span>
                <span>{data.personalInfo.location}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <div className="flex items-center">
                <span className="text-blue-400 mr-3 text-lg">🔗</span>
                <a href={data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Hard Skills */}
        {data.skills.technical && data.skills.technical.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">HARD SKILLS</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              {data.skills.technical.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{skill.name}</span>
                  {renderProficiency(skill.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {data.skills.languages && data.skills.languages.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">LANGUAGES</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              {data.skills.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{lang.name}</span>
                  {renderProficiency(lang.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Soft Skills */}
        {data.skills.soft && data.skills.soft.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">SOFT SKILLS</h2>
            <div className="space-y-3 text-gray-300 text-sm">
              {data.skills.soft.map((skill, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{skill.name}</span>
                  {renderProficiency(skill.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">EDUCATION</h2>
            <div className="space-y-4 text-gray-300 text-sm">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h3 className="font-bold text-blue-300 text-base">{edu.degree}</h3>
                  <p className="text-gray-400">{edu.institution}</p>
                  <p className="text-gray-400">{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</p>
                  {edu.location && <p className="text-gray-400">{edu.location}</p>}
                  {edu.gpa && <p className="text-gray-400">GPA: {edu.gpa}</p>}
                  {edu.honors && <p className="text-gray-400">{edu.honors}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4 border-b border-gray-600 pb-2">CERTIFICATION</h2>
            <div className="space-y-4 text-gray-300 text-sm">
              {data.certifications.map((cert, index) => (
                <div key={index}>
                  <h3 className="font-bold text-blue-300 text-base">{cert.name}</h3>
                  <p className="text-gray-400">{cert.issuer}</p>
                  <p className="text-gray-400">{cert.date}</p>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                      View Credential
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-8">
            <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">SUMMARY</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{data.summary}</p>
          </div>
        )}

        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.586l-1.707 1.707A2 2 0 0115 15.586V18a2 2 0 01-2 2H7a2 2 0 01-2-2v-2.414a2 2 0 01-.586-1.414L2 11.586V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1zm-1 7a1 1 0 100 2h6a1 1 0 100-2H8z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">EXPERIENCE</h2>
            </div>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                  <p className="text-gray-600 text-lg mb-3">
                    {exp.company} | {exp.location} | {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 text-lg">
                    {exp.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <div>
            <div className="flex items-center bg-gray-100 rounded-lg p-4 mb-4">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v8a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2a1 1 0 011-1h8a1 1 0 011 1v4a1 1 0 01-1 1H6a1 1 0 01-1-1V6zm10 9a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zm-8 0a1 1 0 011-1h1a1 1 0 110 2H7a1 1 0 01-1-1zm5 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">PROJECTS</h2>
            </div>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={index}>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{project.name}</h3>
                  {(project.startDate || project.endDate || (project.technologies && project.technologies.some(t => t && t.trim().length > 0)) || project.link) && (
                    <p className="text-gray-600 text-lg mb-3">
                      {(project.startDate || project.endDate) && `${formatDate(project.startDate)} - ${formatDate(project.endDate)}`}
                      {(project.startDate || project.endDate) && (project.technologies && project.technologies.some(t => t && t.trim().length > 0)) && ' | '}
                      {project.technologies && project.technologies.filter(t => t && t.trim().length > 0).join(', ')}
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-2">
                          (Link)
                        </a>
                      )}
                    </p>
                  )}
                  <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 mt-12 pt-6 border-t border-gray-200 no-print w-full">
        <p>Generated with Resume Builder • Template: {templateId}</p>
      </footer>
    </div>
  );
};

export default ModernSidebarTemplate;
