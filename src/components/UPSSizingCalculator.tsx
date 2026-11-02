import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Monitor, 
  Server, 
  HardDrive, 
  Network, 
  Wifi, 
  Camera, 
  Eye, 
  Activity, 
  Sliders, 
  Cpu, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Download, 
  FileText,
  Clock,
  Zap
} from 'lucide-react';
import { PRESET_DEVICES, MOCK_PRODUCTS } from '../data/mockData';
import { Product } from '../types';

interface UPSSizingCalculatorProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
  onOpenRFQ?: (product: Product, prefilledNotes?: string) => void;
}

export const UPSSizingCalculator: React.FC<UPSSizingCalculatorProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenRFQ,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [deviceQuantities, setDeviceQuantities] = useState<Record<string, number>>({
    pc_office: 2,
    server_1u: 1,
    switch_network: 1,
    router_wifi: 1
  });
  const [customWatts, setCustomWatts] = useState<number>(0);
  const [targetRuntime, setTargetRuntime] = useState<number>(15); // minutes: 15, 30, 60, 120
  const [selectedPhase, setSelectedPhase] = useState<'1:1' | '3:3'>('1:1');
  const [exportNotice, setExportNotice] = useState(false);

  // Icon mapping
  const getDeviceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Monitor': return <Monitor className="w-4 h-4" />;
      case 'Cpu': return <Cpu className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'HardDrive': return <HardDrive className="w-4 h-4" />;
      case 'Network': return <Network className="w-4 h-4" />;
      case 'Wifi': return <Wifi className="w-4 h-4" />;
      case 'Camera': return <Camera className="w-4 h-4" />;
      case 'Eye': return <Eye className="w-4 h-4" />;
      case 'Activity': return <Activity className="w-4 h-4" />;
      default: return <Sliders className="w-4 h-4" />;
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setDeviceQuantities(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [id]: next };
    });
  };

  // Calculations
  const rawWatts = useMemo(() => {
    let sum = 0;
    PRESET_DEVICES.forEach(dev => {
      const qty = deviceQuantities[dev.id] || 0;
      sum += qty * dev.defaultWatt;
    });
    return sum + (Number(customWatts) || 0);
  }, [deviceQuantities, customWatts]);

  // Safety buffer 1.25 for inrush and future expansion
  const totalRecommendedWatts = Math.round(rawWatts * 1.25);
  // Estimate required VA assuming average PF 0.8
  const estimatedMinVA = Math.round(totalRecommendedWatts / 0.8);

  // Match recommended models from catalog
  const recommendations = useMemo(() => {
    if (rawWatts === 0) return [];

    // Filter candidate products that can support the Watts
    let candidates = MOCK_PRODUCTS.filter(p => p.powerWatts >= totalRecommendedWatts);

    // If 3 phase is requested
    if (selectedPhase === '3:3') {
      const threePhase = candidates.filter(p => p.phase === '3:3');
      if (threePhase.length > 0) candidates = threePhase;
    }

    // Sort by suitability (smallest capacity that fits safely)
    candidates.sort((a, b) => a.powerWatts - b.powerWatts);

    // Pick up to 3 distinct tiers: Economical, Recommended, Heavy Duty/Extended
    const picked: { tier: 'Tiết Kiệm' | 'Khuyên Dùng' | 'Mở Rộng Lưu Lâu'; product: Product; runtimeNote: string }[] = [];

    if (candidates.length > 0) {
      picked.push({
        tier: 'Tiết Kiệm',
        product: candidates[0],
        runtimeNote: `Lưu điện dự kiến ~${Math.max(8, Math.round(candidates[0].runtimeHalfLoadMin * (candidates[0].powerWatts / (totalRecommendedWatts || 1))))} phút`
      });
    }

    const nextTier = candidates.find(c => c.powerWatts >= totalRecommendedWatts * 1.3 && c.id !== candidates[0]?.id);
    if (nextTier) {
      picked.push({
        tier: 'Khuyên Dùng',
        product: nextTier,
        runtimeNote: `Lưu điện an toàn ~${Math.max(15, Math.round(nextTier.runtimeHalfLoadMin * 1.3))} phút, tải mát mẻ`
      });
    }

    const extendedTier = candidates.find(c => c.expandableBattery && c.id !== candidates[0]?.id && c.id !== nextTier?.id);
    if (extendedTier) {
      picked.push({
        tier: 'Mở Rộng Lưu Lâu',
        product: extendedTier,
        runtimeNote: 'Hỗ trợ lắp thêm tủ pin EBM mở rộng 1 - 4 giờ'
      });
    } else if (candidates.length > 2) {
      picked.push({
        tier: 'Mở Rộng Lưu Lâu',
        product: candidates[candidates.length - 1],
        runtimeNote: 'Hệ thống công suất lớn dự phòng cao'
      });
    }

    return picked;
  }, [rawWatts, totalRecommendedWatts, selectedPhase]);

  const handleReset = () => {
    setDeviceQuantities({});
    setCustomWatts(0);
    setTargetRuntime(15);
    setCurrentStep(1);
  };

  const handleExportPDF = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 4000);
  };

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      {/* Wizard Header Bar */}
      <div className="bg-[#0F172A] text-white p-6 border-b border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#FF8A00] flex items-center justify-center text-white shrink-0 shadow">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Công Cụ Tính Công Suất & Thời Gian Lưu Điện UPS
              </h2>
              <p className="text-xs text-slate-400">
                UPS Sizing Wizard · Tự động áp dụng hệ số an toàn 1.25x và gợi ý model chuẩn xác
              </p>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                currentStep === 1 ? 'bg-[#FF8A00] text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <span>1. Chọn Tải ({rawWatts}W)</span>
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => rawWatts > 0 && setCurrentStep(2)}
              disabled={rawWatts === 0}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                currentStep === 2 ? 'bg-[#FF8A00] text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50'
              }`}
            >
              <span>2. Thời Gian Lưu</span>
            </button>
            <span className="text-slate-600">→</span>
            <button
              onClick={() => rawWatts > 0 && setCurrentStep(3)}
              disabled={rawWatts === 0}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors ${
                currentStep === 3 ? 'bg-[#FF8A00] text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50'
              }`}
            >
              <span>3. Kết Quả</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Wizard Content Body */}
      <div className="p-6">
        {/* STEP 1: Select Devices & Wattage */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">
                  Bước 1: Chọn số lượng thiết bị bạn cần cấp nguồn điện dự phòng
                </h3>
                <p className="text-xs text-slate-500">
                  Nhấp dấu [+] hoặc [-] để thêm số lượng máy tính, máy chủ, camera hoặc nhập công suất riêng bên dưới.
                </p>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 font-mono"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Đặt lại</span>
              </button>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {PRESET_DEVICES.map((dev) => {
                const qty = deviceQuantities[dev.id] || 0;
                return (
                  <div 
                    key={dev.id} 
                    className={`p-3 rounded-lg border transition-all ${
                      qty > 0 
                        ? 'border-[#1677FF]/50 bg-blue-50/30' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${qty > 0 ? 'bg-[#1677FF] text-white' : 'bg-slate-100 text-slate-600'}`}>
                          {getDeviceIcon(dev.iconName)}
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-800 block line-clamp-1">
                            {dev.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-500">
                            ~{dev.defaultWatt} Watts / thiết bị
                          </span>
                        </div>
                      </div>

                      {/* Stepper buttons */}
                      <div className="flex items-center gap-1.5 shrink-0 bg-white border border-slate-200 rounded p-0.5 shadow-sm">
                        <button
                          onClick={() => updateQuantity(dev.id, -1)}
                          disabled={qty === 0}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100 disabled:opacity-30 text-xs font-bold font-mono"
                          aria-label="Giảm"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-bold text-slate-800">
                          {qty}
                        </span>
                        <button
                          onClick={() => updateQuantity(dev.id, 1)}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-800 hover:bg-slate-100 text-xs font-bold font-mono"
                          aria-label="Tăng"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Custom Wattage Input */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-800 block">
                  Thiết bị khác hoặc tổng công suất đo thực tế (Watt):
                </span>
                <span className="text-xs text-slate-500">
                  Nếu bạn đã có chỉ số Ampe hoặc Watt từ tem mác thiết bị, hãy nhập vào đây.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <input
                  type="number"
                  min="0"
                  step="50"
                  value={customWatts || ''}
                  onChange={(e) => setCustomWatts(Math.max(0, parseInt(e.target.value) || 0))}
                  placeholder="Ví dụ: 800"
                  className="w-36 px-3 py-1.5 text-sm font-mono border border-slate-300 rounded focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] outline-none"
                />
                <span className="text-xs font-mono font-bold text-slate-600">Watts</span>
              </div>
            </div>

            {/* Step 1 Live Summary & Next CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200">
              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block text-[10px]">TỔNG TẢI THỰC:</span>
                  <span className="text-base font-bold text-slate-900">{rawWatts} Watts</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-slate-400 block text-[10px]">DỰ PHÒNG (+25%):</span>
                  <span className="text-base font-bold text-[#FF8A00]">{totalRecommendedWatts} Watts</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-slate-400 block text-[10px]">CÔNG SUẤT UPS TỐI THIỂU:</span>
                  <span className="text-base font-bold text-[#1677FF]">~{estimatedMinVA} VA</span>
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                disabled={rawWatts === 0}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] disabled:bg-slate-300 rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Tiếp tục: Chọn Thời Gian Lưu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Target Runtime & Electrical Grid Phase */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="pb-2 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900 text-sm">
                Bước 2: Yêu cầu thời gian lưu điện và nguồn điện cấp
              </h3>
              <p className="text-xs text-slate-500">
                Thời gian lưu điện quyết định cần cấu hình ắc quy tiêu chuẩn trong máy hay tủ pin ngoài EBM.
              </p>
            </div>

            {/* Runtime Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                {
                  val: 15,
                  title: '10 – 15 Phút',
                  tag: 'Tiêu chuẩn',
                  desc: 'Đủ lưu tài liệu làm việc, đóng ứng dụng và tắt máy an toàn (Graceful Shutdown).'
                },
                {
                  val: 30,
                  title: '30 – 45 Phút',
                  tag: 'An toàn mạng',
                  desc: 'Duy trì kết nối mạng, camera và máy chủ chờ máy phát điện tòa nhà hòa lưới.'
                },
                {
                  val: 60,
                  title: '1 – 2 Giờ',
                  tag: 'Ắc quy mở rộng (EBM)',
                  desc: 'Yêu cầu gắn thêm module pin ngoài để duy trì hoạt động lâu hơn khi mất điện.'
                },
                {
                  val: 120,
                  title: '2 – 4+ Giờ',
                  tag: 'Chuyên dụng dự án',
                  desc: 'Hệ thống tủ ắc quy xả sâu dung lượng 100Ah - 200Ah kết hợp sạc công suất lớn.'
                }
              ].map(opt => (
                <div
                  key={opt.val}
                  onClick={() => setTargetRuntime(opt.val)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    targetRuntime === opt.val
                      ? 'border-[#FF8A00] bg-orange-50/40 ring-1 ring-[#FF8A00]'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 font-mono">{opt.title}</span>
                    <Clock className={`w-4 h-4 ${targetRuntime === opt.val ? 'text-[#FF8A00]' : 'text-slate-400'}`} />
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-[#1677FF] bg-blue-50 px-1.5 py-0.5 rounded inline-block mb-1">
                    {opt.tag}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{opt.desc}</p>
                </div>
              ))}
            </div>

            {/* Phase Selector */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <span className="text-xs font-bold text-slate-800 block mb-2">
                Hạ tầng nguồn điện tại vị trí lắp đặt:
              </span>
              <div className="flex flex-col sm:flex-row gap-3">
                <label className={`flex-1 p-3 rounded border cursor-pointer flex items-center justify-between ${
                  selectedPhase === '1:1' ? 'border-[#1677FF] bg-white ring-1 ring-[#1677FF]' : 'border-slate-200 bg-white'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="phase"
                      checked={selectedPhase === '1:1'}
                      onChange={() => setSelectedPhase('1:1')}
                      className="text-[#1677FF]"
                    />
                    <div>
                      <strong className="text-xs text-slate-800 block">1 Pha Vào / 1 Pha Ra (1:1 - 220V)</strong>
                      <span className="text-[11px] text-slate-500">Dành cho văn phòng, hộ gia đình, tủ rack IT thông dụng</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-700">220V</span>
                </label>

                <label className={`flex-1 p-3 rounded border cursor-pointer flex items-center justify-between ${
                  selectedPhase === '3:3' ? 'border-[#1677FF] bg-white ring-1 ring-[#1677FF]' : 'border-slate-200 bg-white'
                }`}>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="phase"
                      checked={selectedPhase === '3:3'}
                      onChange={() => setSelectedPhase('3:3')}
                      className="text-[#1677FF]"
                    />
                    <div>
                      <strong className="text-xs text-slate-800 block">3 Pha Vào / 3 Pha Ra (3:3 - 380V)</strong>
                      <span className="text-[11px] text-slate-500">Dành cho Data Center, Bệnh viện, Nhà máy công nghiệp</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#FF8A00]">380V</span>
                </label>
              </div>
            </div>

            {/* Step 2 Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
              >
                Quay lại Bước 1
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors flex items-center gap-2 shadow-sm"
              >
                <span>Xem Kết Quả & Model Khuyến Nghị</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Results & Recommendations */}
        {currentStep === 3 && (
          <div className="space-y-6">
            {/* Calculation Overview Banner */}
            <div className="bg-slate-900 text-white rounded-lg p-5 border border-slate-800">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-mono text-[#FF8A00] bg-orange-950/80 border border-orange-800/80 px-2 py-0.5 rounded">
                      KẾT QUẢ PHÂN TÍCH KỸ THUẬT
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      Hệ số an toàn: 125%
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Yêu Cầu UPS Tối Thiểu: <span className="text-[#FF8A00] font-mono">{estimatedMinVA} VA</span> ({totalRecommendedWatts} Watts)
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    Khuyến nghị cấu hình công nghệ <strong>Online Double Conversion (0ms chuyển mạch)</strong> với sóng Sin chuẩn để bảo vệ tối ưu trước sụt áp và sốc điện.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportPDF}
                    className="px-3.5 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors flex items-center gap-1.5 font-mono"
                  >
                    <Download className="w-3.5 h-3.5 text-sky-400" />
                    <span>Xuất Báo Cáo PDF</span>
                  </button>

                  <button
                    onClick={() => onOpenRFQ && onOpenRFQ(recommendations[0]?.product, `Tính toán từ UPS Calculator: Tổng tải ${rawWatts}W, Dự phòng ${totalRecommendedWatts}W (~${estimatedMinVA}VA), Thời gian lưu mong muốn: ${targetRuntime} phút.`)}
                    className="px-4 py-2 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors flex items-center gap-1.5 shadow"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Gửi Kỹ Sư Báo Giá</span>
                  </button>
                </div>
              </div>

              {exportNotice && (
                <div className="mt-3 p-2 bg-emerald-950/80 border border-emerald-800 rounded text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Đã tạo báo cáo kỹ thuật demo "UPS_PRO_Sizing_Report_{estimatedMinVA}VA.pdf". Đang chuẩn bị tải xuống.</span>
                </div>
              )}
            </div>

            {/* Matched Product Cards (3 Tiers) */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Top 3 Model Đạt Chuẩn Phù Hợp Nhất Với Tải Của Bạn
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recommendations.map(({ tier, product, runtimeNote }) => (
                  <div 
                    key={product.id}
                    className={`rounded-lg border p-4 flex flex-col justify-between transition-all ${
                      tier === 'Khuyên Dùng'
                        ? 'border-[#1677FF] bg-blue-50/20 shadow-md ring-1 ring-[#1677FF]/40'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div>
                      {/* Tier Tag */}
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                          tier === 'Khuyên Dùng'
                            ? 'bg-[#1677FF] text-white'
                            : tier === 'Tiết Kiệm'
                            ? 'bg-slate-800 text-slate-200'
                            : 'bg-[#FF8A00] text-white'
                        }`}>
                          {tier.toUpperCase()}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">{product.brand}</span>
                      </div>

                      <h5 className="font-bold text-slate-900 text-sm mb-1 line-clamp-2" title={product.name}>
                        {product.name}
                      </h5>

                      <div className="bg-slate-50 border border-slate-100 rounded p-2 text-xs font-mono text-slate-600 space-y-1 my-3">
                        <div className="flex justify-between">
                          <span>Công suất:</span>
                          <strong className="text-slate-900">{product.powerVA}VA / {product.powerWatts}W</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Chuyển mạch:</span>
                          <span className={product.transferTimeMs === 0 ? 'text-emerald-600 font-bold' : ''}>
                            {product.transferTimeMs === 0 ? '0 ms (Online)' : `${product.transferTimeMs} ms`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Dạng sóng:</span>
                          <span>{product.waveform === 'Pure Sine Wave' ? 'Sin chuẩn' : 'Mô phỏng'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-emerald-700 bg-emerald-50 p-2 rounded border border-emerald-100 flex items-center gap-1.5 font-mono mb-4">
                        <Zap className="w-3.5 h-3.5 shrink-0" />
                        <span>{runtimeNote}</span>
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-[10px] text-slate-400 font-mono">GIÁ BÁN:</span>
                        <div>
                          {product.isB2BOnly || product.price === null ? (
                            <span className="text-xs font-bold text-slate-900 font-mono">Liên hệ Báo Giá</span>
                          ) : (
                            <span className="text-sm font-bold text-[#FF8A00] font-mono tabular-nums">
                              {formatVND(product.price)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="py-1.5 px-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded text-center transition-colors"
                        >
                          Xem Thông Số
                        </button>

                        {product.isB2BOnly || product.price === null ? (
                          <button
                            onClick={() => onOpenRFQ && onOpenRFQ(product)}
                            className="py-1.5 px-2 text-xs font-semibold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded text-center transition-colors"
                          >
                            Báo Giá B2B
                          </button>
                        ) : (
                          <button
                            onClick={() => onAddToCart && onAddToCart(product)}
                            className="py-1.5 px-2 text-xs font-semibold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded text-center transition-colors"
                          >
                            Chọn Model Này
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Back to tweak step */}
            <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
              <button
                onClick={() => setCurrentStep(1)}
                className="hover:text-slate-900 font-medium underline"
              >
                ← Điều chỉnh lại danh sách thiết bị
              </button>
              <span className="font-mono">Cần tư vấn công suất lớn hơn 50kVA? Hotline: 0908.123.456</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
