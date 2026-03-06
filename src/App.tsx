/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Download, 
  FileText, 
  GraduationCap, 
  User, 
  BookOpen, 
  Calendar, 
  Building2, 
  Layout, 
  Printer, 
  Github, 
  Facebook, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  ShieldCheck, 
  Settings2, 
  X,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { cn } from './lib/utils';
import { FormSection } from './components/FormSection';
import { Input, Select } from './components/FormElements';
import { FormData, CoverType } from './types';

const initialData: FormData = {
  type: 'assignment',
  universityName: 'City University',
  universityDepartment: '',
  courseCode: 'CSE 3117',
  courseTitle: 'Operating System',
  submissionDate: '2026-03-06',
  assignmentNo: '01',
  assignmentTitle: 'Basic File Operations in Linux',
  experimentNo: '01',
  experimentTitle: 'Basic File Operations in Linux',
  teacherName: 'Md. Ajharul Islam Miraj',
  teacherDesignation: 'Lecturer',
  teacherDepartment: '',
  studentName: 'Nomankarim8',
  studentId: '0272320005101116',
  batch: '63',
  program: 'BSc in CSE',
  section: 'A',
};

const DEPARTMENTS = [
  { label: 'Dept. of CSE', value: 'Dept. of CSE' },
  { label: 'Dept. of EEE', value: 'Dept. of EEE' },
  { label: 'Dept. of Civil', value: 'Dept. of Civil' },
  { label: 'Dept. of Pharmacy', value: 'Dept. of Pharmacy' },
  { label: 'Dept. of Business Administration', value: 'Dept. of Business Administration' },
];

const PROGRAMS = [
  { label: 'BSc in CSE', value: 'BSc in CSE' },
  { label: 'BSc in EEE', value: 'BSc in EEE' },
  { label: 'BSc in Civil', value: 'BSc in Civil' },
  { label: 'BBA', value: 'BBA' },
  { label: 'MBA', value: 'MBA' },
];

const SECTIONS = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
];

