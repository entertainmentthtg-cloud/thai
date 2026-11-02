import React from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  if (!isOpen) return null;

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const rawSubtotal = cart.reduce((sum, item) => sum + (item.product.price || 0) * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-150">
      <div className="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 bg-[#0F172A] text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-[#FF8A00]" />
            <h3 className="text-sm font-bold text-white tracking-tight">
              Giỏ Hàng Của Bạn ({cart.reduce((sum, i) => sum + i.quantity, 0)} thiết bị)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Notice */}
        <div className="bg-blue-50 border-b border-blue-100 px-4 py-2 text-xs text-[#1677FF] flex items-center gap-1.5 font-medium">
          <Truck className="w-4 h-4 shrink-0" />
          <span>Miễn phí giao hàng & hỗ trợ kỹ thuật đấu nối tại Hà Nội & TP.HCM</span>
        </div>

        {/* Drawer Body: Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-700">Giỏ hàng của bạn đang trống</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Khám phá các sản phẩm UPS chính hãng của chúng tôi và chọn thiết bị phù hợp với công suất của bạn.
              </p>
            </div>
          ) : (
            cart.map(({ product, quantity }) => (
              <div 
                key={product.id}
                className="p-3 rounded-lg border border-slate-200 bg-white flex gap-3 items-start justify-between hover:border-slate-300 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 mb-0.5">
                    <span className="font-bold text-slate-800">{product.brand}</span>
                    <span>·</span>
                    <span>{product.model}</span>
                    <span>·</span>
                    <span>{product.powerVA}VA</span>
                  </div>

                  <h4 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-snug">
                    {product.name}
                  </h4>

                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="text-xs font-bold text-[#FF8A00] font-mono tabular-nums">
                      {formatVND((product.price || 0) * quantity)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      ({formatVND(product.price || 0)} / bộ)
                    </span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-slate-200 rounded p-0.5 bg-slate-50">
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded text-xs font-bold font-mono"
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-xs font-mono font-bold text-slate-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-slate-600 hover:bg-white rounded text-xs font-bold font-mono"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(product.id)}
                      className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-mono transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Xóa</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1.5 text-xs font-mono">
              <div className="flex justify-between text-slate-600">
                <span>Tạm tính hàng hóa:</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatVND(rawSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Hóa đơn GTGT (VAT 10%):</span>
                <span className="text-emerald-600 font-medium">Đã bao gồm trong giá</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Vận chuyển & Bàn giao:</span>
                <span className="text-emerald-600 font-bold">MIỄN PHÍ</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm">
                <strong className="text-slate-900">TỔNG CỘNG:</strong>
                <strong className="text-base text-[#FF8A00] font-bold tabular-nums">
                  {formatVND(rawSubtotal)}
                </strong>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Cam kết xuất hóa đơn điện tử VAT hợp pháp trong ngày</span>
            </div>

            <div className="grid grid-cols-1 gap-2 pt-1">
              <button
                onClick={() => {
                  onClose();
                  onProceedCheckout();
                }}
                className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <span>TIẾN HÀNH ĐẶT HÀNG NGAY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 px-3 text-xs font-medium text-slate-600 hover:text-slate-900 text-center"
              >
                Tiếp tục xem sản phẩm khác
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
