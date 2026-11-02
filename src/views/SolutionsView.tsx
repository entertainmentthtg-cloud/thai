import React from 'react';
import { 
  Server, 
  Activity, 
  Factory, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Zap, 
  Cpu 
} from 'lucide-react';
import { MOCK_SOLUTIONS, MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface SolutionsViewProps {
  onSelectProduct: (product: Product) => void;
  onOpenRFQ: (product?: Product, notes?: string) => void;
}

export const SolutionsView: React.FC<SolutionsViewProps> = ({
  onSelectProduct,
  onOpenRFQ,
}) => {
  const getSolutionIcon = (id: string) => {
    switch (id) {
      case 'solution-datacenter': return <Server className="w-6 h-6 text-[#1677FF]" />;
      case 'solution-medical': return <Activity className="w-6 h-6 text-emerald-500" />;
      case 'solution-factory': return <Factory className="w-6 h-6 text-[#FF8A00]" />;
      default: return <Building2 className="w-6 h-6 text-sky-500" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
          GIẢI PHÁP NGUỒN ĐIỆN CHUYÊN DỤNG
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Giải Pháp Nguồn Điện Liên Tục Theo Từng Ngành Nghề
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Đội ngũ kỹ sư UPS PRO xây dựng phương án kiến trúc nguồn dự phòng chuẩn mực (N+1, 2N), tối ưu hóa hiệu suất PUE, bảo vệ các tải nhạy cảm trước mọi sự cố điện lưới.
        </p>
      </div>

      {/* Solutions Cards */}
      <div className="space-y-8">
        {MOCK_SOLUTIONS.map((sol, index) => {
          const suitableProds = MOCK_PRODUCTS.filter(p => sol.suitableModels.includes(p.id));

          return (
            <div 
              key={sol.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 hover:border-slate-300 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                    {getSolutionIcon(sol.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold text-[#FF8A00] bg-orange-50 px-2 py-0.5 rounded">
                        Dải công suất: {sol.powerRange}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">Giải pháp 0{index + 1}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{sol.title}</h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">{sol.tagline}</p>
                  </div>
                </div>

                <button
                  onClick={() => onOpenRFQ(undefined, `Yêu cầu tư vấn & khảo sát giải pháp: ${sol.title}`)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center gap-2 shrink-0 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#FF8A00]" />
                  <span>Yêu Cầu Thiết Kế Giải Pháp</span>
                </button>
              </div>

              {/* Grid 2 Columns: Challenge & Architecture */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                {/* Left: Audience & Key Challenge */}
                <div className="space-y-3 bg-slate-50 border border-slate-200/80 rounded-xl p-4">
                  <div>
                    <strong className="text-slate-900 block mb-1">Đối Tượng Áp Dụng:</strong>
                    <span className="text-slate-600">{sol.targetAudience}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">Thách Thức Nguồn Điện Đặc Thù:</strong>
                    <span className="text-slate-600 leading-relaxed">{sol.criticalChallenge}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900 block mb-1">Kiến Trúc Khuyến Nghị:</strong>
                    <span className="text-[#1677FF] font-mono font-bold">{sol.recommendedTopology}</span>
                  </div>
                </div>

                {/* Right: Key Engineering Benefits */}
                <div className="space-y-3">
                  <strong className="text-slate-900 block text-xs uppercase tracking-wider">
                    Lợi Điểm Kỹ Thuật Đạt Được:
                  </strong>
                  <ul className="space-y-2">
                    {sol.keyBenefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Matched Hardware Models */}
              {suitableProds.length > 0 && (
                <div className="pt-4 border-t border-slate-100">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                    Các dòng UPS tiêu biểu trong giải pháp này:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {suitableProds.map(p => (
                      <div
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-[#1677FF] transition-colors flex items-center justify-between"
                      >
                        <div>
                          <strong className="text-xs text-slate-900 block">{p.name}</strong>
                          <span className="text-[11px] text-slate-500 font-mono">{p.brand} · {p.powerVA}VA</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#1677FF] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
