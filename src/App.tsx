/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { ResumeEditor } from './components/ResumeEditor';
import { ResumePreview } from './components/ResumePreview';
import { initialResumeData } from './types';
import type { ResumeData } from './types';
import { Printer, Download, Layout as LayoutIcon, FileText, Github } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [data, setData] = useState<ResumeData>(initialResumeData);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 overflow-hidden">
      {/* Header */}
      <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between z-10 no-print">
        <div className="flex items-center gap-2">
          <div className="bg-slate-900 text-white p-1.5 rounded-lg">
            <FileText size={20} />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-slate-900">CraftResume</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-medium text-sm hover:bg-slate-800 transition-all shadow-sm active:scale-95"
          >
            <Printer size={18} />
            Print to PDF
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex overflow-hidden">
        {/* Editor (Left Pane) */}
        <aside className="w-[450px] border-r border-slate-200 bg-white no-print">
          <ResumeEditor data={data} onChange={setData} />
        </aside>

        {/* Preview (Right Pane) */}
        <section className="flex-1 overflow-y-auto bg-slate-200 p-8 custom-scrollbar">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full flex justify-center"
          >
            <ResumePreview data={data} />
          </motion.div>
        </section>
      </main>

      {/* Footer Info (Optional) */}
      <footer className="h-8 bg-white border-t border-slate-100 px-4 flex items-center justify-center text-[10px] text-slate-400 font-medium uppercase tracking-widest no-print">
        Crafting Professional Identities • Built with React & Tailwind
      </footer>
    </div>
  );
}