export default function App() {
  const [data, setData] = useState<FormData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setData({
      ...initialData,
      universityDepartment: '',
      teacherDepartment: '',
      submissionDate: new Date().toISOString().split('T')[0],
    });
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      const element = previewRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${data.type}_${data.courseCode}_${data.studentId}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-zinc-200 py-3 px-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-zinc-900">Ncover</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">Ncover</span>
              <span className="text-[10px] text-primary/60 font-medium">Professional Documents</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-zinc-400 hover:text-primary transition-colors">
                <Github size={20} />
              </button>
              <button className="p-2 text-zinc-400 hover:text-primary transition-colors">
                <Facebook size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-12 space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold border border-primary/20 shadow-sm"
          >
            <Sparkles size={14} />
            <span>Create Professional Cover Pages</span>
            <Sparkles size={14} />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary leading-tight"
          >
            Professional Cover Page <br /> Creator
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 text-lg max-w-2xl mx-auto font-medium"
          >
            Generate beautiful, print-ready cover pages for your academic submissions in seconds with our intuitive design tool
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-sm text-xs font-bold text-zinc-600 uppercase tracking-wider">
              <Zap size={14} className="text-amber-500" />
              Instant Download
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-sm text-xs font-bold text-zinc-600 uppercase tracking-wider">
              <ShieldCheck size={14} className="text-secondary" />
              Professional Quality
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-zinc-200 shadow-sm text-xs font-bold text-zinc-600 uppercase tracking-wider">
              <Settings2 size={14} className="text-primary" />
              Customizable
            </div>
          </motion.div>
        </section>

        {/* Type Selector */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button
            onClick={() => setData(prev => ({ ...prev, type: 'assignment' }))}
            className={cn(
              "group relative flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left overflow-hidden",
              data.type === 'assignment' 
                ? "bg-primary/5 border-primary shadow-xl shadow-primary/10" 
                : "bg-white border-zinc-100 hover:border-zinc-200 shadow-sm"
            )}
          >
            <div className={cn(
              "p-4 rounded-2xl transition-colors",
              data.type === 'assignment' ? "bg-primary text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
            )}>
              <FileText size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Assignment Cover</h3>
              <p className="text-sm font-medium text-zinc-500">Perfect for course assignments and projects</p>
            </div>
            {data.type === 'assignment' && (
              <div className="absolute top-4 right-4 text-primary">
                <CheckCircle2 size={24} fill="currentColor" className="text-white" />
              </div>
            )}
          </button>

          <button
            onClick={() => setData(prev => ({ ...prev, type: 'lab-report' }))}
            className={cn(
              "group relative flex items-center gap-6 p-6 rounded-3xl border-2 transition-all text-left overflow-hidden",
              data.type === 'lab-report' 
                ? "bg-secondary/5 border-secondary shadow-xl shadow-secondary/10" 
                : "bg-white border-zinc-100 hover:border-zinc-200 shadow-sm"
            )}
          >
            <div className={cn(
              "p-4 rounded-2xl transition-colors",
              data.type === 'lab-report' ? "bg-secondary text-white" : "bg-zinc-100 text-zinc-400 group-hover:bg-zinc-200"
            )}>
              <BookOpen size={32} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-zinc-900">Lab Report Cover</h3>
              <p className="text-sm font-medium text-zinc-500">Ideal for laboratory reports and experiments</p>
            </div>
            {data.type === 'lab-report' && (
              <div className="absolute top-4 right-4 text-secondary">
                <CheckCircle2 size={24} fill="currentColor" className="text-white" />
              </div>
            )}
          </button>
        </section>

        {/* Form Sections */}
        <div className="space-y-8">
          <FormSection title="University Information" icon={Building2} color="bg-primary">
            <Input 
              label="University Name" 
              name="universityName" 
              value={data.universityName} 
              onChange={handleInputChange} 
              required 
            />
            <Select 
              label="Department" 
              name="universityDepartment" 
              value={data.universityDepartment} 
              onChange={handleInputChange} 
              options={DEPARTMENTS} 
              required 
            />
          </FormSection>

          <FormSection title="Course Information" icon={BookOpen} color="bg-secondary">
            <Input 
              label="Course Code" 
              name="courseCode" 
              value={data.courseCode} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Course Title" 
              name="courseTitle" 
              value={data.courseTitle} 
              onChange={handleInputChange} 
              required 
            />
            <div className="md:col-span-2">
              <Input 
                label="Submission Date" 
                name="submissionDate" 
                type="date" 
                value={data.submissionDate} 
                onChange={handleInputChange} 
                required 
              />
            </div>
          </FormSection>

          <FormSection 
            title={data.type === 'assignment' ? "Assignment Details" : "Experiment Details"} 
            icon={Layout} 
            color="bg-primary"
          >
            <Input 
              label={data.type === 'assignment' ? "Assignment No" : "Experiment No"} 
              name={data.type === 'assignment' ? "assignmentNo" : "experimentNo"} 
              value={data.type === 'assignment' ? data.assignmentNo : data.experimentNo} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label={data.type === 'assignment' ? "Assignment Title" : "Experiment Title"} 
              name={data.type === 'assignment' ? "assignmentTitle" : "experimentTitle"} 
              value={data.type === 'assignment' ? data.assignmentTitle : data.experimentTitle} 
              onChange={handleInputChange} 
              required 
            />
          </FormSection>

          <FormSection title="Submitted To" icon={User} color="bg-secondary">
            <Input 
              label="Teacher's Name" 
              name="teacherName" 
              value={data.teacherName} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Designation" 
              name="teacherDesignation" 
              value={data.teacherDesignation} 
              onChange={handleInputChange} 
              required 
            />
            <div className="md:col-span-2">
              <Select 
                label="Department" 
                name="teacherDepartment" 
                value={data.teacherDepartment} 
                onChange={handleInputChange} 
                options={DEPARTMENTS} 
                required 
              />
            </div>
          </FormSection>

          <FormSection title="Submitted By" icon={User} color="bg-primary">
            <div className="md:col-span-2">
              <Input 
                label="Full Name" 
                name="studentName" 
                value={data.studentName} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <Input 
              label="Student ID" 
              name="studentId" 
              value={data.studentId} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Batch" 
              name="batch" 
              value={data.batch} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Program" 
              name="program" 
              value={data.program} 
              onChange={handleInputChange} 
              required 
            />
            <Select 
              label="Section" 
              name="section" 
              value={data.section} 
              onChange={handleInputChange} 
              options={SECTIONS} 
              required 
            />
          </FormSection>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 pt-8">
          <button
            onClick={resetForm}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl border border-zinc-200 bg-white text-zinc-600 font-bold hover:bg-zinc-50 transition-all shadow-sm"
          >
            <RotateCcw size={18} />
            Reset Form
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 group"
          >
            Generate Preview
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Eye size={18} />
            </motion.div>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-12 px-6 mt-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-2 rounded-xl">
                <GraduationCap className="text-white w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-zinc-900 leading-none">Ncover</h4>
                <p className="text-xs text-zinc-400 mt-1">Creating professional academic documents with elegance</p>
              </div>
            </div>
            
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                <div className="w-2 h-2 bg-secondary rounded-full" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">© 2026 All rights reserved</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                Crafted with <span className="text-red-500">❤️</span> by 
                <a href="#" className="bg-primary text-white px-3 py-1 rounded-lg font-bold hover:bg-primary/90 transition-all">Nomankarim8</a>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-1">
            <div className="w-2 h-2 rounded-full bg-primary/20" />
            <div className="w-2 h-2 rounded-full bg-primary/40" />
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-secondary" />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-zinc-100 gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                Developed by Nomankarim8
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      <AnimatePresence>
        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-5xl h-full max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-xl">
                    <Printer className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900">Document Preview</h3>
                    <p className="text-xs text-zinc-400">Standard A4 Format • Ready to Print</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={downloadPDF}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-primary/10"
                  >
                    {isGenerating ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Download size={18} />
                    )}
                    Download PDF
                  </button>
                  <button
                    onClick={() => setShowPreview(false)}
                    className="p-2.5 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Modal Content - The A4 Page */}
              <div className="flex-1 overflow-auto bg-zinc-100 p-8 flex justify-center">
                <div 
                  ref={previewRef}
                  className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] flex flex-col items-center text-center relative overflow-hidden"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  {/* Geometric Background Elements */}
                  <div className="absolute inset-0 pointer-events-none opacity-10">
                    <div className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl" />
                  </div>

                  <div className="relative z-10 w-full h-full flex flex-col border-[1px] border-zinc-100 p-8">
                    {/* University Name */}
                    <div className="mt-12 space-y-4">
                      <h1 className="text-4xl font-black tracking-tight text-zinc-900 uppercase">
                        {data.universityName}
                      </h1>
                      <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
                      <p className="text-xl font-bold text-zinc-600">
                        {data.universityDepartment}
                      </p>
                    </div>

                    {/* Document Type */}
                    <div className="flex-1 flex flex-col justify-center items-center space-y-12">
                      <div className="space-y-4">
                        <div className="inline-block px-8 py-3 bg-zinc-900 text-white rounded-full text-2xl font-black tracking-[0.2em] uppercase">
                          {data.type === 'assignment' ? 'Assignment' : 'Lab Report'}
                        </div>
                        {data.type === 'assignment' ? (
                          <p className="text-xl font-bold text-zinc-500">Assignment No: {data.assignmentNo}</p>
                        ) : (
                          <p className="text-xl font-bold text-zinc-500">Experiment No: {data.experimentNo}</p>
                        )}
                      </div>

                      <div className="space-y-6 max-w-2xl">
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-primary uppercase tracking-widest">Course Title</p>
                          <h2 className="text-3xl font-black text-zinc-900 leading-tight">
                            {data.courseTitle}
                          </h2>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm font-bold text-primary uppercase tracking-widest">Course Code</p>
                          <p className="text-2xl font-bold text-zinc-700">{data.courseCode}</p>
                        </div>
                        {data.type === 'assignment' ? (
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest">Assignment Title</p>
                            <p className="text-xl font-bold text-zinc-700">{data.assignmentTitle}</p>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm font-bold text-primary uppercase tracking-widest">Experiment Title</p>
                            <p className="text-xl font-bold text-zinc-700">{data.experimentTitle}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Submission Info */}
                    <div className="grid grid-cols-2 gap-12 text-left mt-auto pt-12 border-t border-zinc-100">
                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-black text-primary uppercase tracking-widest border-b-2 border-primary pb-1 inline-block">
                            Submitted To
                          </h3>
                          <div className="space-y-1">
                            <p className="text-xl font-black text-zinc-900">{data.teacherName}</p>
                            <p className="text-sm font-bold text-zinc-500">{data.teacherDesignation}</p>
                            <p className="text-sm font-bold text-zinc-500">{data.teacherDepartment}</p>
                            <p className="text-sm font-bold text-zinc-500">{data.universityName}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-sm font-black text-secondary uppercase tracking-widest border-b-2 border-secondary pb-1 inline-block">
                            Submitted By
                          </h3>
                          <div className="space-y-1">
                            <p className="text-xl font-black text-zinc-900">{data.studentName}</p>
                            <div className="grid grid-cols-1 gap-1 pt-2">
                              <p className="text-sm font-bold text-zinc-500">ID: <span className="text-zinc-900">{data.studentId}</span></p>
                              <p className="text-sm font-bold text-zinc-500">Batch: <span className="text-zinc-900">{data.batch}</span></p>
                              <p className="text-sm font-bold text-zinc-500">Program: <span className="text-zinc-900">{data.program}</span></p>
                              <p className="text-sm font-bold text-zinc-500">Section: <span className="text-zinc-900">{data.section}</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="mt-12">
                      <p className="text-sm font-bold text-zinc-400 uppercase tracking-[0.3em]">
                        Date of Submission: <span className="text-zinc-900">{data.submissionDate}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
