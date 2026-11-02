import React, { useState } from 'react';
import { X, FileText, CheckCircle2, UploadCloud, Shield, Building, Phone, Mail, User } from 'lucide-react';
import { Product, RFQFormData } from '../types';

interface B2BRfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProduct?: Product | null;
  prefilledNotes?: string;
}

export const B2BRfqModal: React.FC<B2BRfqModalProps> = ({
  isOpen,
  onClose,
  targetProduct,
  prefilledNotes = '',
}) => {
  const [formData, setFormData] = useState<RFQFormData>({
    fullName: '',
    companyName: '',
    phone: '',
    email: '',
    city: 'Hà Nội',
    projectRole: 'Nhà thầu M&E / Tích hợp hệ thống',
    requiredPowerKva: targetProduct ? `${targetProduct.powerVA >= 1000 ? targetProduct.powerVA / 1000 : targetProduct.powerVA} kVA` : '10 - 20 kVA',
    preferredBrands: targetProduct ? [targetProduct.brand] : ['APC', 'Vertiv'],
    targetRuntimeMin: '15 - 30 phút',
    quantity: 1,
    notes: prefilledNotes || (targetProduct ? `Yêu cầu báo giá dự án cho thiết bị: ${targetProduct.name} (Model: ${targetProduct.model}).` : ''),
    fileName: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [rfqCode, setRfqCode] = useState('');
  const [simulatedFile, setSimulatedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleBrandToggle = (brand: string) => {
    setFormData(prev => {
      const exists = prev.preferredBrands.includes(brand as any);
      const updated = exists 
        ? prev.preferredBrands.filter(b => b !== brand)
        : [...prev.preferredBrands, brand as any];
      return { ...prev, preferredBrands: updated };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSimulatedFile(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) return;

    const generatedCode = `RFQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setRfqCode(generatedCode);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded bg-[#FF8A00] text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Yêu Cầu Báo Giá Dự Án & Đại Lý B2B (RFQ)
              </h3>
              <p className="text-[11px] text-slate-400">
                Nhận báo giá chiết khấu, sơ đồ đấu nối và hồ sơ thầu CO/CQ trong 15-30 phút
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
            aria-label="Đóng form"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          /* Confirmation Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                GỬI YÊU CẦU THÀNH CÔNG
              </span>
              <h4 className="text-xl font-bold text-slate-900 pt-2">
                Cảm ơn Quý Khách Hàng / Đối Tác!
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Mã yêu cầu báo giá của bạn là: <strong className="text-[#0F172A] font-mono text-base">{rfqCode}</strong>.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 max-w-md mx-auto text-left text-xs font-mono space-y-1.5 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Khách hàng:</span>
                <strong>{formData.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Số điện thoại:</span>
                <strong>{formData.phone}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doanh nghiệp:</span>
                <span>{formData.companyName || 'Khách hàng dự án'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Công suất yêu cầu:</span>
                <strong className="text-[#FF8A00]">{formData.requiredPowerKva}</strong>
              </div>
              {simulatedFile && (
                <div className="flex justify-between text-slate-600 border-t border-slate-200 pt-1">
                  <span>File đính kèm:</span>
                  <span className="truncate max-w-[200px]">{simulatedFile}</span>
                </div>
              )}
            </div>

            <p className="text-xs text-slate-500">
              Kỹ sư giải pháp UPS PRO sẽ chủ động liên hệ trực tiếp qua số <strong>{formData.phone}</strong> để cung cấp bảng giá chiết khấu tốt nhất và hồ sơ kỹ thuật.
            </p>

            <button
              onClick={handleResetAndClose}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded transition-colors shadow-sm"
            >
              Hoàn Tất & Đóng
            </button>
          </div>
        ) : (
          /* RFQ Input Form */
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {targetProduct && (
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block">SẢN PHẨM ĐANG QUAN TÂM:</span>
                  <strong className="text-slate-900 text-sm">{targetProduct.name}</strong>
                  <span className="text-slate-500 font-mono ml-2">[{targetProduct.model}] · {targetProduct.powerVA}VA</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#FF8A00] bg-orange-100/60 px-2 py-0.5 rounded">
                  Chính Hãng {targetProduct.brand}
                </span>
              </div>
            )}

            {/* Section 1: Customer details */}
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>1. Thông Tin Doanh Nghiệp & Người Liên Hệ</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Họ và tên người yêu cầu <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Ví dụ: Nguyễn Văn An"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Số điện thoại / Zalo <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ví dụ: 0912.345.678"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Email công vụ (nhận bảng giá & datasheet)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="an.nguyen@company.com.vn"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Tên công ty / Cơ quan / Nhà thầu
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Công ty CP Cơ Điện M&E Hà Nội"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tỉnh / Thành phố dự án</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none bg-white"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Đồng Nai">Đồng Nai</option>
                    <option value="Tỉnh thành khác">Tỉnh thành khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Vai trò của bạn trong dự án</label>
                  <select
                    value={formData.projectRole}
                    onChange={(e) => setFormData({ ...formData, projectRole: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none bg-white"
                  >
                    <option value="Nhà thầu M&E / Tích hợp hệ thống">Nhà thầu M&E / Tích hợp hệ thống</option>
                    <option value="Chủ đầu tư / Doanh nghiệp sử dụng">Chủ đầu tư / Doanh nghiệp sử dụng</option>
                    <option value="Quản trị viên IT / SysAdmin">Quản trị viên IT / SysAdmin</option>
                    <option value="Đại lý phân phối / Mua thương mại">Đại lý phân phối / Mua thương mại</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Technical Project Specs */}
            <div className="border-t border-slate-200 pt-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5 text-[#1677FF]" />
                <span>2. Yêu Cầu Kỹ Thuật & Cấu Hình Dự Án</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Dải công suất dự kiến</label>
                  <input
                    type="text"
                    value={formData.requiredPowerKva}
                    onChange={(e) => setFormData({ ...formData, requiredPowerKva: e.target.value })}
                    placeholder="Ví dụ: 20kVA, 40kVA hoặc 100kVA"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Thời gian lưu điện cần thiết</label>
                  <select
                    value={formData.targetRuntimeMin}
                    onChange={(e) => setFormData({ ...formData, targetRuntimeMin: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none bg-white font-mono"
                  >
                    <option value="10 - 15 phút">10 – 15 phút (Chuẩn)</option>
                    <option value="30 - 45 phút">30 – 45 phút (Máy phát)</option>
                    <option value="1 - 2 giờ">1 – 2 giờ (Tủ EBM)</option>
                    <option value="4+ giờ">4+ giờ (Ắc quy dung lượng lớn)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Số lượng bộ (Cấu hình N+1?)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                  />
                </div>
              </div>

              {/* Brand checkboxes */}
              <div className="mt-3">
                <label className="block font-medium text-slate-700 mb-1 text-xs">Thương hiệu ưu tiên trong hồ sơ thầu:</label>
                <div className="flex flex-wrap gap-2 text-xs">
                  {['APC', 'Eaton', 'Vertiv', 'Santak', 'Delta', 'CyberPower'].map(b => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => handleBrandToggle(b)}
                      className={`px-3 py-1 rounded border text-xs font-mono transition-colors ${
                        formData.preferredBrands.includes(b as any)
                          ? 'border-[#0F172A] bg-[#0F172A] text-white font-bold'
                          : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 3: Notes & File Upload */}
            <div className="border-t border-slate-200 pt-3 text-xs space-y-3">
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Ghi chú chi tiết yêu cầu kỹ thuật hoặc tiến độ cấp hàng:
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ví dụ: Cần khảo sát hiện trường phòng server, tư vấn tủ ATS chuyển nguồn tự động và CO/CQ gốc công chứng..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
              </div>

              {/* File Attachment Dropzone */}
              <div>
                <label className="block font-medium text-slate-700 mb-1">
                  Đính kèm file BOQ, bảng bóc tách khối lượng hoặc bản vẽ sơ đồ đơn tuyến (tùy chọn):
                </label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-3 text-center hover:border-slate-400 bg-slate-50/50 transition-colors">
                  <input
                    type="file"
                    id="rfq-file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.dwg,.xlsx,.xls,.docx"
                  />
                  <label htmlFor="rfq-file-upload" className="cursor-pointer flex flex-col items-center gap-1">
                    <UploadCloud className="w-5 h-5 text-slate-400" />
                    <span className="text-xs text-slate-600 font-medium">
                      {simulatedFile ? (
                        <span className="text-emerald-600 font-bold font-mono">Đã chọn: {simulatedFile}</span>
                      ) : (
                        <span>Nhấp để tải lên file BOQ (PDF, Excel, DWG - Tối đa 25MB)</span>
                      )}
                    </span>
                  </label>
                </div>
              </div>

              {/* Privacy consent */}
              <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  UPS PRO cam kết bảo mật 100% hồ sơ dự án của quý đối tác, không chia sẻ cho bên thứ ba và cung cấp giá bảo hộ đại lý minh bạch.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
              >
                Hủy Bỏ
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded transition-colors flex items-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#FF8A00]" />
                <span>GỬI YÊU CẦU BÁO GIÁ DỰ ÁN</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
