import React, { useState } from 'react';
import { 
  Wrench, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Clock, 
  PhoneCall, 
  CheckCircle2, 
  Calendar,
  FileText
} from 'lucide-react';

interface ServicesViewProps {
  onOpenRFQ: (product?: any, notes?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenRFQ }) => {
  const [serviceType, setServiceType] = useState('Đo kiểm & Thay thế ắc quy');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setBookingSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
          DỊCH VỤ KỸ THUẬT NGUỒN ĐIỆN LIÊN TỤC
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Bảo Trì, Sửa Chữa & Nâng Cấp Hệ Thống UPS Toàn Quốc
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Đội ngũ kỹ sư cơ điện M&E được đào tạo chính quy bởi Schneider Electric, Eaton, Vertiv với hơn 10 năm kinh nghiệm xử lý các sự cố nguồn điện phức tạp nhất.
        </p>
      </div>

      {/* SLA Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-1 font-mono">
          <Clock className="w-5 h-5 text-[#FF8A00] mb-2" />
          <span className="text-[11px] text-slate-400 block">SLA PHẢN HỒI:</span>
          <strong className="text-lg text-white font-bold">&lt; 15 Phút</strong>
          <p className="text-xs text-slate-400 font-sans">Kỹ sư trực hotline tiếp nhận sự cố kỹ thuật 24/7/365.</p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-1 font-mono">
          <Wrench className="w-5 h-5 text-emerald-400 mb-2" />
          <span className="text-[11px] text-slate-400 block">CÓ MẶT HIỆN TRƯỜNG:</span>
          <strong className="text-lg text-emerald-400 font-bold">&lt; 2 Giờ</strong>
          <p className="text-xs text-slate-400 font-sans">Tại khu vực nội thành Hà Nội và TP. Hồ Chí Minh.</p>
        </div>

        <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 space-y-1 font-mono">
          <ShieldCheck className="w-5 h-5 text-[#1677FF] mb-2" />
          <span className="text-[11px] text-slate-400 block">THIẾT BỊ ĐO KIỂM:</span>
          <strong className="text-lg text-[#1677FF] font-bold">Hioki & Fluke</strong>
          <p className="text-xs text-slate-400 font-sans">Máy đo nội trở ắc quy, camera nhiệt và máy phân tích sóng hài chuyên dụng.</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: '1. Khảo Sát & Đo Kiểm Phụ Tải Hiện Trường',
            desc: 'Đo lường công suất tiêu thụ thực tế, phân tích dòng điện khởi động (Inrush Current), đo độ méo sóng hài THD để chọn đúng công suất UPS tránh lãng phí chi phí.',
            checklist: [
              'Báo cáo kỹ thuật chi tiết kèm biểu đồ phụ tải',
              'Đánh giá hệ thống tiếp địa và tủ phân phối',
              'Hoàn toàn miễn phí trước khi ký hợp đồng'
            ]
          },
          {
            title: '2. Lắp Đặt, Đấu Nối & Thử Nghiệm Tải Giả',
            desc: 'Thi công kéo cáp động lực, lắp đặt tủ chuyển nguồn tự động ATS, đấu nối tủ ắc quy mở rộng và kiểm tra xả tải giả (Load Bank) 100% công suất trước khi bàn giao.',
            checklist: [
              'Tuân thủ nghiêm ngặt quy chuẩn an toàn điện IEC',
              'Cung cấp biên bản nghiệm thu và bản vẽ hoàn công',
              'Đào tạo chuyển giao vận hành cho cán bộ IT'
            ]
          },
          {
            title: '3. Bảo Dưỡng Định Kỳ & Đo Nội Trở Ắc Quy',
            desc: 'Sử dụng máy đo nội trở Hioki để phát hiện sớm các bình ắc quy chai hỏng tiềm ẩn nguy cơ chập cháy, vệ sinh hút bụi bo mạch, kiểm tra tụ điện và quạt gió làm mát.',
            checklist: [
              'Phát hiện bình ắc quy lỗi trước khi UPS bị sập',
              'Gia hạn hợp đồng bảo trì 1 - 3 năm linh hoạt',
              'Cam kết có thiết bị tương đương thay thế khi sửa'
            ]
          },
          {
            title: '4. Cho Thuê UPS Dự Phòng Khẩn Cấp',
            desc: 'Cung cấp dịch vụ cho thuê bộ lưu điện công suất từ 3kVA đến 200kVA cho các sự kiện truyền hình trực tiếp, hội nghị quốc tế hoặc dự phòng tạm thời trong thời gian bảo trì.',
            checklist: [
              'Sẵn sàng bàn giao và chạy thử trong 6 - 12 giờ',
              'Kỹ sư túc trực giám sát liên tục suốt sự kiện',
              'Đầy đủ cáp nguồn và phụ kiện đi kèm'
            ]
          }
        ].map((srv, idx) => (
          <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-slate-300 transition-colors">
            <h3 className="font-bold text-slate-900 text-base">{srv.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
            <ul className="space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-700">
              {srv.checklist.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Booking Form Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900">
              Đặt Lịch Khảo Sát / Yêu Cầu Dịch Vụ Kỹ Thuật
            </h3>
            <p className="text-xs text-slate-500">
              Để lại số điện thoại, kỹ sư UPS PRO sẽ gọi lại trong 5 phút để xác nhận lịch hẹn hiện trường.
            </p>
          </div>

          {bookingSubmitted ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center space-y-2 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <strong className="text-emerald-800 text-sm block">Đã ghi nhận yêu cầu dịch vụ!</strong>
              <p className="text-slate-600">
                Kỹ sư phụ trách khu vực sẽ liên hệ qua số điện thoại <strong>{phone}</strong> để xác nhận thời gian khảo sát cụ thể.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Dịch vụ cần hỗ trợ:</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white focus:border-[#1677FF] outline-none"
                  >
                    <option value="Đo kiểm & Thay thế ắc quy">Đo kiểm & Thay thế ắc quy UPS</option>
                    <option value="Khảo sát tải & Tư vấn lắp đặt">Khảo sát tải & Tư vấn lắp đặt</option>
                    <option value="Sửa chữa sự cố UPS báo lỗi">Sửa chữa sự cố UPS báo lỗi</option>
                    <option value="Bảo dưỡng định kỳ toàn diện">Bảo dưỡng định kỳ toàn diện</option>
                    <option value="Thuê UPS sự kiện ngắn hạn">Thuê UPS sự kiện ngắn hạn</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Số điện thoại / Zalo (*):</label>
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
                <label className="block font-medium text-slate-700 mb-1">Địa điểm & Model thiết bị hiện có:</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ví dụ: Cần thay ắc quy cho 2 bộ APC SRT 3000VA tại Cầu Giấy, Hà Nội..."
                  className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors shadow-sm"
              >
                GỬI YÊU CẦU DỊCH VỤ NGAY
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
