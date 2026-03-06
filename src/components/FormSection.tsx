import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface FormSectionProps {
  title: string;
  icon: LucideIcon;
  color: string;
  children: React.ReactNode;
  id?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title, icon: Icon, color, children, id }) => {
  return (
    <div id={id} className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
      <div className={cn("px-6 py-3 flex items-center gap-3 text-white", color)}>
        <Icon size={20} />
        <h3 className="font-semibold text-lg">{title}</h3>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
};
