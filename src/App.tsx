/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Download, FileText, GraduationCap, User, BookOpen, Calendar, Building2, Layout, Printer } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for tailwind classes
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CoverPageData {
  universityName: string;
  courseTitle: string;
  courseCode: string;
  department: string;
  submittedToName: string;
  submittedToDesignation: string;
  submittedToDepartment: string;
  submittedToUniversity: string;
  submittedByName: string;
  studentId: string;
  program: string;
  section: string;
  batch: string;
  submissionDate: string;
  type: 'Assignment' | 'Lab Report';
  universityLogo?: string;
}

const initialData: CoverPageData = {
  universityName: 'City University, Dhaka',
  courseTitle: 'Computer Network Lab',
  courseCode: 'CSE 318',
  department: 'Dept. of CSE',
  submittedToName: 'Md. Jafor Quaderi',
  submittedToDesignation: 'Senior Lecturer',
  submittedToDepartment: 'Dept. of CSE',
  submittedToUniversity: 'City University, Dhaka',
  submittedByName: 'Noman Karim',
  studentId: '0272320005101162',
  program: 'CSE(Day)',
  section: 'A',
  batch: '63',
  submissionDate: new Date().toISOString().split('T')[0],
  type: 'Lab Report',
  universityLogo: 'https://ais-pre-4u3agwdbmwunrpayvjnpy7-478474422739.asia-east1.run.app/api/images/61/image.png',
};

