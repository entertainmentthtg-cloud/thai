import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShoppingCart, 
  FileText, 
  Download, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  CheckCircle2, 
  FileCode, 
  HelpCircle,
  Clock,
  Layers,
  Zap,
  Scale
} from 'lucide-react';
import { Product } from '../types';
import { HardwareSchematic } from '../components/HardwareSchematic';
import { MOCK_PRODUCTS } from '../data/mockData';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenRFQ: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
  isCompared: boolean;
  onToggleCompare: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  onBack,
  onAddToCart,
  onOpenRFQ,
  onSelectProduct,
  isCompared,
  onToggleCompare,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'desc' | 'install' | 'faq'>('specs');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleDownloadDatasheet = () => {
    if (product.brand === 'Up Selec') {
      window.open('/assets/aistudio/USL_Series_26_6163dbc1.pdf', '_blank');
    }
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3500);
  };

  // Compatible accessories from same brand or general
  const relatedProducts = MOCK_PRODUCTS.filter(
    p => p.id !== product.id && (p.brand === product.brand || p.topology === product.topology)
  ).slice(0, 3);

  const isUpSelec = product.brand === 'Up Selec';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Top breadcrumb & back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh mục sản phẩm</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleCompare(product)}
            className={`px-3 py-1.5 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
              isCompared
                ? 'bg-[#1677FF] text-white'
                : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? 'Đang trong danh sách so sánh' : 'Thêm vào so sánh'}</span>
          </button>
        </div>
      </div>

      {/* MAIN TOP SECTION: HARDWARE GALLERY (LEFT) + CONTIGUOUS PURCHASE MODULE (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Hardware Showcase & Downloads */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            {product.imageUrl ? (
              <div className="w-full min-h-[280px] max-h-[420px] bg-slate-900 rounded-lg flex items-center justify-center p-6 overflow-hidden">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="max-h-[360px] max-w-full object-contain mx-auto" 
                />
              </div>
            ) : (
              <HardwareSchematic product={product} size="lg" />
            )}
            <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>{product.imageUrl ? 'Hình ảnh thiết bị thực tế' : `Sơ đồ kiến trúc phần cứng ${product.rackHeightU ? `Rackmount ${product.rackHeightU}U` : 'Tower'}`}</span>
              <span className="text-emerald-600 font-bold">Chuẩn Công Nghiệp</span>
            </div>
          </div>

          {/* Technical Document Download Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <FileCode className="w-4 h-4 text-[#FF8A00]" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Tài Liệu Xuất Xưởng & Datasheet Kỹ Thuật
              </h4>
            </div>

            <div className="space-y-2">
              <a
                href={isUpSelec ? '/assets/aistudio/USL_Series_26_6163dbc1.pdf' : '#'}
                target={isUpSelec ? '_blank' : undefined}
                rel="noreferrer"
                onClick={isUpSelec ? undefined : handleDownloadDatasheet}
                className="w-full bg-white hover:bg-slate-100 border border-slate-300 rounded p-2.5 text-left flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-sky-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      {isUpSelec ? 'Catalog_Goc_Up_Selec_USL_Series.pdf' : product.datasheetPdfName}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {isUpSelec ? 'Tài liệu kỹ thuật chính thức đính kèm (PDF · 2 Trang)' : 'Bản thông số kỹ thuật chính thức từ hãng (PDF · 2.4 MB)'}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#1677FF]">
                  {isUpSelec ? 'Xem PDF' : 'Tải xuống'}
                </span>
              </a>

              <button
                onClick={handleDownloadDatasheet}
                className="w-full bg-white hover:bg-slate-100 border border-slate-300 rounded p-2.5 text-left flex items-center justify-between text-xs transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-800 block">Huong_Dan_Lap_Dat_{product.model}.pdf</span>
                    <span className="text-[10px] text-slate-400 font-mono">Sơ đồ đấu nối dây điện, tiếp địa và cấu hình mạng (PDF · 3.1 MB)</span>
                  </div>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#1677FF]">Tải xuống</span>
              </button>
            </div>

            {downloadSuccess && (
              <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-700 flex items-center gap-2 font-mono">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Đã kích hoạt tải file tài liệu mẫu về máy thành công.</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          {/* Metadata Discipline */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
              <span className="font-bold text-slate-900">{product.brand}</span>
              <span>·</span>
              <span>SKU: {product.model}</span>
              <span>·</span>
              <span className="text-emerald-600 font-semibold">{product.inStock ? 'Còn Hàng' : 'Đặt Hàng 7 Ngày'}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {product.name}
            </h1>

            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Pricing Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                {product.isB2BOnly ? 'KÊNH DỰ ÁN & ĐẠI LÝ' : 'GIÁ BÁN LẺ NIÊM YẾT'}
              </span>
              {product.isB2BOnly || product.price === null ? (
                <div>
                  <span className="text-lg font-bold text-[#0F172A] font-mono block">
                    Liên Hệ Báo Giá Dự Án
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Bảo hộ giá thầu, chiết khấu dự án theo số lượng
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-[#FF8A00] font-mono tabular-nums block">
                    {formatVND(product.price)}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-mono font-medium">
                    Đã bao gồm thuế GTGT (VAT 10%)
                  </span>
                </div>
              )}
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-4 text-xs font-mono text-slate-600">
              <div>Bảo hành: <strong className="text-slate-900">{product.warrantyMonths} tháng</strong></div>
              <div>Giao hàng: <strong className="text-emerald-600">Toàn quốc (24h)</strong></div>
            </div>
          </div>

          {/* Key Electrical Specs Snippet */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-700 bg-white border border-slate-200 rounded-lg p-3">
            <div className="p-1">
              <span className="text-[10px] text-slate-400 block">CÔNG SUẤT:</span>
              <strong className="text-slate-900">{product.powerVA}VA/{product.powerWatts}W</strong>
            </div>
            <div className="p-1">
              <span className="text-[10px] text-slate-400 block">CHUYỂN MẠCH:</span>
              <strong className={product.transferTimeMs === 0 ? 'text-emerald-600' : 'text-slate-900'}>
                {product.transferTimeMs} ms
              </strong>
            </div>
            <div className="p-1">
              <span className="text-[10px] text-slate-400 block">DẠNG SÓNG:</span>
              <span className="truncate block">{product.waveform === 'Pure Sine Wave' ? 'Sin chuẩn' : 'Mô phỏng'}</span>
            </div>
            <div className="p-1">
              <span className="text-[10px] text-slate-400 block">SỐ PHA:</span>
              <strong className="text-slate-900">{product.phase}</strong>
            </div>
          </div>

          {/* Purchase Actions */}
          <div className="space-y-3 pt-2">
            {product.isB2BOnly || product.price === null ? (
              <div className="space-y-2">
                <button
                  onClick={() => onOpenRFQ(product)}
                  className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[#FF8A00]" />
                  <span>NHẬN BÁO GIÁ DỰ ÁN CHO DOANH NGHIỆP / ĐẠI LÝ</span>
                </button>
                <p className="text-center text-xs text-slate-500">
                  Dòng công suất lớn từ 10kVA được tư vấn kỹ thuật trực tiếp và khảo sát mặt bằng miễn phí.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded p-1 bg-slate-50">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-white text-xs font-bold font-mono"
                    >
                      -
                    </button>
                    <span className="w-10 text-center text-sm font-bold font-mono text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded flex items-center justify-center text-slate-700 hover:bg-white text-xs font-bold font-mono"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => onAddToCart(product, quantity)}
                    className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4 text-[#FF8A00]" />
                    <span>THÊM VÀO GIỎ HÀNG</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product, quantity);
                    }}
                    className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>MUA NGAY</span>
                  </button>
                </div>

                <button
                  onClick={() => onOpenRFQ(product)}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-[#0F172A] bg-white hover:bg-slate-50 border border-slate-300 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-[#FF8A00]" />
                  <span>Mua số lượng lớn cho dự án? Yêu cầu báo giá chiết khấu</span>
                </button>
              </div>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="border-t border-slate-200 pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Chính hãng · Đầy đủ CO/CQ</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#1677FF] shrink-0" />
              <span>Miễn phí giao hàng nội thành Hà Nội & HCM</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#FF8A00] shrink-0" />
              <span>Hỗ trợ đấu nối & kiểm tra tải tận nơi</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 shrink-0" />
              <span>Bảo hành chính hãng {product.warrantyMonths} tháng</span>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: 4 CONTENT TABS */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Tab Headers */}
        <div className="bg-slate-100/80 border-b border-slate-200 p-1 flex items-center gap-1 overflow-x-auto text-xs font-medium">
          {[
            { id: 'specs', label: 'Bảng Thông Số Kỹ Thuật Chi Tiết' },
            { id: 'desc', label: 'Mô Tả & Ứng Dụng Thực Tế' },
            { id: 'install', label: 'Hướng Dẫn Lắp Đặt & An Toàn' },
            { id: 'faq', label: 'Hỏi Đáp Kỹ Thuật' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-md transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 font-bold shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Precise Technical Specs Table */}
        {activeTab === 'specs' && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">
              Bảng Thông Số Điện Học & Cơ Khí Đầy Đủ
            </h3>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left border-collapse font-mono">
                <tbody>
                  {[
                    { group: 'THÔNG SỐ ĐẦU RA (OUTPUT)' },
                    { label: 'Công suất biểu kiến / thực tế', value: `${product.powerVA} VA / ${product.powerWatts} Watts` },
                    { label: 'Hệ số công suất ngõ ra (PF)', value: `${product.powerFactor}` },
                    { label: 'Điện áp danh định đầu ra', value: product.voltageOut },
                    { label: 'Dạng sóng điện áp', value: product.waveform === 'Pure Sine Wave' ? 'Sóng Sin chuẩn thuần khiết (THD < 2%)' : 'Mô phỏng hình sin' },
                    { label: 'Thời gian chuyển mạch (Transfer Time)', value: `${product.transferTimeMs} ms (${product.transferTimeMs === 0 ? 'Chuẩn Online 0ms tuyệt đối' : 'Line-Interactive'})` },
                    { label: 'Tần số đồng bộ', value: product.frequencyHz },
                    { group: 'THÔNG SỐ ĐẦU VÀO (INPUT)' },
                    { label: 'Dải điện áp đầu vào', value: product.voltageIn },
                    { label: 'Cấu hình số pha', value: product.phase === '1:1' ? '1 Pha Vào / 1 Pha Ra (220V)' : '3 Pha Vào / 3 Pha Ra (380V)' },
                    { group: 'ẮC QUY & THỜI GIAN LƯU ĐIỆN' },
                    { label: 'Loại ắc quy', value: product.batteryType },
                    { label: 'Thời gian lưu 50% tải', value: `~${product.runtimeHalfLoadMin} phút` },
                    { label: 'Thời gian lưu 100% full tải', value: `~${product.runtimeFullLoadMin} phút` },
                    { label: 'Khả năng mở rộng pin ngoài (EBM)', value: product.expandableBattery ? 'Có hỗ trợ kết nối Module pin mở rộng' : 'Không (Ắc quy tích hợp sẵn trong máy)' },
                    { group: 'KÍCH THƯỚC & MÔI TRƯỜNG' },
                    { label: 'Kích thước thiết bị (CxRxS)', value: product.dimensionsMm },
                    { label: 'Trọng lượng tịnh', value: `${product.weightKg} kg` },
                    { label: 'Dạng lắp đặt', value: product.rackHeightU ? `Dạng Rackmount ${product.rackHeightU}U hoặc Tower đứng` : 'Tower đứng' },
                    { label: 'Thời hạn bảo hành chính hãng', value: `${product.warrantyMonths} tháng tại trung tâm ủy quyền` }
                  ].map((row, idx) => {
                    if (row.group) {
                      return (
                        <tr key={idx} className="bg-slate-100 font-sans font-bold text-slate-800 text-[11px]">
                          <td colSpan={2} className="p-2.5 px-4">{row.group}</td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                        <td className="p-2.5 px-4 font-sans text-slate-600 border-r border-slate-200 w-1/3">{row.label}</td>
                        <td className="p-2.5 px-4 text-slate-900 font-semibold">{row.value}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Detailed Description & Features */}
        {activeTab === 'desc' && (
          <div className="p-6 space-y-4 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Tính Năng Kỹ Thuật Nổi Bật Của {product.name}
            </h3>
            <p>
              Dòng sản phẩm <strong>{product.name}</strong> (Model: {product.model}) của hãng {product.brand} được thiết kế chuyên biệt để bảo vệ các hệ thống hạ tầng CNTT, máy chủ, tổng đài viễn thông và thiết bị điều khiển công nghiệp trước các sự cố nguồn điện phổ biến: mất điện đột ngột, sụt áp ngắn hạn, quá áp và sét lan truyền.
            </p>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2">Đặc điểm công nghệ cốt lõi:</h4>
              <ul className="space-y-1.5 list-disc list-inside">
                {product.keyFeatures.map((f, i) => (
                  <li key={i} className="text-slate-800">{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 3: Installation & Safety */}
        {activeTab === 'install' && (
          <div className="p-6 space-y-3 text-xs text-slate-700 leading-relaxed">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Khuyến Nghị Lắp Đặt & An Toàn Điện
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-1">1. Vị trí và thông gió</strong>
                <p>Đặt thiết bị nơi khô ráo, cách tường tối thiểu 20cm để quạt tản nhiệt lưu thông khí mát, tránh bụi bẩn và độ ẩm cao.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-1">2. Dây tiếp địa (Grounding)</strong>
                <p>Bắt buộc đấu nối tiếp địa đạt tiêu chuẩn điện trở tiếp đất &lt; 4 Ohm để chống nhiễu và bảo vệ an toàn cho kỹ sư vận hành.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-1">3. Khởi động và chạy thử</strong>
                <p>Cắm sạc điện lưới ít nhất 8 tiếng trước khi nối tải đầu tiên để nạp đầy dàn ắc quy.</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                <strong className="text-slate-900 block mb-1">4. Thiết bị cấm cắm vào UPS nhỏ</strong>
                <p>Tuyệt đối không cắm máy in laser, máy sấy tóc hoặc động cơ công suất lớn vào các dòng UPS dưới 2kVA.</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Technical FAQ */}
        {activeTab === 'faq' && (
          <div className="p-6 space-y-3 text-xs text-slate-700">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
              Câu Hỏi Kỹ Thuật Thường Gặp Về {product.model}
            </h3>
            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <strong className="text-slate-900 block">Sản phẩm này có thể chạy liên tục 24/7 trong phòng server không?</strong>
              <p className="mt-1 text-slate-600">Có. Thiết bị được thiết kế chuẩn Duty Cycle 100% vận hành liên tục suốt vòng đời mà không cần tắt nghỉ.</p>
            </div>
            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <strong className="text-slate-900 block">Khi mất điện, thiết bị có tự động gửi email cảnh báo không?</strong>
              <p className="mt-1 text-slate-600">Khi lắp thêm Card quản trị mạng SNMP (ví dụ APC NMC3 hoặc Eaton Network-M2), hệ thống sẽ gửi email cảnh báo lập tức và tự động ra lệnh tắt server an toàn.</p>
            </div>
          </div>
        )}
      </div>

      {/* COMPATIBLE ACCESSORIES & RELATED PRODUCTS */}
      <div>
        <h3 className="text-base font-bold text-slate-900 tracking-tight mb-4">
          Sản Phẩm Cùng Phân Khúc & Phụ Kiện Tương Thích
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedProducts.map(p => (
            <div
              key={p.id}
              onClick={() => {
                onSelectProduct(p);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-slate-200 rounded-lg p-4 cursor-pointer hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-500 block mb-1">{p.brand} · {p.powerVA}VA</span>
                <h4 className="font-bold text-slate-900 text-xs line-clamp-2">{p.name}</h4>
                <span className="text-xs font-bold text-[#FF8A00] font-mono mt-2 block">
                  {p.isB2BOnly || p.price === null ? 'Báo Giá Dự Án' : formatVND(p.price)}
                </span>
              </div>
              <span className="text-[11px] text-[#1677FF] font-medium pt-3 mt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Xem chi tiết</span>
                <span>→</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
