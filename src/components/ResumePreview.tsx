import React from 'react';
import type { ResumeData } from '../types';

interface ResumePreviewProps {
  data: ResumeData;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  return (
    <div id="resume-canvas" className="resume-preview p-12 text-sm text-slate-800 flex flex-col gap-6 overflow-hidden">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-6 text-center">
        <h1 className="text-4xl font-display font-bold uppercase tracking-tight text-slate-950 mb-2">
          {data.headline.fullName}
        </h1>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-slate-600 font-medium">
          {data.headline.email && <span>{data.headline.email}</span>}
          {data.headline.phone && <span>• {data.headline.phone}</span>}
          {data.headline.location && <span>• {data.headline.location}</span>}
          {data.headline.website && <span>• {data.headline.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {data.summary && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Profile</h2>
          <p className="leading-relaxed whitespace-pre-wrap">{data.summary}</p>
        </section>
      )}

      {/* Experience */}
      {data.experiences.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Professional Experience</h2>
          <div className="flex flex-col gap-4">
            {data.experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-slate-900">{exp.position}</h3>
                  <span className="text-xs text-slate-500 font-medium italic">{exp.startDate} — {exp.endDate}</span>
                </div>
                <div className="text-slate-700 font-semibold mb-1">{exp.company}</div>
                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[13px]">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {data.educations.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Education</h2>
          <div className="flex flex-col gap-3">
            {data.educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-slate-900">{edu.school}</h3>
                  <div className="text-slate-600">{edu.degree}</div>
                </div>
                <span className="text-xs text-slate-500 font-medium">{edu.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {data.skills.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Skills & Expertise</h2>
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {data.skills.map((skill, i) => (
              <span key={i} className="text-slate-700">
                {skill}{i !== data.skills.length - 1 ? "•" : ""}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Achievements */}
      {data.achievements.length > 0 && (
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Key Achievements</h2>
          <ul className="list-disc list-inside flex flex-col gap-1 text-slate-700">
            {data.achievements.map((ach, i) => (
              <li key={i} className="leading-relaxed">{ach}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Custom Sections */}
      {data.customSections.map((section) => (
        <section key={section.id}>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">{section.title}</h2>
          <p className="leading-relaxed whitespace-pre-wrap text-slate-700">{section.content}</p>
        </section>
      ))}
    </div>
  );
};
