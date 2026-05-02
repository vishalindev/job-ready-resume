import React, { useState } from 'react';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import type { ResumeData, Experience, Education, CustomSection } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ResumeEditorProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export const ResumeEditor: React.FC<ResumeEditorProps> = ({ data, onChange }) => {
  const [activeSection, setActiveSection] = useState<string | null>('headline');

  const updateHeadline = (field: keyof ResumeData['headline'], value: string) => {
    onChange({
      ...data,
      headline: { ...data.headline, [field]: value }
    });
  };

  const addItem = (type: 'experiences' | 'educations' | 'customSections') => {
    const newItem = {
      id: Math.random().toString(36).substr(2, 9),
      ...(type === 'experiences' ? { company: '', position: '', startDate: '', endDate: '', description: '' } : {}),
      ...(type === 'educations' ? { school: '', degree: '', year: '' } : {}),
      ...(type === 'customSections' ? { title: 'New Section', content: '' } : {}),
    };

    onChange({
      ...data,
      [type]: [...(data[type] as any[]), newItem]
    });
  };

  const updateItem = (type: 'experiences' | 'educations' | 'customSections', id: string, field: string, value: string) => {
    onChange({
      ...data,
      [type]: (data[type] as any[]).map(item => item.id === id ? { ...item, [field]: value } : item)
    });
  };

  const removeItem = (type: 'experiences' | 'educations' | 'customSections', id: string) => {
    onChange({
      ...data,
      [type]: (data[type] as any[]).filter(item => item.id !== id)
    });
  };

  const handleArrayChange = (type: 'skills' | 'achievements', index: number, value: string) => {
    const newArr = [...data[type]];
    newArr[index] = value;
    onChange({ ...data, [type]: newArr });
  };

  const addArrayItem = (type: 'skills' | 'achievements') => {
    onChange({ ...data, [type]: [...data[type], ''] });
  };

  const removeArrayItem = (type: 'skills' | 'achievements', index: number) => {
    onChange({ ...data, [type]: data[type].filter((_, i) => i !== index) });
  };

  const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border border-slate-200 rounded-lg overflow-hidden mb-4 bg-white shadow-sm">
      <button
        onClick={() => setActiveSection(activeSection === id ? null : id)}
        className="w-full px-4 py-3 flex justify-between items-center bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <span className="font-semibold text-slate-700">{title}</span>
        {activeSection === id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <AnimatePresence>
        {activeSection === id && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-slate-200 space-y-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-slate-50 overflow-y-auto custom-scrollbar p-6">
      <Section id="headline" title="Headline Information">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Full Name</label>
            <input
              type="text"
              value={data.headline.fullName}
              onChange={(e) => updateHeadline('fullName', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Email</label>
            <input
              type="email"
              value={data.headline.email}
              onChange={(e) => updateHeadline('email', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Phone</label>
            <input
              type="text"
              value={data.headline.phone}
              onChange={(e) => updateHeadline('phone', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Location</label>
            <input
              type="text"
              value={data.headline.location}
              onChange={(e) => updateHeadline('location', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Website</label>
            <input
              type="text"
              value={data.headline.website}
              onChange={(e) => updateHeadline('website', e.target.value)}
              className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none"
            />
          </div>
        </div>
      </Section>

      <Section id="summary" title="Professional Summary">
        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Bio / Summary</label>
        <textarea
          value={data.summary}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          className="w-full p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none min-h-[120px]"
          placeholder="Tell your professional story..."
        />
      </Section>

      <Section id="experiences" title="Experience">
        {data.experiences.map((exp) => (
          <div key={exp.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 mb-4 group relative">
            <button
              onClick={() => removeItem('experiences', exp.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Position</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateItem('experiences', exp.id, 'position', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Company</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateItem('experiences', exp.id, 'company', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateItem('experiences', exp.id, 'startDate', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">End Date</label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateItem('experiences', exp.id, 'endDate', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Description</label>
                <textarea
                  value={exp.description}
                  onChange={(e) => updateItem('experiences', exp.id, 'description', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none min-h-[80px] resize-none"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => addItem('experiences')}
          className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Experience
        </button>
      </Section>

      <Section id="educations" title="Education">
        {data.educations.map((edu) => (
          <div key={edu.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 mb-4 group relative">
            <button
              onClick={() => removeItem('educations', edu.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase block">School / University</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) => updateItem('educations', edu.id, 'school', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateItem('educations', edu.id, 'degree', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase block">Year</label>
                <input
                  type="text"
                  value={edu.year}
                  onChange={(e) => updateItem('educations', edu.id, 'year', e.target.value)}
                  className="w-full p-1 border-b border-slate-200 bg-transparent focus:border-slate-900 outline-none"
                />
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => addItem('educations')}
          className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Education
        </button>
      </Section>

      <Section id="skills" title="Skills">
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <div key={i} className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-slate-200">
              <input
                type="text"
                value={skill}
                onChange={(e) => handleArrayChange('skills', i, e.target.value)}
                className="bg-transparent outline-none w-24 text-sm"
              />
              <button onClick={() => removeArrayItem('skills', i)} className="text-slate-400 hover:text-red-500">
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => addArrayItem('skills')}
            className="px-3 py-1 bg-slate-900 text-white rounded text-xs hover:bg-slate-800 transition-colors flex items-center gap-1"
          >
            <Plus size={12} /> Add
          </button>
        </div>
      </Section>

      <Section id="achievements" title="Achievements">
        {data.achievements.map((ach, i) => (
          <div key={i} className="flex items-start gap-2 mb-2">
            <textarea
              value={ach}
              onChange={(e) => handleArrayChange('achievements', i, e.target.value)}
              className="flex-1 p-2 border border-slate-200 rounded focus:ring-2 focus:ring-slate-900 outline-none text-sm min-h-[40px]"
            />
            <button onClick={() => removeArrayItem('achievements', i)} className="mt-2 text-slate-400 hover:text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button
          onClick={() => addArrayItem('achievements')}
          className="w-full py-2 border border-slate-200 rounded text-slate-500 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 text-sm"
        >
          <Plus size={16} /> Add Achievement
        </button>
      </Section>

      <Section id="custom" title="Custom Sections">
        {data.customSections.map((section) => (
          <div key={section.id} className="p-4 border border-slate-100 rounded-lg bg-slate-50/50 mb-4 group relative">
            <button
              onClick={() => removeItem('customSections', section.id)}
              className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={16} />
            </button>
            <div className="space-y-3">
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateItem('customSections', section.id, 'title', e.target.value)}
                className="w-full font-bold text-slate-700 bg-transparent border-b border-slate-200 focus:border-slate-900 outline-none"
                placeholder="Section Title"
              />
              <textarea
                value={section.content}
                onChange={(e) => updateItem('customSections', section.id, 'content', e.target.value)}
                className="w-full text-slate-600 bg-transparent border-b border-slate-200 focus:border-slate-900 outline-none min-h-[60px]"
                placeholder="Section Content"
              />
            </div>
          </div>
        ))}
        <button
          onClick={() => addItem('customSections')}
          className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-all flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Custom Section
        </button>
      </Section>
    </div>
  );
};
