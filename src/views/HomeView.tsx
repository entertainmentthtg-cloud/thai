import React, { useState } from 'react';
import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  FileText, 
  Activity, 
  Server, 
  Building, 
  Cpu, 
  Wrench, 
  CheckCircle2, 
  PhoneCall, 
  Download, 
  Layers, 
  ChevronRight,
  HelpCircle,
  FileDown
} from 'lucide-react';
import { MOCK_SOLUTIONS, MOCK_PROJECTS, MOCK_BLOGS, TECHNICAL_FAQS } from '../data/mockData';
import { Product, CompanyInfo } from '../types';
import { ProductCard } from '../components/ProductCard';
import { UPSSizingCalculator } from '../components/UPSSizingCalculator';

interface HomeViewProps {
  onNavigate: (tab: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenRFQ: (product?: Product, prefilledNotes?: string) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onFilterTopology?: (topology: string) => void;
  onFilterBrand?: (brand: string) => void;
  companyInfo: CompanyInfo;
  products: Product[];
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onOpenRFQ,
  comparedProducts,
  onToggleCompare,
  onFilterTopology,
  onFilterBrand,
  companyInfo,
  products,
}) => {
  const [activeProductTab, setActiveProductTab] = useState<'upselec' | 'all' | 'under3k' | 'industrial' | 'modular'>('upselec');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const filteredFeatured = products.filter(p => {
    if (activeProductTab === 'upselec') return p.brand === 'Up Selec';
    if (activeProductTab === 'under3k') return p.powerVA <= 3000;
    if (activeProductTab === 'industrial') return p.powerVA >= 10000;
    if (activeProductTab === 'modular') return p.topology === 'Modular';
    return true;
  }).slice(0, 8);

  return (
    <div className="space-y-16 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#0F172A] text-white overflow-hidden border-b border-slate-800">
        {/* Subtle grid backdrop */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none" 
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Phân Phối Độc Lập Đa Thương Hiệu · Đầy Đủ CO/CQ</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15]" style={{ textWrap: 'balance' }}>
                GIẢI PHÁP BỘ LƯU ĐIỆN UPS CHUYÊN NGHIỆP
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                Cung cấp hệ thống lưu điện UPS đa thương hiệu chính hãng (APC, Eaton, Vertiv, Santak, Delta, CyberPower), giải pháp nguồn điện liên tục cho gia đình, doanh nghiệp, Data Center và nhà máy công nghiệp.
              </p>

              {/* Dual CTA */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('catalog')}
                  className="px-6 py-3.5 text-sm font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-md transition-colors flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40"
                >
                  <span>Khám Phá Sản Phẩm</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('calculator')}
                  className="px-6 py-3.5 text-sm font-bold text-slate-200 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4 text-sky-400" />
                  <span>Tính Công Suất UPS ⚡</span>
                </button>

                <button
                  onClick={() => onOpenRFQ()}
                  className="px-5 py-3.5 text-sm font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-4 h-4 text-[#FF8A00]" />
                  <span>Báo Giá Dự Án B2B</span>
                </button>
              </div>

              {/* Supported Brands logos row */}
              <div className="pt-6 border-t border-slate-800/80">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                  Đối tác thương hiệu phân phối & ủy quyền giải pháp:
                </span>
                <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-bold text-slate-300">
                  <button 
                    onClick={() => {
                      if (onFilterBrand) onFilterBrand('Up Selec');
                      onNavigate('catalog');
                    }}
                    className="bg-[#FF8A00] text-white px-3 py-1 rounded shadow-sm hover:bg-[#e67c00] transition-colors"
                  >
                    ★ UP SELEC (MỚI)
                  </button>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">APC by Schneider</span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">EATON</span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">VERTIV LIEBERT</span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">SANTAK</span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">DELTA</span>
                  <span className="bg-slate-800/80 px-2.5 py-1 rounded border border-slate-700">CYBERPOWER</span>
                </div>
              </div>
            </div>

            {/* Right Graphic: Industrial Power Control Center Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/90 rounded-xl border border-slate-700 p-6 shadow-2xl space-y-5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold font-mono tracking-wide text-white">TRUNG TÂM NGUỒN ĐIỆN 24/7</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                    LƯỚI ĐIỆN ỔN ĐỊNH
                  </span>
                </div>

                {/* Real-time telemetry simulation box */}
                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-900/90 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ĐIỆN ÁP VÀO:</span>
                    <strong className="text-sm text-sky-400 font-bold tabular-nums">220.4 VAC</strong>
                    <span className="text-[9px] text-slate-500 block">Tần số: 50.0 Hz</span>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">ĐIỆN ÁP RA UPS:</span>
                    <strong className="text-sm text-emerald-400 font-bold tabular-nums">230.0 VAC ± 1%</strong>
                    <span className="text-[9px] text-emerald-500 block">A.V.R & Chuyển Mạch 2ms</span>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">DẢI CÔNG SUẤT:</span>
                    <strong className="text-sm text-white font-bold tabular-nums">500VA - 500kVA</strong>
                    <span className="text-[9px] text-slate-400 block">1 Pha & 3 Pha</span>
                  </div>
                  <div className="bg-slate-900/90 p-3 rounded border border-slate-800">
                    <span className="text-[10px] text-slate-400 block">HOTLINE KỸ THUẬT:</span>
                    <strong className="text-sm text-[#FF8A00] font-bold tabular-nums">{companyInfo.hotline}</strong>
                    <span className="text-[9px] text-slate-400 block truncate">{companyInfo.email}</span>
                  </div>
                </div>

                {/* Value bullet strip */}
                <div className="space-y-2 pt-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Hàng chính hãng mới 100%, nguyên đai nguyên kiện từ hãng</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Đã bổ sung catalog 7 model Up Selec USL Series 2ms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Địa chỉ kho & showroom: {companyInfo.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      if (onFilterBrand) onFilterBrand('Up Selec');
                      onNavigate('catalog');
                    }}
                    className="py-2.5 px-3 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors flex items-center justify-center gap-1.5 font-mono shadow"
                  >
                    <span>Xem Dòng Up Selec</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onNavigate('calculator')}
                    className="py-2.5 px-3 text-xs font-bold text-white bg-[#1677FF] hover:bg-[#1260d4] rounded transition-colors flex items-center justify-center gap-1 font-mono"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Tính Sizing UPS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-KPI Metric Strip */}
        <div className="border-t border-slate-800 bg-[#09111e] py-6 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">7+</span>
              <span className="text-xs text-slate-400 block mt-0.5">Thương Hiệu Phân Phối</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#FF8A00] font-mono tabular-nums">2 ms</span>
              <span className="text-xs text-slate-400 block mt-0.5">Chuyển Mạch Siêu Nhanh USL</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono tabular-nums">2.2Tr+</span>
              <span className="text-xs text-slate-400 block mt-0.5">Giá Khởi Điểm Hấp Dẫn</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#1677FF] font-mono tabular-nums">24/7</span>
              <span className="text-xs text-slate-400 block mt-0.5">Hỗ Trợ Kỹ Thuật Hotline</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR BY TECHNOLOGY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
              PHÂN LOẠI CÔNG NGHỆ BỘ LƯU ĐIỆN
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Danh Mục UPS Nổi Bật Theo Nhu Cầu
            </h2>
          </div>
          <button
            onClick={() => onNavigate('catalog')}
            className="text-xs font-semibold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
          >
            <span>Xem toàn bộ sản phẩm ({products.length})</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            {
              id: 'upselec-cat',
              name: 'Dòng Up Selec USL',
              spec: '500VA – 2500VA',
              desc: 'Tích hợp AVR, 2ms, 7 model',
              action: () => {
                if (onFilterBrand) onFilterBrand('Up Selec');
                onNavigate('catalog');
              },
              highlight: true
            },
            {
              id: 'line-interactive',
              name: 'Line-Interactive',
              spec: '1kVA – 3kVA (AVR)',
              desc: 'Sóng sin chuẩn, Server nhỏ',
              action: () => {
                if (onFilterTopology) onFilterTopology('Line-Interactive');
                onNavigate('catalog');
              }
            },
            {
              id: 'online-1p',
              name: 'UPS Online 1 Pha',
              spec: '1kVA – 10kVA (0ms)',
              desc: 'Server rack, viễn thông',
              action: () => {
                if (onFilterTopology) onFilterTopology('Online Double Conversion');
                onNavigate('catalog');
              }
            },
            {
              id: 'online-3p',
              name: 'UPS 3 Pha Công Nghiệp',
              spec: '10kVA – 500kVA+',
              desc: 'Bệnh viện, nhà máy, xưởng',
              action: () => {
                if (onFilterTopology) onFilterTopology('Online Double Conversion');
                onNavigate('catalog');
              }
            },
            {
              id: 'modular',
              name: 'UPS Modular',
              spec: 'Hot-swap N+1',
              desc: 'Data Center, hạ tầng Cloud',
              action: () => {
                if (onFilterTopology) onFilterTopology('Modular');
                onNavigate('catalog');
              }
            },
            {
              id: 'offline',
              name: 'UPS Offline',
              spec: '500VA – 1000VA',
              desc: 'PC văn phòng, modem wifi',
              action: () => {
                if (onFilterTopology) onFilterTopology('Offline');
                onNavigate('catalog');
              }
            }
          ].map((cat) => (
            <div
              key={cat.id}
              onClick={cat.action}
              className={`rounded-lg p-4 cursor-pointer transition-all group flex flex-col justify-between ${
                cat.highlight
                  ? 'bg-orange-50/70 border-2 border-[#FF8A00] shadow-sm hover:bg-orange-50'
                  : 'bg-white border border-slate-200 hover:border-[#1677FF] hover:shadow-md'
              }`}
            >
              <div>
                <span className={`text-[10px] font-mono block mb-1 font-bold ${
                  cat.highlight ? 'text-[#FF8A00]' : 'text-slate-500'
                }`}>
                  {cat.spec}
                </span>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-[#1677FF] transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.desc}</p>
              </div>
              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono text-[#1677FF]">
                <span>Khám phá</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS WITH TABS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
              SẢN PHẨM BÁN CHẠY & TIÊU BIỂU
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Thiết Bị Nguồn Đang Được Tin Dùng
            </h2>
          </div>

          {/* Segmented Filter Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto overflow-x-auto">
            <button
              onClick={() => setActiveProductTab('upselec')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeProductTab === 'upselec'
                  ? 'bg-[#FF8A00] text-white font-bold shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 font-medium'
              }`}
            >
              ★ Dòng Up Selec (7 Model)
            </button>
            <button
              onClick={() => setActiveProductTab('all')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeProductTab === 'all'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất Cả
            </button>
            <button
              onClick={() => setActiveProductTab('under3k')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeProductTab === 'under3k'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dưới 3kVA (B2C)
            </button>
            <button
              onClick={() => setActiveProductTab('industrial')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeProductTab === 'industrial'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Công Nghiệp & Dự Án
            </button>
            <button
              onClick={() => setActiveProductTab('modular')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                activeProductTab === 'modular'
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Modular Data Center
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredFeatured.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
              onOpenRFQ={onOpenRFQ}
              isCompared={comparedProducts.some(p => p.id === product.id)}
              onToggleCompare={onToggleCompare}
            />
          ))}
        </div>
      </section>

      {/* 4. INTEGRATED UPS SIZING CALCULATOR WIZARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <UPSSizingCalculator
          onSelectProduct={onSelectProduct}
          onAddToCart={onAddToCart}
          onOpenRFQ={onOpenRFQ}
        />
      </section>

      {/* 5. SOLUTIONS BY INDUSTRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
            GIẢI PHÁP THEO LĨNH VỰC ỨNG DỤNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Thiết Kế Nguồn Dự Phòng Đáp Ứng Chuẩn Nghiệp Vụ
          </h2>
          <p className="text-xs text-slate-500 mt-2">
            Mỗi môi trường đòi hỏi công nghệ UPS, thời gian chuyển mạch và cấu hình ắc quy khác biệt hoàn toàn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {MOCK_SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#FF8A00] font-bold bg-orange-50 px-2 py-0.5 rounded">
                    {sol.powerRange}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">Chuyên ngành</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#1677FF] transition-colors leading-snug">
                  {sol.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {sol.tagline}
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded p-2.5 text-xs space-y-1 font-mono text-slate-600">
                  <span className="text-slate-400 text-[10px] block font-bold">CÔNG NGHỆ KHUYÊN DÙNG:</span>
                  <span className="text-slate-900 font-medium text-[11px] block">{sol.recommendedTopology}</span>
                </div>

                <ul className="space-y-1 text-xs text-slate-600 pt-1">
                  {sol.keyBenefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => onNavigate('solutions')}
                  className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
                >
                  <span>Xem giải pháp</span>
                  <ArrowRight className="w-3 h-3" />
                </button>

                <button
                  onClick={() => onOpenRFQ(undefined, `Yêu cầu tư vấn giải pháp: ${sol.title}`)}
                  className="text-xs font-semibold text-slate-800 hover:text-[#0F172A] px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Nhận Báo Giá
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. TECHNICAL SERVICES */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
                NĂNG LỰC HẬU MÃI & DỊCH VỤ
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                Dịch Vụ Kỹ Thuật Nguồn Điện Trọn Đời
              </h2>
            </div>
            <button
              onClick={() => onNavigate('services')}
              className="text-xs font-semibold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
            >
              <span>Xem chi tiết SLA dịch vụ kỹ thuật</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                title: 'Tư Vấn & Khảo Sát Hiện Trường',
                desc: 'Đo kiểm sóng hài THD, tính toán công suất đỉnh và tư vấn lựa chọn công nghệ UPS phù hợp ngân sách.',
                icon: Layers,
                tag: 'Miễn phí trước bán'
              },
              {
                title: 'Lắp Đặt & Cấu Hình Đấu Nối',
                desc: 'Thi công tủ phân phối đầu vào/ra, đấu nối cáp động lực, tích hợp tủ chuyển nguồn ATS và chạy thử tải giả.',
                icon: Wrench,
                tag: 'Kỹ sư cơ điện M&E'
              },
              {
                title: 'Bảo Trì & Đo Kiểm Ắc Quy',
                desc: 'Đo nội trở từng cell bình bằng máy chuyên dụng Hioki, bảo dưỡng quạt làm mát, vệ sinh bo mạch định kỳ.',
                icon: Activity,
                tag: 'Hợp đồng định kỳ'
              },
              {
                title: 'Sửa Chữa & Nâng Cấp Hệ Thống',
                desc: 'Thay thế bo mạch điều khiển DSP, nâng cấp tủ pin EBM mở rộng giờ lưu điện và hỗ trợ cho thuê UPS dự phòng.',
                icon: Cpu,
                tag: 'Ứng cứu 24/7'
              }
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-slate-900 text-[#FF8A00] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-semibold border border-emerald-100">
                      {srv.tag}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{srv.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. REPRESENTATIVE PROJECTS (DEMO DATA TRANSPARENCY) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
              HỒ SƠ TRIỂN KHAI THỰC TẾ (DEMO)
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Dự Án Tiêu Biểu & Năng Lực Đấu Thầu
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              *Toàn bộ thông tin dự án bên dưới mang tính chất mô phỏng tham khảo cho phương án kỹ thuật.
            </p>
          </div>
          <button
            onClick={() => onNavigate('projects')}
            className="text-xs font-semibold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
          >
            <span>Xem danh sách dự án</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">{proj.location}</span>
                  <span className="font-bold text-[#0F172A] bg-slate-100 px-2 py-0.5 rounded">
                    {proj.brandUsed}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {proj.title}
                </h3>

                <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs font-mono text-slate-700 space-y-0.5">
                  <div>Quy mô: <strong className="text-[#FF8A00]">{proj.capacity}</strong></div>
                  <div>Cấu trúc: <span>{proj.redundancyType}</span></div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {proj.solutionSummary}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 text-xs text-emerald-700 bg-emerald-50/50 p-2 rounded">
                <strong>Kết quả:</strong> {proj.outcome}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. KNOWLEDGE BASE & TECHNICAL BLOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
              KIẾN THỨC & CẨM NANG NGUỒN ĐIỆN
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
              Bài Viết Kỹ Thuật Chuẩn SEO
            </h2>
          </div>
          <button
            onClick={() => onNavigate('blog')}
            className="text-xs font-semibold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
          >
            <span>Tất cả bài viết kỹ thuật</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {MOCK_BLOGS.map((post) => (
            <div
              key={post.id}
              onClick={() => onNavigate('blog')}
              className="bg-white border border-slate-200 rounded-lg p-5 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                  <span className="text-[#1677FF] font-semibold">{post.category}</span>
                  <span>·</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#1677FF] transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>{post.publishedDate}</span>
                <span className="text-[#1677FF] font-medium flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  Đọc tiếp →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <HelpCircle className="w-8 h-8 text-[#1677FF] mx-auto mb-2" />
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Câu Hỏi Thường Gặp Khi Mua Bộ Lưu Điện UPS
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Giải đáp nhanh các thắc mắc về kỹ thuật điện học, ắc quy và thời gian chuyển mạch
          </p>
        </div>

        <div className="space-y-3">
          {TECHNICAL_FAQS.map((faq, idx) => (
            <div 
              key={idx}
              className="border border-slate-200 rounded-lg overflow-hidden bg-white"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full text-left p-4 font-semibold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <span>{faq.q}</span>
                <span className="text-slate-400 text-base shrink-0 font-mono">
                  {openFaqIndex === idx ? '−' : '+'}
                </span>
              </button>

              {openFaqIndex === idx && (
                <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 10. FINAL CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white border border-slate-800 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
              BẠN CẦN TƯ VẤN GIẢI PHÁP UPS PHÙ HỢP?
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Đội Ngũ Kỹ Sư UPS PRO Luôn Sẵn Sàng Hỗ Trợ 24/7
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Chúng tôi hỗ trợ tính toán công suất, phân tích hệ số cos phi, kiểm tra mặt bằng và cung cấp bảng dự toán chi tiết với giá bảo hộ đại lý tốt nhất.
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={() => onOpenRFQ()}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-md transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>YÊU CẦU BÁO GIÁ DỰ ÁN</span>
              </button>
              <a
                href={`tel:${companyInfo.hotline}`}
                className="px-6 py-3 text-xs sm:text-sm font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span className="font-mono">Gọi Hotline: {companyInfo.hotline}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
