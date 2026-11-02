import React from 'react';
import { X, Check, Scale, Trash2, FileText, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { HardwareSchematic } from './HardwareSchematic';

interface ProductCompareModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (productId: string) => void;
  onClear: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onOpenRFQ?: (product: Product) => void;
}

export const ProductCompareModal: React.FC<ProductCompareModalProps> = ({
  products,
  isOpen,
  onClose,
  onRemove,
  onClear,
  onSelectProduct,
  onAddToCart,
  onOpenRFQ,
}) => {
  if (!isOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const specRows = [
    { label: 'Thương hiệu', key: 'brand' },
    { label: 'Model SKU', key: 'model' },
    { label: 'Công nghệ UPS', key: 'topology' },
    { 
      label: 'Công suất Biểu kiến / Thực', 
      render: (p: Product) => (
        <span className="font-bold text-slate-900 font-mono">
          {p.powerVA} VA / {p.powerWatts} Watts
        </span>
      ) 
    },
    { label: 'Hệ số công suất (PF)', render: (p: Product) => <span className="font-mono">{p.powerFactor}</span> },
    { label: 'Số pha vào/ra', key: 'phase' },
    { 
      label: 'Thời gian chuyển mạch', 
      render: (p: Product) => (
        <span className={p.transferTimeMs === 0 ? 'text-emerald-600 font-bold font-mono' : 'font-mono'}>
          {p.transferTimeMs === 0 ? '0 ms (Chuẩn Online)' : `${p.transferTimeMs} ms`}
        </span>
      ) 
    },
    { 
      label: 'Dạng sóng ngõ ra', 
      render: (p: Product) => (
        <span>{p.waveform === 'Pure Sine Wave' ? 'Sóng Sin chuẩn (Pure Sine)' : 'Mô phỏng hình sin'}</span>
      ) 
    },
    { label: 'Dải điện áp đầu vào', key: 'voltageIn' },
    { label: 'Điện áp đầu ra danh định', key: 'voltageOut' },
    { label: 'Loại ắc quy', key: 'batteryType' },
    { 
      label: 'Lưu điện tải 50% / 100%', 
      render: (p: Product) => (
        <span className="font-mono text-xs">
          ~{p.runtimeHalfLoadMin} phút / ~{p.runtimeFullLoadMin} phút
        </span>
      ) 
    },
    { 
      label: 'Mở rộng tủ pin ngoài (EBM)', 
      render: (p: Product) => (
        <span>{p.expandableBattery ? '✅ Có hỗ trợ' : '❌ Pin liền không mở rộng'}</span>
      ) 
    },
    { label: 'Kích thước (CxRxS)', key: 'dimensionsMm' },
    { label: 'Trọng lượng', render: (p: Product) => <span className="font-mono">{p.weightKg} kg</span> },
    { label: 'Thời gian bảo hành', render: (p: Product) => `${p.warrantyMonths} tháng chính hãng` }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in duration-200">
        {/* Modal Header */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FF8A00]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Bảng So Sánh Thông Số Kỹ Thuật Đối Đầu ({products.length}/4 Model)
            </h3>
          </div>
          <div className="flex items-center gap-3">
            {products.length > 0 && (
              <button
                onClick={onClear}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xóa tất cả</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Đóng bảng so sánh"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Comparison Table */}
        <div className="flex-1 overflow-auto p-6">
          {products.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <Scale className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Chưa có sản phẩm nào được chọn để so sánh.</p>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Hãy quay lại danh mục sản phẩm và nhấp vào nút "So sánh" trên từng thẻ sản phẩm để đưa vào bảng đối chiếu kỹ thuật.
              </p>
            </div>
          ) : (
            <div className="min-w-[650px]">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="p-3 w-48 font-bold text-slate-500 bg-slate-50 uppercase tracking-wider text-[11px]">
                      Chỉ Số Kỹ Thuật
                    </th>
                    {products.map((p) => (
                      <th key={p.id} className="p-3 min-w-[200px] align-top bg-white border-l border-slate-200">
                        <div className="relative mb-2">
                          <button
                            onClick={() => onRemove(p.id)}
                            className="absolute -top-1 -right-1 z-10 w-5 h-5 rounded-full bg-slate-200 hover:bg-rose-100 hover:text-rose-600 flex items-center justify-center text-slate-600 transition-colors"
                            title="Xóa khỏi so sánh"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <HardwareSchematic product={p} size="sm" />
                        </div>
                        <h4 className="font-bold text-slate-900 text-sm line-clamp-2 mb-1" title={p.name}>
                          {p.name}
                        </h4>
                        <div className="text-base font-bold text-[#FF8A00] font-mono mb-2">
                          {p.isB2BOnly || p.price === null ? 'Liên Hệ Báo Giá B2B' : formatVND(p.price)}
                        </div>
                        <div className="flex gap-1.5">
                          {p.isB2BOnly || p.price === null ? (
                            <button
                              onClick={() => {
                                onClose();
                                onOpenRFQ && onOpenRFQ(p);
                              }}
                              className="w-full py-1.5 px-2 text-[11px] font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded flex items-center justify-center gap-1"
                            >
                              <FileText className="w-3 h-3 text-[#FF8A00]" />
                              <span>Báo Giá</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                onAddToCart && onAddToCart(p);
                              }}
                              className="w-full py-1.5 px-2 text-[11px] font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded flex items-center justify-center gap-1"
                            >
                              <ShoppingCart className="w-3 h-3" />
                              <span>+ Giỏ Hàng</span>
                            </button>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {specRows.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/50' : 'bg-white'}>
                      <td className="p-3 font-semibold text-slate-700 bg-slate-50/80 border-r border-slate-200">
                        {row.label}
                      </td>
                      {products.map((p) => (
                        <td key={p.id} className="p-3 border-l border-slate-200 text-slate-700">
                          {row.render 
                            ? row.render(p) 
                            : (p as any)[row.key || ''] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>*Dữ liệu so sánh dựa trên thông số kỹ thuật xuất xưởng của từng model.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded bg-white hover:bg-slate-50 transition-colors"
          >
            Đóng Bảng So Sánh
          </button>
        </div>
      </div>
    </div>
  );
};
