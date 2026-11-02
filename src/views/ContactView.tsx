import React, { useState } from 'react';
import { MapPin, PhoneCall, Mail, Clock, CheckCircle2, MessageSquare } from 'lucide-react';
import { CompanyInfo } from '../types';

interface ContactViewProps {
  companyInfo: CompanyInfo;
}

export const ContactView: React.FC<ContactViewProps> = ({ companyInfo }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-mono font-bold text-[#1677FF] uppercase tracking-wider block">
          LIÊN HỆ & TRUNG TÂM KỸ THUẬT
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Kết Nối Với Đội Ngũ Chuyên Gia UPS PRO
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Chúng tôi có văn phòng kinh doanh và trung tâm bảo dưỡng tại TP. Hồ Chí Minh và Hà Nội, sẵn sàng hỗ trợ khách hàng và các nhà thầu dự án 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Office & Coordinates Info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="font-bold text-slate-900 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
              Trụ Sở & Văn Phòng Giao Dịch
            </h2>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 text-[#FF8A00]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold text-sm">Địa chỉ công ty:</strong>
                  <span className="text-slate-700 font-medium">{companyInfo.address}</span>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">Hotline: {companyInfo.hotline}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center shrink-0 text-[#1677FF]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 block font-semibold text-sm">Thời gian làm việc:</strong>
                  <span className="text-slate-600">Thứ Hai – Thứ Bảy: 8:00 – 18:00</span>
                  <span className="text-emerald-600 font-mono block mt-0.5 font-semibold">Đội phản ứng nhanh sự cố trực 24/7</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0F172A] text-white rounded-xl p-6 space-y-3 font-mono text-xs">
            <span className="text-[#FF8A00] font-bold block">KÊNH HỖ TRỢ TRỰC TUYẾN</span>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Hotline/Zalo:</span>
              <strong className="text-emerald-400">{companyInfo.hotline}</strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Email:</span>
              <strong className="text-white">{companyInfo.email}</strong>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm space-y-5">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Gửi Tin Nhắn / Yêu Cầu Hỗ Trợ</h2>
            <p className="text-xs text-slate-500">
              Nhập nội dung thắc mắc hoặc yêu cầu kỹ thuật, kỹ sư phụ trách sẽ phản hồi qua điện thoại hoặc email trong vòng 30 phút.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Gửi Tin Nhắn Thành Công!</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                Cảm ơn bạn đã liên hệ với UPS PRO. Kỹ sư tư vấn sẽ chủ động gọi lại qua số <strong>{phone}</strong> trong thời gian sớm nhất.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded hover:bg-slate-50"
              >
                Gửi thêm tin nhắn khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Họ và tên (*):</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nguyễn Văn An"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Số điện thoại (*):</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912.xxx.xxx"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Email liên hệ:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="an.nguyen@company.com"
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Nội dung yêu cầu hoặc thông tin thiết bị:</label>
                <textarea
                  rows={4}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Tôi cần tư vấn bộ lưu điện cho hệ thống 5 máy chủ và 1 camera NVR..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#FF8A00]" />
                <span>GỬI YÊU CẦU TƯ VẤN NGAY</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
