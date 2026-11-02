import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  QrCode, 
  Building, 
  Printer, 
  Check 
} from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutViewProps {
  cart: CartItem[];
  onBackToCart: () => void;
  onClearCart: () => void;
  onNavigateHome: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  cart,
  onBackToCart,
  onClearCart,
  onNavigateHome,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Hà Nội');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cod'>('qr');
  
  // VAT invoice options
  const [needVatInvoice, setNeedVatInvoice] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [taxId, setTaxId] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [orderId, setOrderId] = useState('');

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !address) return;

    const generatedId = `UPS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setOrderConfirmed(true);
    onClearCart();
  };

  if (orderConfirmed) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 uppercase tracking-wider">
            ĐẶT HÀNG THÀNH CÔNG
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 pt-2">
            Cảm Ơn Quý Khách Đã Đặt Hàng Tại UPS PRO!
          </h1>
          <p className="text-xs text-slate-600">
            Mã đơn hàng chính thức của bạn là: <strong className="text-slate-900 font-mono text-base">{orderId}</strong>
          </p>
        </div>

        {/* Order Receipt Box */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 text-left text-xs font-mono space-y-3 shadow-sm">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Người nhận hàng:</span>
            <strong className="text-slate-800">{fullName} ({phone})</strong>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Địa chỉ giao:</span>
            <span className="text-slate-800 font-sans">{address}, {city}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Hình thức thanh toán:</span>
            <span className="text-slate-800">{paymentMethod === 'qr' ? 'Chuyển khoản VietQR / Napas247' : 'Thanh toán tiền mặt khi nhận (COD)'}</span>
          </div>
          {needVatInvoice && (
            <div className="flex justify-between border-b border-slate-100 pb-2 text-emerald-700">
              <span>Xuất hóa đơn VAT cho:</span>
              <span className="font-bold">{companyName} (MST: {taxId})</span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-sm font-bold">
            <span>TỔNG TIỀN THANH TOÁN:</span>
            <span className="text-[#FF8A00] tabular-nums">{formatVND(rawSubtotal)}</span>
          </div>
        </div>

        {paymentMethod === 'qr' && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center space-y-2">
            <span className="text-xs font-mono font-bold text-slate-800 block">
              Quét Mã VietQR Napas247 Để Kích Hoạt Xuất Kho Ngay:
            </span>
            {/* Simulated VietQR visual */}
            <div className="w-44 h-44 bg-white border-2 border-slate-800 rounded-lg p-2 mx-auto flex flex-col items-center justify-center relative shadow-sm">
              <QrCode className="w-32 h-32 text-slate-900" />
              <span className="text-[10px] font-mono text-slate-500 mt-1">Napas247 · VietinBank</span>
            </div>
            <div className="text-xs font-mono text-slate-600 space-y-0.5">
              <div>Số TK: <strong className="text-slate-900">1088.1234.5678</strong> (VietinBank)</div>
              <div>Chủ TK: <strong className="text-slate-900">CONG TY TNHH UPS PRO VIET NAM</strong></div>
              <div>Nội dung CK: <strong className="text-[#1677FF]">{orderId}</strong></div>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-3 pt-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 text-xs font-semibold text-slate-700 border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>In Phiếu Đơn Hàng</span>
          </button>
          <button
            onClick={onNavigateHome}
            className="px-6 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded transition-colors"
          >
            Về Trang Chủ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <button
        onClick={onBackToCart}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 font-mono transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Quay lại giỏ hàng</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Checkout Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h1 className="text-xl font-bold text-slate-900">
              Thông Tin Đặt Hàng & Thanh Toán
            </h1>
            <p className="text-xs text-slate-500">
              Vui lòng nhập đầy đủ thông tin để kỹ sư kỹ thuật chuẩn bị thiết bị và giao hàng đúng hẹn.
            </p>
          </div>

          <form onSubmit={handleSubmitOrder} className="space-y-6 text-xs">
            {/* Customer Details */}
            <div className="space-y-3">
              <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                1. Người Nhận Hàng
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">
                    Họ và tên (*):
                  </label>
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
                  <label className="block font-medium text-slate-700 mb-1">
                    Số điện thoại (*):
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0912.345.678"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Email nhận mã theo dõi & Hóa đơn VAT điện tử:
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="an.nguyen@gmail.com"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                2. Địa Chỉ Giao Hàng & Lắp Đặt
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-medium text-slate-700 mb-1">
                    Địa chỉ chi tiết (Số nhà, tên đường, tòa nhà) (*):
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Phòng 502, Tòa nhà Alpha, Phố Duy Tân"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Tỉnh / Thành phố:</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded bg-white focus:border-[#1677FF] outline-none"
                  >
                    <option value="Hà Nội">Hà Nội</option>
                    <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                    <option value="Đà Nẵng">Đà Nẵng</option>
                    <option value="Hải Phòng">Hải Phòng</option>
                    <option value="Bắc Ninh">Bắc Ninh</option>
                    <option value="Bình Dương">Bình Dương</option>
                    <option value="Tỉnh khác">Tỉnh khác</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Corporate VAT 10% Option */}
            <div className="space-y-3 pt-3 border-t border-slate-100 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-900">
                <input
                  type="checkbox"
                  checked={needVatInvoice}
                  onChange={(e) => setNeedVatInvoice(e.target.checked)}
                  className="rounded text-[#1677FF]"
                />
                <span>Yêu Cầu Xuất Hóa Đơn Điện Tử GTGT (VAT 10%) Cho Doanh Nghiệp</span>
              </label>

              {needVatInvoice && (
                <div className="space-y-2 pt-2 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Mã số thuế doanh nghiệp (*):</label>
                      <input
                        type="text"
                        required={needVatInvoice}
                        value={taxId}
                        onChange={(e) => setTaxId(e.target.value)}
                        placeholder="0101234567"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">Tên công ty xuất hóa đơn (*):</label>
                      <input
                        type="text"
                        required={needVatInvoice}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="Công ty Cổ phần Công nghệ ABC"
                        className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Địa chỉ đăng ký kinh doanh:</label>
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Trụ sở theo giấy phép DKKD"
                      className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <h2 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                3. Phương Thức Thanh Toán
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 ${
                  paymentMethod === 'qr' ? 'border-[#1677FF] bg-blue-50/40 ring-1 ring-[#1677FF]' : 'border-slate-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                    className="mt-0.5 text-[#1677FF]"
                  />
                  <div>
                    <strong className="text-slate-900 block font-semibold flex items-center gap-1.5">
                      <QrCode className="w-3.5 h-3.5 text-[#1677FF]" />
                      <span>Chuyển Khoản VietQR / Napas247</span>
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      Quét mã QR tự động điền số tiền và nội dung, duyệt xuất kho trong 5 phút.
                    </span>
                  </div>
                </label>

                <label className={`p-3 rounded-lg border cursor-pointer flex items-start gap-2.5 ${
                  paymentMethod === 'cod' ? 'border-[#1677FF] bg-blue-50/40 ring-1 ring-[#1677FF]' : 'border-slate-200 bg-white'
                }`}>
                  <input
                    type="radio"
                    name="pay"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="mt-0.5 text-[#1677FF]"
                  />
                  <div>
                    <strong className="text-slate-900 block font-semibold flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-600" />
                      <span>Thanh Toán Khi Nhận (COD)</span>
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      Kiểm tra thùng hàng nguyên niêm phong và thanh toán tiền mặt cho nhân viên giao hàng.
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-lg transition-colors shadow-sm"
            >
              XÁC NHẬN ĐẶT HÀNG NGAY ({formatVND(rawSubtotal)})
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <h3 className="font-bold text-slate-900 text-sm border-b border-slate-200 pb-2">
            Đơn Hàng Của Bạn ({cart.length} thiết bị)
          </h3>

          <div className="space-y-3 divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="pt-2 flex justify-between gap-3 text-xs">
                <div>
                  <strong className="text-slate-900 block line-clamp-1">{product.name}</strong>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {product.brand} · {product.model} · SL: {quantity}
                  </span>
                </div>
                <div className="text-right shrink-0 font-mono font-bold text-slate-800 tabular-nums">
                  {formatVND((product.price || 0) * quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-3 space-y-1.5 text-xs font-mono">
            <div className="flex justify-between text-slate-600">
              <span>Tạm tính:</span>
              <span className="font-bold tabular-nums">{formatVND(rawSubtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Thuế GTGT (VAT 10%):</span>
              <span className="text-emerald-600">Đã bao gồm</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Phí vận chuyển:</span>
              <span className="text-emerald-600 font-bold">MIỄN PHÍ</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold">
              <span className="text-slate-900 font-sans">TỔNG CỘNG:</span>
              <span className="text-[#FF8A00] tabular-nums">{formatVND(rawSubtotal)}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Bảo hành chính hãng 1 đổi 1 trong 30 ngày nếu lỗi kỹ thuật</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-[#1677FF] shrink-0" />
              <span>Giao hàng và lắp đặt tận nơi bởi kỹ sư điện chuyên trách</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
