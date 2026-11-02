import React from 'react';
import { MOCK_PROJECTS } from '../data/mockData';
import { ShieldAlert, Building, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProjectsViewProps {
  onOpenRFQ: (product?: any, notes?: string) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ onOpenRFQ }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-10">
      {/* Disclaimer Box Required by Prompt & Plan */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3 text-xs text-amber-800">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong className="block font-semibold">Lưu ý về tính xác thực của dữ liệu dự án:</strong>
          <span>
            Theo cam kết minh bạch nghiệp vụ, các dự án hiển thị dưới đây là hồ sơ kỹ thuật tham khảo (Demo Portfolio) mô phỏng cấu hình thực tế của các giải pháp nguồn điện mà kỹ sư UPS PRO có năng lực triển khai.
          </span>
        </div>
      </div>

      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
          HỒ SƠ TRIỂN KHAI & NĂNG LỰC NHÀ THẦU
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Các Dự Án UPS Tiêu Biểu Trong Thực Tế
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Năng lực thiết kế cấu hình song song N+1, lắp đặt tủ chuyển mạch ATS tự động và nghiệm thu tiêu chuẩn Tier III cho các công trình trọng điểm.
        </p>
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {MOCK_PROJECTS.map((proj, idx) => (
          <div 
            key={proj.id}
            className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 hover:border-slate-300 transition-colors shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                  <span>Dự án 0{idx + 1}</span>
                  <span>·</span>
                  <span className="text-[#1677FF] font-semibold">{proj.clientType}</span>
                  <span>·</span>
                  <span>{proj.location}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">{proj.title}</h2>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs font-mono font-bold text-[#FF8A00] bg-orange-50 px-2.5 py-1 rounded border border-orange-100 inline-block">
                  Hãng: {proj.brandUsed}
                </span>
                <span className="text-xs font-mono text-slate-600 block mt-1">
                  Quy mô: <strong>{proj.capacity}</strong>
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {proj.solutionSummary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-200/80">
                <strong className="text-slate-900 block mb-1.5 font-mono">DANH MỤC THIẾT BỊ CHÍNH:</strong>
                <ul className="space-y-1">
                  {proj.equipmentList.map((eq, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                      <span>{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-emerald-50/60 rounded-lg p-3 border border-emerald-100">
                <strong className="text-emerald-900 block mb-1.5 font-mono">KẾT QUẢ ĐẠT ĐƯỢC:</strong>
                <p className="text-emerald-800 leading-relaxed">{proj.outcome}</p>
                <div className="mt-2 text-[11px] font-mono text-emerald-700">
                  Cấu trúc tin cậy: <strong>{proj.redundancyType}</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onOpenRFQ(undefined, `Yêu cầu tư vấn cấu hình tương tự dự án: ${proj.title}`)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded transition-colors flex items-center gap-1.5"
              >
                <span>Nhận Tư Vấn Cấu Hình Tương Tự</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
