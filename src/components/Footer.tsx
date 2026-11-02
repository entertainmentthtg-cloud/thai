import React from 'react';
import { CompanyInfo } from '../types';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenRFQ: () => void;
  companyInfo: CompanyInfo;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#0F172A] text-slate-400 py-6 border-t border-slate-800 text-center text-xs">
      <div className="max-w-7xl mx-auto px-4">
        © UPS PRO Việt Nam.
      </div>
    </footer>
  );
};