export default function App() {
  const [data, setData] = useState<CoverPageData>(initialData);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData((prev) => ({ ...prev, universityLogo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setData((prev) => ({ ...prev, universityLogo: undefined }));
  };

  const downloadPDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);

    try {
      const element = previewRef.current;
      
      // Create a high-quality canvas of the A4 element
      const canvas = await html2canvas(element, {
        scale: 2, // Higher scale for better print quality (approx 192 DPI)
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        // Ensure we capture the full size regardless of the CSS scale applied for preview
        width: 210 * 3.7795275591, // 210mm in pixels (approx)
        height: 297 * 3.7795275591, // 297mm in pixels (approx)
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById('preview-container');
          if (clonedElement) {
            clonedElement.style.transform = 'none';
            clonedElement.style.scale = '1';
            clonedElement.style.position = 'relative';
            clonedElement.style.margin = '0';
            clonedElement.style.left = '0';
            clonedElement.style.top = '0';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      
      const fileName = `${data.type.replace(/\s+/g, '_')}_${data.courseCode.replace(/\s+/g, '_')}_${data.studentId}.pdf`;
      pdf.save(fileName);
      
      setShowThanks(true);
      setTimeout(() => setShowThanks(false), 5000);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 py-4 px-6 sticky top-0 z-10 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-zinc-900">Ncover</h1>
          </div>
          <div className="flex items-center gap-4">
            {showThanks && (
              <div className="hidden md:flex items-center gap-2 text-emerald-600 font-medium animate-bounce">
                <span className="text-sm">Thanks for using Ncover!</span>
              </div>
            )}
            <button
              onClick={downloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-5 h-5" />
            )}
            Download PDF
          </button>
        </div>
      </div>
    </header>

      <main className="flex-1 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
        {/* Form Section */}
        <section className="space-y-6 no-print">
          <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b border-zinc-100 pb-4">
              <Layout className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold">Cover Page Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> University Name
                </label>
                <input
                  type="text"
                  name="universityName"
                  value={data.universityName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Enter University Name"
                />
              </div>

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-zinc-700">University Logo</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer">
                    <div className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-zinc-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                      <Layout className="w-4 h-4 text-zinc-400" />
                      <span className="text-sm text-zinc-600">Upload Logo (PNG/JPG)</span>
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                  {data.universityLogo && (
                    <button
                      onClick={removeLogo}
                      className="px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-zinc-700">Department</label>
                <input
                  type="text"
                  name="department"
                  value={data.department}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Document Type</label>
                <select
                  name="type"
                  value={data.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all bg-white"
                >
                  <option value="Assignment">Assignment</option>
                  <option value="Lab Report">Lab Report</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-700">Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  value={data.courseCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="col-span-full space-y-2">
                <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Course Title
                </label>
                <input
                  type="text"
                  name="courseTitle"
                  value={data.courseTitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                />
              </div>

              <div className="col-span-full pt-4 border-t border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Submitted To</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Teacher's Name</label>
                    <input
                      type="text"
                      name="submittedToName"
                      value={data.submittedToName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Designation</label>
                    <input
                      type="text"
                      name="submittedToDesignation"
                      value={data.submittedToDesignation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Department</label>
                    <input
                      type="text"
                      name="submittedToDepartment"
                      value={data.submittedToDepartment}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-full space-y-2">
                    <label className="text-sm font-medium text-zinc-700">University / Address</label>
                    <input
                      type="text"
                      name="submittedToUniversity"
                      value={data.submittedToUniversity}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full pt-4 border-t border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Submitted By</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> Student Name
                    </label>
                    <input
                      type="text"
                      name="submittedByName"
                      value={data.submittedByName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Student ID</label>
                    <input
                      type="text"
                      name="studentId"
                      value={data.studentId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Program</label>
                    <input
                      type="text"
                      name="program"
                      value={data.program}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700">Section / Batch</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="section"
                        placeholder="Sec"
                        value={data.section}
                        onChange={handleInputChange}
                        className="w-1/2 px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      />
                      <input
                        type="text"
                        name="batch"
                        placeholder="Batch"
                        value={data.batch}
                        onChange={handleInputChange}
                        className="w-1/2 px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-700 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Submission Date
                    </label>
                    <input
                      type="date"
                      name="submissionDate"
                      value={data.submissionDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-zinc-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Preview Section */}
        <section className="relative">
          <div className="sticky top-24 space-y-4">
            <div className="flex items-center justify-between no-print">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Printer className="w-5 h-5 text-indigo-600" /> Live Preview
              </h2>
              <span className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded">A4 Format</span>
            </div>

            {/* The actual A4 page container */}
            <div className="overflow-auto max-h-[calc(100vh-180px)] lg:max-h-none flex justify-center bg-zinc-200/50 p-4 lg:p-8 rounded-2xl border border-zinc-200">
              <div 
                ref={previewRef}
                id="preview-container"
                className="w-[210mm] min-h-[297mm] p-[20mm] flex flex-col items-center text-center cover-page-shadow origin-top scale-[0.45] sm:scale-[0.6] md:scale-[0.7] lg:scale-[0.8] xl:scale-100 relative overflow-hidden"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: '#ffffff',
                  color: '#18181b'
                }}
              >
                {/* Geometric Background Elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute -right-20 -bottom-20 w-[500px] h-[500px] rotate-12" style={{ backgroundColor: 'rgba(207, 250, 254, 0.4)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute right-0 bottom-0 w-[700px] h-[700px] -rotate-12" style={{ backgroundColor: 'rgba(236, 254, 255, 0.3)', clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute -left-10 bottom-40 w-[400px] h-[400px] rotate-45" style={{ backgroundColor: 'rgba(207, 250, 254, 0.25)', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
                  <div className="absolute right-20 top-40 w-[600px] h-[600px]" style={{ backgroundColor: 'rgba(236, 254, 255, 0.4)', clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)' }}></div>
                  <div className="absolute left-40 top-0 w-[500px] h-[500px]" style={{ backgroundColor: 'rgba(236, 254, 255, 0.25)', clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}></div>
                  <div className="absolute right-[-10%] bottom-[10%] w-[80%] h-[60%]" style={{ backgroundColor: 'rgba(207, 250, 254, 0.2)', clipPath: 'polygon(20% 0%, 100% 40%, 70% 100%, 0% 80%)' }}></div>
                  <div className="absolute left-[-5%] top-[20%] w-[60%] h-[70%]" style={{ backgroundColor: 'rgba(236, 254, 255, 0.3)', clipPath: 'polygon(0% 15%, 100% 0%, 80% 100%, 10% 90%)' }}></div>
                </div>

                {/* Content Wrapper */}
                <div className="relative z-10 w-full h-full flex flex-col">
                  {/* Header: Logo & University Name (Optional/Moved) */}
                  <div className="mt-16 flex flex-col items-center gap-6">
                    {data.universityLogo && (
                      <img 
                        src={data.universityLogo} 
                        alt="University Logo" 
                        className="h-20 w-auto object-contain"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <h1 className="text-3xl font-serif font-bold tracking-wide" style={{ color: '#27272a' }}>
                      {data.universityName}
                    </h1>
                  </div>

                  {/* Middle: Document Type & Course Info */}
                  <div className="flex-1 flex flex-col justify-center items-center w-full">
                    <div className="space-y-8">
                      <div className="flex items-center justify-center gap-6">
                        <div className="h-[0.5px] w-16" style={{ backgroundColor: '#d4d4d8' }}></div>
                        <p className="text-6xl font-stylish italic font-semibold tracking-[0.2em] uppercase" style={{ color: '#18181b' }}>
                          {data.type}
                        </p>
                        <div className="h-[0.5px] w-16" style={{ backgroundColor: '#d4d4d8' }}></div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xl font-medium" style={{ color: '#27272a' }}>
                          Course Code: <span className="font-bold">{data.courseCode}</span>
                        </p>
                        <p className="text-xl font-medium" style={{ color: '#27272a' }}>
                          Course Title: <span className="font-bold">{data.courseTitle}</span>
                        </p>
                        <p className="text-lg font-medium" style={{ color: '#3f3f46' }}>
                          Department: <span className="font-bold">{data.department}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Submission Info */}
                  <div className="w-full mt-auto pb-12">
                    <div className="grid grid-cols-2 gap-12 text-left">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <p className="text-[13px] font-bold uppercase tracking-[0.1em] border-b pb-1 inline-block" style={{ color: '#18181b', borderColor: '#e4e4e7' }}>Submitted To</p>
                          <div className="space-y-0.5 pt-2">
                            <p className="text-lg font-bold" style={{ color: '#18181b' }}>{data.submittedToName}</p>
                            <p className="text-sm" style={{ color: '#52525b' }}>{data.submittedToDesignation},</p>
                            <p className="text-sm" style={{ color: '#52525b' }}>{data.submittedToDepartment},</p>
                            <p className="text-sm" style={{ color: '#52525b' }}>{data.submittedToUniversity}.</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-6 flex flex-col items-end text-right">
                        <div className="space-y-2 w-full">
                          <p className="text-[13px] font-bold uppercase tracking-[0.1em] border-b pb-1 inline-block" style={{ color: '#18181b', borderColor: '#e4e4e7' }}>Submitted By</p>
                          <div className="space-y-0.5 pt-2">
                            <p className="text-lg font-bold" style={{ color: '#18181b' }}>{data.submittedByName}</p>
                            <div className="flex flex-col gap-0.5 mt-2">
                              <p className="text-sm" style={{ color: '#3f3f46' }}>ID: <span className="font-bold">{data.studentId}</span></p>
                              <p className="text-sm" style={{ color: '#3f3f46' }}>Program: <span className="font-bold">{data.program}</span></p>
                              <p className="text-sm" style={{ color: '#3f3f46' }}>Batch: <span className="font-bold">{data.batch}</span></p>
                              {data.section && (
                                <p className="text-sm" style={{ color: '#3f3f46' }}>Section: <span className="font-bold">{data.section}</span></p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-16 flex justify-center">
                      <p className="text-[14px] font-medium" style={{ color: '#27272a' }}>
                        Date of Submission: <span className="font-bold">{data.submissionDate ? new Date(data.submissionDate).toLocaleDateString('en-GB', {
                          day: '2-digit', month: '2-digit', year: 'numeric'
                        }) : ''}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-zinc-200 py-6 px-6 mt-8 no-print">
        <div className="max-w-7xl mx-auto text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} Ncover - Professional Academic Tools</p>
        </div>
      </footer>
    </div>
  );
}
