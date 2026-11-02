import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Zap, Shield } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return MOCK_PRODUCTS.slice(0, 6);
    const q = searchTerm.toLowerCase();
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.topology.toLowerCase().includes(q) ||
      p.powerVA.toString().includes(q) ||
      p.powerWatts.toString().includes(q)
    );
  }, [searchTerm]);

  if (!isOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo Model (SRT3000, C3K...), Thương hiệu (APC, Eaton...), hoặc Công suất (3kVA, 1000W)..."
            className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="p-1 text-slate-400 hover:text-slate-600 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2 py-1 text-xs text-slate-500 hover:text-slate-900 border border-slate-300 rounded bg-white shrink-0 font-mono"
          >
            ESC
          </button>
        </div>

        {/* Quick Tag Shortcuts */}
        <div className="px-4 py-2 border-b border-slate-100 bg-white flex items-center gap-2 overflow-x-auto text-xs font-mono text-slate-600">
          <span className="text-slate-400 text-[11px] shrink-0">Gợi ý nhanh:</span>
          {['APC SRT 3kVA', 'Santak C3K', 'Eaton 9SX', 'Vertiv 20kVA', 'UPS 3 Pha', 'Offline TG500'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchTerm(tag)}
              className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 whitespace-nowrap text-[11px]"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-slate-100 p-2">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Không tìm thấy thiết bị phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredProducts.map(p => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="p-3 rounded-lg hover:bg-slate-50 cursor-pointer flex items-center justify-between gap-4 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500 mb-0.5">
                    <span className="font-bold text-slate-900">{p.brand}</span>
                    <span>·</span>
                    <span>Model: {p.model}</span>
                    <span>·</span>
                    <span className="text-[#1677FF] font-semibold">{p.topology}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#1677FF] transition-colors truncate">
                    {p.name}
                  </h4>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 font-mono mt-1">
                    <span>{p.powerVA}VA / {p.powerWatts}W</span>
                    <span>·</span>
                    <span>{p.transferTimeMs === 0 ? '0ms Online' : `${p.transferTimeMs}ms`}</span>
                    <span>·</span>
                    <span>{p.phase}</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {p.isB2BOnly || p.price === null ? (
                    <span className="text-xs font-bold text-slate-900 font-mono block">Báo Giá B2B</span>
                  ) : (
                    <span className="text-xs font-bold text-[#FF8A00] font-mono block tabular-nums">
                      {formatVND(p.price)}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-400 flex items-center justify-end gap-1 mt-0.5 group-hover:text-[#1677FF]">
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
