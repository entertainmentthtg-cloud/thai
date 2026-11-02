import React, { useState } from 'react';
import { ShoppingCart, Search, PhoneCall, FileText, Menu, X, ShieldCheck, Lock } from 'lucide-react';
import { CartItem, CompanyInfo } from '../types';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenRFQ: () => void;
  onOpenSearch: () => void;
  companyInfo: CompanyInfo;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  cart,
  onOpenCart,
  onOpenRFQ,
  onOpenSearch,
  companyInfo,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'catalog', label: 'Sản Phẩm UPS' },
    { id: 'calculator', label: 'Công Cụ Tính kVA' },
    { id: 'solutions', label: 'Giải Pháp' },
    { id: 'services', label: 'Dịch Vụ Kỹ Thuật' },
    { id: 'projects', label: 'Dự Án' },
    { id: 'contact', label: 'Liên Hệ' },
    { id: 'admin', label: 'Quản Trị' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top micro announcement strip */}
      <div className="bg-[#0F172A] text-slate-300 text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center font-mono text-[11px]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Phân phối chính hãng các sản phẩm UPS</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <span>Hotline/Zalo:</span>
              <a href={`tel:${companyInfo.hotline}`} className="text-[#FF8A00] font-bold hover:underline">
                {companyInfo.hotline}
              </a>
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 truncate max-w-[280px]">{companyInfo.address}</span>
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-white flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-slate-800 transition-colors"
            >
              <Lock className="w-3 h-3 text-[#FF8A00]" />
              <span>Quản trị</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Top Bar Contract: 3 zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => {
            onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2 text-left"
        >
          <span className="bg-[#0F172A] text-white px-2 py-0.5 rounded text-base sm:text-lg font-mono">UPS</span>
          <span className="text-[#FF8A00]">PRO</span>
          <span className="hidden sm:inline text-xs font-semibold text-slate-500 ml-1 tracking-normal border-l border-slate-200 pl-2">Giải Pháp Nguồn Điện</span>
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-700">
          {navLinks.slice(1, 7).map((link) => (
            <button
              key={link.id}
              onClick={() => {
                onNavigate(link.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`hover:text-[#1677FF] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 text-[13.5px] ${
                currentTab === link.id
                  ? 'border-[#1677FF] text-[#1677FF] font-semibold'
                  : 'border-transparent text-slate-700'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Functional actions & primary CTA */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            title="Tìm kiếm thiết bị"
            aria-label="Tìm kiếm model UPS"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Hotline Quick Call */}
          <a
            href={`tel:${companyInfo.hotline}`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0F172A] hover:bg-slate-100 rounded-md transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span className="font-mono">{companyInfo.hotline}</span>
          </a>

          {/* Cart Trigger */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors flex items-center gap-1"
            title="Giỏ hàng"
            aria-label="Xem giỏ hàng"
          >
            <ShoppingCart className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF8A00] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center font-mono">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Primary Action: B2B Project RFQ */}
          <button
            onClick={onOpenRFQ}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-md transition-colors whitespace-nowrap shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
            <span>Báo Giá Dự Án</span>
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-md"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => {
                onOpenRFQ();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded-md"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>Yêu Cầu Báo Giá</span>
            </button>
            <a
              href={`tel:${companyInfo.hotline}`}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 border border-slate-300 rounded-md"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span className="font-mono">Gọi: {companyInfo.hotline}</span>
            </a>
          </div>

          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2 text-sm rounded-md transition-colors ${
                  currentTab === link.id
                    ? 'bg-slate-100 text-[#1677FF] font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
