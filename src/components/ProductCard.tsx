import React from 'react';
import { ShoppingCart, FileText, ArrowRight, Check, Scale } from 'lucide-react';
import { Product } from '../types';
import { HardwareSchematic } from './HardwareSchematic';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onOpenRFQ?: (product: Product) => void;
  isCompared?: boolean;
  onToggleCompare?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  onOpenRFQ,
  isCompared = false,
  onToggleCompare,
}) => {
  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all duration-200 group">
      <div>
        {/* Hardware Visual Lead */}
        <div 
          onClick={() => onSelect(product)} 
          className="cursor-pointer relative overflow-hidden bg-slate-900 min-h-[170px] flex items-center justify-center"
        >
          {product.imageUrl ? (
            <div className="w-full h-[170px] flex items-center justify-center p-3 bg-slate-900">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300 group-hover:scale-105" 
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          ) : (
            <HardwareSchematic product={product} size="sm" />
          )}
          
          {/* Compare toggle button */}
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(product);
              }}
              className={`absolute top-2 left-2 z-10 px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-all ${
                isCompared
                  ? 'bg-[#1677FF] text-white shadow-sm'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-700/80 backdrop-blur-sm'
              }`}
              title="So sánh thông số kỹ thuật"
            >
              <Scale className="w-3 h-3" />
              <span>{isCompared ? 'Đang so sánh' : 'So sánh'}</span>
            </button>
          )}

          {/* Quick stock status badge */}
          <div className="absolute top-2 right-2 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800 text-emerald-400">
            {product.inStock ? 'Sẵn Hàng' : 'Đặt Trước'}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2">
          {/* Unboxed Metadata Discipline */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            <span className="font-semibold text-slate-800">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.topology.split(' ')[0]}</span>
            <span aria-hidden="true">·</span>
            <span>{product.phase}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onSelect(product)}
            className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 cursor-pointer hover:text-[#1677FF] transition-colors"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Key Electrical Specs Grid */}
          <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs grid grid-cols-2 gap-1.5 font-mono text-slate-600">
            <div>
              <span className="text-slate-400 text-[10px] block">CÔNG SUẤT:</span>
              <strong className="text-slate-800">{product.powerVA}VA</strong> / {product.powerWatts}W
            </div>
            <div>
              <span className="text-slate-400 text-[10px] block">CHUYỂN MẠCH:</span>
              <strong className={product.transferTimeMs === 0 ? 'text-emerald-600' : 'text-slate-800'}>
                {product.transferTimeMs === 0 ? '0 ms (Online)' : `${product.transferTimeMs} ms`}
              </strong>
            </div>
            <div className="col-span-2 text-[11px] text-slate-500 border-t border-slate-200/60 pt-1 flex justify-between">
              <span>Sóng: {product.waveform === 'Pure Sine Wave' ? 'Sin chuẩn' : 'Mô phỏng'}</span>
              <span>PF: {product.powerFactor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer: Price & Action */}
      <div className="p-4 pt-0 border-t border-slate-100 mt-2">
        <div className="py-2 flex items-baseline justify-between">
          <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
            {product.isB2BOnly ? 'DỰ ÁN B2B' : 'GIÁ NIÊM YẾT'}
          </div>
          <div className="text-right">
            {product.isB2BOnly || product.price === null ? (
              <span className="text-sm font-bold text-[#0F172A] font-mono">
                Liên Hệ Báo Giá
              </span>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-base font-bold text-[#FF8A00] font-mono tabular-nums">
                  {formatVND(product.price)}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Đã gồm VAT 10%</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button: B2C Add-to-cart vs B2B RFQ */}
        <div className="grid grid-cols-1 gap-2 pt-1">
          {product.isB2BOnly || product.price === null ? (
            <button
              onClick={() => onOpenRFQ ? onOpenRFQ(product) : onSelect(product)}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded transition-colors shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>Yêu Cầu Báo Giá Dự Án</span>
            </button>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onAddToCart && onAddToCart(product)}
                className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded transition-colors"
                title="Thêm vào giỏ hàng"
              >
                <ShoppingCart className="w-3.5 h-3.5 text-[#FF8A00]" />
                <span>+ Giỏ Hàng</span>
              </button>
              <button
                onClick={() => onSelect(product)}
                className="flex items-center justify-center gap-1 py-2 px-2 text-xs font-semibold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors"
              >
                <span>Xem Ngay</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
