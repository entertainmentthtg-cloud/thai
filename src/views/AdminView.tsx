import React, { useState, useRef } from 'react';
import { 
  Lock, 
  User, 
  LogOut, 
  Settings, 
  Package, 
  ShoppingCart, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Save, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  Eye, 
  FileDown, 
  ShieldCheck, 
  TrendingUp, 
  RefreshCw,
  Search,
  Check,
  X,
  Upload,
  Image as ImageIcon,
  Tag,
  Globe
} from 'lucide-react';
import { Product, CompanyInfo, Order, RFQFormData, Brand, UPSTopology, BrandItem } from '../types';
import { HardwareSchematic } from '../components/HardwareSchematic';

interface AdminViewProps {
  companyInfo: CompanyInfo;
  onUpdateCompanyInfo: (info: CompanyInfo) => void;
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onResetCatalog: () => void;
  brands: BrandItem[];
  onAddBrand: (brand: BrandItem) => void;
  onUpdateBrand: (brand: BrandItem, oldName?: string) => void;
  onDeleteBrand: (brandId: string) => void;
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  rfqLeads: { id: string; data: RFQFormData; createdAt: string; status: string }[];
  onUpdateRfqStatus: (id: string, status: string) => void;
  onNavigateHome: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  companyInfo,
  onUpdateCompanyInfo,
  products,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onResetCatalog,
  brands,
  onAddBrand,
  onUpdateBrand,
  onDeleteBrand,
  orders,
  onUpdateOrderStatus,
  rfqLeads,
  onUpdateRfqStatus,
  onNavigateHome,
}) => {
  // Login auth state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ups_admin_auth') === 'true';
  });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'overview' | 'company' | 'products' | 'orders' | 'rfqs' | 'upselec-catalog'>('overview');
  
  // Product management sub-tab: 'products' (Danh sách sản phẩm) or 'brands' (Danh sách thương hiệu)
  const [productSubTab, setProductSubTab] = useState<'products' | 'brands'>('products');

  // Company info form local state
  const [editCompany, setEditCompany] = useState<CompanyInfo>(companyInfo);
  const [companySaveSuccess, setCompanySaveSuccess] = useState(false);

  // Product edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [brandFilter, setBrandFilter] = useState<string>('all');
  const [productSavedToast, setProductSavedToast] = useState('');

  // Brand edit modal state
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);
  const [isAddingNewBrand, setIsAddingNewBrand] = useState(false);
  const [brandActionToast, setBrandActionToast] = useState('');

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if ((username === 'admin' && password === 'upspro@2026') || (username === 'admin' && password === 'admin')) {
      setIsAuthenticated(true);
      localStorage.setItem('ups_admin_auth', 'true');
      setLoginError('');
    } else {
      setLoginError('Tài khoản hoặc mật khẩu không chính xác.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ups_admin_auth');
  };

  // Save company info
  const handleSaveCompany = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateCompanyInfo(editCompany);
    setCompanySaveSuccess(true);
    setTimeout(() => setCompanySaveSuccess(false), 3000);
  };

  // Quick price change inline
  const handleQuickPriceChange = (product: Product, newPriceStr: string) => {
    const val = parseInt(newPriceStr.replace(/\D/g, '')) || 0;
    onUpdateProduct({ ...product, price: val });
  };

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  // Filtered products list
  const filteredProducts = products.filter(p => {
    if (brandFilter !== 'all' && p.brand !== brandFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.model.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  // Calculate stats
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const upSelecCount = products.filter(p => p.brand === 'Up Selec').length;

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-100">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#0F172A] text-white p-6 text-center space-y-2 border-b border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-[#FF8A00] flex items-center justify-center mx-auto text-white shadow-md">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold tracking-tight">Hệ Thống Quản Trị UPS PRO</h2>
            <p className="text-xs text-slate-400">Đăng nhập tài khoản Admin để quản lý danh mục và thông tin</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4 text-xs">
            {loginError && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded text-xs">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-medium text-slate-700 mb-1">Tên đăng nhập:</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-medium text-slate-700 mb-1">Mật khẩu:</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors shadow-sm"
            >
              ĐĂNG NHẬP ADMIN
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← Quay lại website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <header className="bg-[#0F172A] text-white px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="bg-[#FF8A00] text-white font-mono font-bold px-2 py-0.5 rounded text-xs">
            ADMIN PORTAL
          </span>
          <h1 className="text-sm font-bold text-white tracking-tight hidden sm:block">
            UPS PRO Management System
          </h1>
          <span className="text-xs text-slate-400 font-mono hidden md:inline">
            | Hotline: {companyInfo.hotline}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onNavigateHome}
            className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Xem Website</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-rose-300 hover:text-white bg-rose-950/60 hover:bg-rose-900 border border-rose-800/80 rounded transition-colors flex items-center gap-1.5 font-mono"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </header>

      {/* Admin Content Area with Sidebar & Main Body */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-2">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm space-y-1 text-xs font-medium">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'overview' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-[#FF8A00]" />
              <span>Tổng Quan & Thống Kê</span>
            </button>

            <button
              onClick={() => setActiveTab('company')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2.5 transition-colors ${
                activeTab === 'company' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Settings className="w-4 h-4 text-[#1677FF]" />
              <span>Thông Tin Doanh Nghiệp</span>
            </button>

            <div className="space-y-0.5">
              <button
                onClick={() => {
                  setActiveTab('products');
                  setProductSubTab('products');
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                  activeTab === 'products' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4 text-emerald-500" />
                  <span>Quản Lý Sản Phẩm</span>
                </div>
                <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                  {products.length}
                </span>
              </button>

              {/* Sub-items for products and brands */}
              {activeTab === 'products' && (
                <div className="pl-6 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg border border-slate-100">
                  <button
                    onClick={() => setProductSubTab('products')}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      productSubTab === 'products'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>• Sản Phẩm</span>
                    <span className="font-mono text-[10px] opacity-80">{products.length}</span>
                  </button>
                  <button
                    onClick={() => setProductSubTab('brands')}
                    className={`w-full text-left px-2.5 py-1.5 rounded text-xs flex items-center justify-between transition-colors ${
                      productSubTab === 'brands'
                        ? 'bg-[#1677FF] text-white font-bold shadow-xs'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>• Thương Hiệu</span>
                    <span className="font-mono text-[10px] opacity-80">{brands.length}</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('upselec-catalog')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                activeTab === 'upselec-catalog' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileDown className="w-4 h-4 text-[#FF8A00]" />
                <span className="font-bold text-[#FF8A00]">Dòng Up Selec (7 Model)</span>
              </div>
              <span className="font-mono text-[10px] bg-orange-100 text-[#FF8A00] font-bold px-1.5 py-0.5 rounded">
                7
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                activeTab === 'orders' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingCart className="w-4 h-4 text-sky-500" />
                <span>Đơn Hàng B2C</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rfqs')}
              className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                activeTab === 'rfqs' ? 'bg-[#0F172A] text-white font-bold' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-purple-500" />
                <span>Yêu Cầu Báo Giá B2B</span>
              </div>
              <span className="font-mono text-[10px] bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">
                {rfqLeads.length}
              </span>
            </button>
          </div>

          {/* Quick Contact Snapshot */}
          <div className="bg-slate-900 text-white p-4 rounded-xl text-xs space-y-2 border border-slate-800 font-mono">
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block">THÔNG TIN ĐANG HIỂN THỊ</span>
            <div className="flex items-center gap-1.5 text-emerald-400">
              <Phone className="w-3.5 h-3.5" />
              <span>{companyInfo.hotline}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sky-400 truncate">
              <Mail className="w-3.5 h-3.5" />
              <span className="truncate">{companyInfo.email}</span>
            </div>
            <div className="flex items-start gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-[#FF8A00] shrink-0 mt-0.5" />
              <span className="text-[11px] leading-tight font-sans">{companyInfo.address}</span>
            </div>
          </div>
        </aside>

        {/* Main Workspace Body */}
        <div className="lg:col-span-9 space-y-6">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <span className="text-slate-400 text-xs block">TỔNG SẢN PHẨM:</span>
                  <strong className="text-2xl text-slate-900 font-bold block mt-1">{products.length}</strong>
                  <span className="text-[11px] text-[#FF8A00] font-sans">Gồm {upSelecCount} model Up Selec</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <span className="text-slate-400 text-xs block">ĐƠN HÀNG B2C:</span>
                  <strong className="text-2xl text-emerald-600 font-bold block mt-1">{orders.length}</strong>
                  <span className="text-[11px] text-slate-500 font-sans">Doanh số: {formatVND(totalRevenue)}</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <span className="text-slate-400 text-xs block">YÊU CẦU BÁO GIÁ:</span>
                  <strong className="text-2xl text-[#1677FF] font-bold block mt-1">{rfqLeads.length}</strong>
                  <span className="text-[11px] text-slate-500 font-sans">Tiếp nhận trong ngày</span>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm font-mono">
                  <span className="text-slate-400 text-xs block">THƯƠNG HIỆU:</span>
                  <strong className="text-2xl text-purple-600 font-bold block mt-1">7</strong>
                  <span className="text-[11px] text-slate-500 font-sans">Up Selec, APC, Eaton...</span>
                </div>
              </div>

              {/* Up Selec Highlight Box */}
              <div className="bg-gradient-to-r from-slate-900 to-[#102A43] text-white p-6 rounded-2xl border border-slate-800 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono text-[#FF8A00] uppercase font-bold tracking-wider">
                      CATALOG THAM CHIẾU MỚI
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      7 Sản Phẩm Up Selec Line-Interactive USL Series Đã Sẵn Sàng
                    </h3>
                    <p className="text-xs text-slate-300 mt-1 max-w-xl">
                      Đã nạp đầy đủ 7 mã USL500, USL650, USL750, USL1000, USL1500, USL2000, USL2500 với bảng giá chính xác từ 2.200.000đ đến 5.500.000đ và liên kết trực tiếp file PDF gốc.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('upselec-catalog')}
                    className="px-4 py-2.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-lg transition-colors shrink-0 font-mono shadow"
                  >
                    Xem Bảng Giá & Chi Tiết
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Thông Tin Liên Hệ Nhanh</h4>
                  <p className="text-xs text-slate-600">
                    Cập nhật hotline, email hoặc địa chỉ showroom công ty hiển thị trên toàn bộ website.
                  </p>
                  <button
                    onClick={() => setActiveTab('company')}
                    className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Cập nhật thông tin công ty</span>
                    <span>→</span>
                  </button>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Điều Chỉnh Bảng Giá Sản Phẩm</h4>
                  <p className="text-xs text-slate-600">
                    Chỉnh sửa giá bán lẻ, giá khuyến mãi hoặc thêm sản phẩm UPS mới vào danh mục.
                  </p>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-bold text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
                  >
                    <span>Mở danh sách sản phẩm</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPANY INFO */}
          {activeTab === 'company' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">
                  Cập Nhật Thông Tin Doanh Nghiệp & Liên Hệ
                </h3>
                <p className="text-xs text-slate-500">
                  Các thông tin này sẽ lập tức được cập nhật đồng bộ trên Header, Footer, Trang liên hệ, Schema SEO và Hóa đơn.
                </p>
              </div>

              {companySaveSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700 flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Đã lưu thông tin doanh nghiệp thành công và cập nhật toàn bộ website!</span>
                </div>
              )}

              <form onSubmit={handleSaveCompany} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Số Hotline Kinh Doanh & Kỹ Thuật (*):
                    </label>
                    <input
                      type="text"
                      required
                      value={editCompany.hotline}
                      onChange={(e) => setEditCompany({ ...editCompany, hotline: e.target.value })}
                      placeholder="0913879570"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono text-sm font-bold text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">Đã cấu hình: 0913879570</span>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Email Liên Hệ & Nhận Báo Giá (*):
                    </label>
                    <input
                      type="email"
                      required
                      value={editCompany.email}
                      onChange={(e) => setEditCompany({ ...editCompany, email: e.target.value })}
                      placeholder="thai.thtg@gmail.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono text-sm text-slate-900"
                    />
                    <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">Đã cấu hình: thai.thtg@gmail.com</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Địa Chỉ Trụ Sở / Showroom Chính (*):
                  </label>
                  <input
                    type="text"
                    required
                    value={editCompany.address}
                    onChange={(e) => setEditCompany({ ...editCompany, address: e.target.value })}
                    placeholder="258/7 Vườn Lài, P. Phú Thọ Hòa, Tp. HCM"
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none text-sm text-slate-900 font-medium"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block font-mono">Đã cấu hình: 258/7 Vườn Lài, P. Phú Thọ Hòa, Tp. HCM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Tên thương hiệu / Công ty:</label>
                    <input
                      type="text"
                      value={editCompany.companyName}
                      onChange={(e) => setEditCompany({ ...editCompany, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Số Zalo hỗ trợ khách hàng:</label>
                    <input
                      type="text"
                      value={editCompany.zalo}
                      onChange={(e) => setEditCompany({ ...editCompany, zalo: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Slogan định vị thương hiệu:</label>
                  <input
                    type="text"
                    value={editCompany.slogan}
                    onChange={(e) => setEditCompany({ ...editCompany, slogan: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Dữ liệu được lưu vĩnh viễn trên máy chủ & LocalStorage.
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center gap-2 shadow"
                  >
                    <Save className="w-4 h-4 text-[#FF8A00]" />
                    <span>LƯU THAY ĐỔI THÔNG TIN</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PRODUCTS & BRANDS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              {/* Sub-tab Navigation Switcher */}
              <div className="bg-slate-100 p-1 rounded-xl inline-flex items-center gap-1 border border-slate-200">
                <button
                  onClick={() => setProductSubTab('products')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                    productSubTab === 'products'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Package className="w-4 h-4 text-emerald-600" />
                  <span>Danh Sách Sản Phẩm ({products.length})</span>
                </button>
                <button
                  onClick={() => setProductSubTab('brands')}
                  className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 ${
                    productSubTab === 'brands'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-[#1677FF]" />
                  <span>Danh Sách Thương Hiệu ({brands.length})</span>
                </button>
              </div>

              {brandActionToast && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{brandActionToast}</span>
                </div>
              )}

              {/* SUB-TAB 1: PRODUCTS LIST */}
              {productSubTab === 'products' && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-600" />
                        <span>Quản Lý Danh Mục & Giá Bán Sản Phẩm</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Chỉnh sửa hình ảnh (tải ảnh hoặc dùng ảnh mặc định), giá bán trực tiếp hoặc thông số kỹ thuật.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          if (window.confirm('Khôi phục danh mục về danh sách chuẩn gồm 7 mã Up Selec và các hãng khác?')) {
                            onResetCatalog();
                          }
                        }}
                        className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-50 flex items-center gap-1 font-mono"
                        title="Khôi phục catalog mặc định"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Khôi phục gốc</span>
                      </button>

                      <button
                        onClick={() => setIsAddingNew(true)}
                        className="px-4 py-2 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded-lg transition-colors flex items-center gap-1.5 shadow"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm Sản Phẩm Mới</span>
                      </button>
                    </div>
                  </div>

                  {/* Filters & Search */}
                  <div className="flex flex-col sm:flex-row gap-3 items-center justify-between text-xs">
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        value={productSearch}
                        onChange={(e) => setProductSearch(e.target.value)}
                        placeholder="Tìm theo Model (USL..., SRT...), Tên..."
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                      />
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <span className="text-slate-500 font-mono">Hãng:</span>
                      <select
                        value={brandFilter}
                        onChange={(e) => setBrandFilter(e.target.value)}
                        className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-800 font-mono"
                      >
                        <option value="all">Tất cả thương hiệu ({products.length})</option>
                        {brands.map(b => {
                          const count = products.filter(p => p.brand === b.name).length;
                          return (
                            <option key={b.id} value={b.name}>
                              {b.name} ({count} sản phẩm)
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-mono text-[11px]">
                          <th className="p-3">Hình Ảnh</th>
                          <th className="p-3">Model</th>
                          <th className="p-3">Tên Thiết Bị</th>
                          <th className="p-3">Hãng</th>
                          <th className="p-3">Công Suất</th>
                          <th className="p-3">Công Nghệ</th>
                          <th className="p-3">Giá Bán Niêm Yết (VND)</th>
                          <th className="p-3">Trạng Thái</th>
                          <th className="p-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono">
                        {filteredProducts.map(p => (
                          <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                            {/* Product Image Column */}
                            <td className="p-3">
                              {p.imageUrl ? (
                                <div className="w-10 h-10 bg-slate-900 rounded p-1 flex items-center justify-center border border-slate-700 overflow-hidden" title="Ảnh thực tế tải lên">
                                  <img 
                                    src={p.imageUrl} 
                                    alt={p.name} 
                                    className="max-h-full max-w-full object-contain"
                                    onError={(e) => {
                                      (e.target as HTMLElement).style.display = 'none';
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="w-10 h-10 bg-slate-100 rounded border border-slate-200 flex flex-col items-center justify-center text-[8px] text-slate-500 font-mono text-center leading-tight" title="Sử dụng ảnh sơ đồ kỹ thuật công nghiệp mặc định">
                                  <span>Ảnh</span>
                                  <span className="text-emerald-600 font-bold">Mặc định</span>
                                </div>
                              )}
                            </td>
                            <td className="p-3 font-bold text-slate-900">{p.model}</td>
                            <td className="p-3 font-sans max-w-xs truncate">{p.name}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                p.brand === 'Up Selec' ? 'bg-orange-100 text-[#FF8A00]' : 'bg-slate-100 text-slate-800'
                              }`}>
                                {p.brand}
                              </span>
                            </td>
                            <td className="p-3">{p.powerVA}VA / {p.powerWatts}W</td>
                            <td className="p-3 text-slate-600">{p.topology}</td>
                            <td className="p-3">
                              {p.isB2BOnly || p.price === null ? (
                                <span className="text-slate-500 font-bold">Báo Giá B2B</span>
                              ) : (
                                <input
                                  type="number"
                                  step="50000"
                                  value={p.price || 0}
                                  onChange={(e) => handleQuickPriceChange(p, e.target.value)}
                                  className="w-32 px-2 py-1 border border-slate-300 rounded font-mono font-bold text-[#FF8A00] focus:border-[#1677FF] outline-none"
                                />
                              )}
                            </td>
                            <td className="p-3">
                              <button
                                onClick={() => onUpdateProduct({ ...p, inStock: !p.inStock })}
                                className={`px-2 py-0.5 rounded text-[10px] ${
                                  p.inStock ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {p.inStock ? 'Sẵn hàng' : 'Đặt trước'}
                              </button>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                onClick={() => setEditingProduct(p)}
                                className="p-1 text-slate-600 hover:text-[#1677FF] rounded"
                                title="Chỉnh sửa hình ảnh và thông số"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (window.confirm(`Bạn có chắc muốn xóa sản phẩm ${p.model}?`)) {
                                    onDeleteProduct(p.id);
                                  }
                                }}
                                className="p-1 text-slate-400 hover:text-rose-600 rounded"
                                title="Xóa sản phẩm"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: BRANDS MANAGEMENT */}
              {productSubTab === 'brands' && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-[#1677FF]" />
                        <span>Danh Sách Thương Hiệu Phân Phối</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Quản lý các thương hiệu UPS (Tạo mới, Sửa thông tin, Xóa). Thương hiệu sẽ được đồng bộ vào bộ lọc và danh mục sản phẩm.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingNewBrand(true)}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#1677FF] hover:bg-[#0958d9] rounded-lg transition-colors flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Thêm Thương Hiệu Mới</span>
                    </button>
                  </div>

                  {/* Brands Grid / Table */}
                  <div className="border border-slate-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-900 text-white font-mono text-[11px]">
                          <th className="p-3">Tên Thương Hiệu</th>
                          <th className="p-3">Xuất Xứ / Quốc Gia</th>
                          <th className="p-3">Mô Tả Giới Thiệu</th>
                          <th className="p-3 text-center">Số Model Sản Phẩm</th>
                          <th className="p-3 text-right">Thao Tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-sans">
                        {brands.map(b => {
                          const count = products.filter(p => p.brand === b.name).length;
                          return (
                            <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 rounded text-xs font-bold font-mono ${
                                    b.name === 'Up Selec' ? 'bg-orange-100 text-[#FF8A00]' : 'bg-slate-100 text-slate-900'
                                  }`}>
                                    {b.name}
                                  </span>
                                  {b.isFeatured && (
                                    <span className="text-[10px] text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.2 rounded font-mono">
                                      Nổi bật
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td className="p-3 font-medium text-slate-700">
                                {b.country || 'Chưa cập nhật'}
                              </td>
                              <td className="p-3 text-slate-600 max-w-md text-xs leading-relaxed">
                                {b.description || 'Chưa có mô tả'}
                              </td>
                              <td className="p-3 text-center font-mono font-bold">
                                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800">
                                  {count} sản phẩm
                                </span>
                              </td>
                              <td className="p-3 text-right space-x-2">
                                <button
                                  onClick={() => setEditingBrand(b)}
                                  className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-[#1677FF] border border-slate-200 rounded hover:bg-slate-50 inline-flex items-center gap-1"
                                  title="Chỉnh sửa thông tin thương hiệu"
                                >
                                  <Edit3 className="w-3 h-3" />
                                  <span>Sửa</span>
                                </button>
                                <button
                                  onClick={() => {
                                    if (count > 0) {
                                      const confirmDelete = window.confirm(
                                        `Cảnh báo: Hiện đang có ${count} sản phẩm thuộc thương hiệu "${b.name}". Bạn có chắc chắn muốn xóa thương hiệu này không?`
                                      );
                                      if (!confirmDelete) return;
                                    } else {
                                      if (!window.confirm(`Bạn có chắc muốn xóa thương hiệu "${b.name}"?`)) return;
                                    }
                                    onDeleteBrand(b.id);
                                    setBrandActionToast(`Đã xóa thương hiệu ${b.name}`);
                                    setTimeout(() => setBrandActionToast(''), 3000);
                                  }}
                                  className="px-2.5 py-1 text-xs font-semibold text-rose-600 hover:text-rose-800 border border-rose-200 rounded hover:bg-rose-50 inline-flex items-center gap-1"
                                  title="Xóa thương hiệu"
                                >
                                  <Trash2 className="w-3 h-3" />
                                  <span>Xóa</span>
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: UP SELEC 7 MODELS DEDICATED CATALOG VIEW */}
          {activeTab === 'upselec-catalog' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FF8A00] text-white font-mono font-bold px-2 py-0.5 rounded text-[10px]">
                      CHÍNH THỨC
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Danh Mục 7 Sản Phẩm Up Selec Line-Interactive USL Series
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Bảng đối chiếu thông số từ tài liệu catalog tham chiếu đính kèm: <strong>USL_Series_26_6163dbc1.pdf</strong>
                  </p>
                </div>

                <a
                  href="/assets/aistudio/USL_Series_26_6163dbc1.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded-lg transition-colors flex items-center gap-1.5 shrink-0 shadow-sm font-mono"
                >
                  <FileDown className="w-4 h-4 text-[#FF8A00]" />
                  <span>Mở File PDF Gốc</span>
                </a>
              </div>

              {/* 7 Models Quick Edit Price Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.filter(p => p.brand === 'Up Selec').map((p, idx) => (
                  <div key={p.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 hover:border-slate-300 transition-colors space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#FF8A00] bg-orange-100 px-2 py-0.5 rounded">
                        Model {p.model}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">#0{idx + 1}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{p.name}</h4>

                    <div className="bg-white border border-slate-200 rounded p-2 text-xs font-mono space-y-1 text-slate-600">
                      <div className="flex justify-between">
                        <span>Công suất:</span>
                        <strong className="text-slate-900">{p.powerVA}VA / {p.powerWatts}W</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>Ắc quy:</span>
                        <span className="text-slate-800">{p.batteryType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kích thước:</span>
                        <span>{p.dimensionsMm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trọng lượng:</span>
                        <span>{p.weightKg} kg</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-700">Giá bán:</span>
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          step="100000"
                          value={p.price || 0}
                          onChange={(e) => handleQuickPriceChange(p, e.target.value)}
                          className="w-28 px-2 py-1 text-xs border border-slate-300 rounded font-mono font-bold text-[#FF8A00] focus:border-[#1677FF] outline-none"
                        />
                        <span className="text-xs font-mono text-slate-500">đ</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* PDF Catalog Embed Preview Box */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <div className="bg-slate-900 text-white px-4 py-2 text-xs font-mono flex items-center justify-between">
                  <span>TÀI LIỆU CATALOG GỐC THAM CHIẾU: USL_Series_26_6163dbc1.pdf</span>
                  <a
                    href="/assets/aistudio/USL_Series_26_6163dbc1.pdf"
                    download
                    className="text-sky-400 hover:underline flex items-center gap-1"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Tải về máy</span>
                  </a>
                </div>
                <div className="p-4 bg-slate-50 text-center">
                  <iframe
                    src="/assets/aistudio/USL_Series_26_6163dbc1.pdf"
                    className="w-full h-96 border border-slate-300 rounded-lg bg-white"
                    title="Up Selec USL Series Catalog PDF"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: B2C ORDERS */}
          {activeTab === 'orders' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Danh Sách Đơn Đặt Hàng B2C</h3>
                  <p className="text-xs text-slate-500">Đơn hàng của khách đặt qua giỏ hàng và thanh toán trực tuyến.</p>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                  Tổng đơn: {orders.length}
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Chưa có đơn đặt hàng nào phát sinh. Khách hàng đặt hàng qua giỏ hàng sẽ hiển thị tại đây.
                </div>
              ) : (
                <div className="border border-slate-200 rounded-lg overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse font-mono">
                    <thead>
                      <tr className="bg-slate-900 text-white text-[11px]">
                        <th className="p-3">Mã Đơn</th>
                        <th className="p-3">Khách Hàng</th>
                        <th className="p-3">Số ĐT</th>
                        <th className="p-3">Địa Chỉ</th>
                        <th className="p-3">Sản Phẩm</th>
                        <th className="p-3">Tổng Tiền</th>
                        <th className="p-3">Thanh Toán</th>
                        <th className="p-3">Trạng Thái</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-sans">
                      {orders.map(o => (
                        <tr key={o.id} className="hover:bg-slate-50">
                          <td className="p-3 font-mono font-bold text-slate-900">{o.id}</td>
                          <td className="p-3">{o.customerName}</td>
                          <td className="p-3 font-mono">{o.phone}</td>
                          <td className="p-3 max-w-xs truncate">{o.address}, {o.city}</td>
                          <td className="p-3">
                            {o.items.map(i => `${i.product.model} (x${i.quantity})`).join(', ')}
                          </td>
                          <td className="p-3 font-mono font-bold text-[#FF8A00]">{formatVND(o.totalAmount)}</td>
                          <td className="p-3 font-mono">{o.paymentMethod === 'qr' ? 'VietQR' : 'COD'}</td>
                          <td className="p-3">
                            <select
                              value={o.status}
                              onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as any)}
                              className="px-2 py-1 rounded border border-slate-300 text-xs bg-white font-mono"
                            >
                              <option value="pending">Chờ xử lý</option>
                              <option value="processing">Đang chuẩn bị</option>
                              <option value="completed">Đã giao hàng</option>
                              <option value="cancelled">Hủy đơn</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: B2B RFQS */}
          {activeTab === 'rfqs' && (
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Danh Sách Yêu Cầu Báo Giá Dự Án (RFQ)</h3>
                  <p className="text-xs text-slate-500">Khách hàng doanh nghiệp, nhà thầu cơ điện gửi yêu cầu báo giá dự án.</p>
                </div>
                <span className="text-xs font-mono bg-slate-100 px-2.5 py-1 rounded text-slate-700">
                  Tổng yêu cầu: {rfqLeads.length}
                </span>
              </div>

              {rfqLeads.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  Chưa có yêu cầu báo giá B2B nào. Khách hàng gửi yêu cầu qua form RFQ sẽ hiển thị tại đây.
                </div>
              ) : (
                <div className="space-y-3">
                  {rfqLeads.map(lead => (
                    <div key={lead.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-[#FF8A00]">{lead.id}</span>
                          <span className="text-slate-400">·</span>
                          <strong className="text-slate-900">{lead.data.fullName}</strong>
                          <span className="text-slate-500 font-mono">({lead.data.phone})</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{lead.createdAt}</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                        <div>Công ty: <span className="text-slate-900 font-sans font-medium">{lead.data.companyName || '—'}</span></div>
                        <div>Công suất cần: <strong className="text-[#1677FF]">{lead.data.requiredPowerKva}</strong></div>
                        <div>Thời gian lưu: <span className="text-slate-800">{lead.data.targetRuntimeMin}</span></div>
                      </div>

                      {lead.data.notes && (
                        <div className="p-2 bg-white rounded border border-slate-200 text-slate-600 font-sans text-xs">
                          {lead.data.notes}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] font-mono text-slate-500">
                          Hãng ưu tiên: {lead.data.preferredBrands.join(', ')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-mono text-[11px]">Trạng thái:</span>
                          <select
                            value={lead.status}
                            onChange={(e) => onUpdateRfqStatus(lead.id, e.target.value)}
                            className="px-2 py-0.5 rounded border border-slate-300 bg-white font-mono text-xs"
                          >
                            <option value="Mới tiếp nhận">Mới tiếp nhận</option>
                            <option value="Đang báo giá">Đang gửi báo giá</option>
                            <option value="Đã chốt hợp đồng">Đã chốt hợp đồng</option>
                            <option value="Hủy">Đóng yêu cầu</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Product Edit / Add Modal */}
      {(editingProduct || isAddingNew) && (
        <ProductEditModal
          product={editingProduct}
          brands={brands}
          isNew={isAddingNew}
          onClose={() => {
            setEditingProduct(null);
            setIsAddingNew(false);
          }}
          onSave={(prod) => {
            if (isAddingNew) {
              onAddProduct(prod);
              setProductSavedToast(`Đã thêm sản phẩm mới: ${prod.model}`);
            } else {
              onUpdateProduct(prod);
              setProductSavedToast(`Đã cập nhật sản phẩm: ${prod.model}`);
            }
            setTimeout(() => setProductSavedToast(''), 3000);
            setEditingProduct(null);
            setIsAddingNew(false);
          }}
        />
      )}

      {/* Brand Edit / Add Modal */}
      {(editingBrand || isAddingNewBrand) && (
        <BrandEditModal
          brand={editingBrand}
          isNew={isAddingNewBrand}
          onClose={() => {
            setEditingBrand(null);
            setIsAddingNewBrand(false);
          }}
          onSave={(b, oldName) => {
            if (isAddingNewBrand) {
              onAddBrand(b);
              setBrandActionToast(`Đã tạo thương hiệu mới: ${b.name}`);
            } else {
              onUpdateBrand(b, oldName);
              setBrandActionToast(`Đã cập nhật thương hiệu: ${b.name}`);
            }
            setTimeout(() => setBrandActionToast(''), 3000);
            setEditingBrand(null);
            setIsAddingNewBrand(false);
          }}
        />
      )}
    </div>
  );
};

interface ProductEditModalProps {
  product: Product | null;
  brands: BrandItem[];
  isNew: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const ProductEditModal: React.FC<ProductEditModalProps> = ({ product, brands, isNew, onClose, onSave }) => {
  const [formData, setFormData] = useState<Product>(product || {
    id: `prod-${Date.now()}`,
    slug: `bo-luu-dien-moi-${Date.now()}`,
    name: '',
    model: '',
    brand: brands[0]?.name || 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 1000,
    powerWatts: 600,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '220Vac (+/-25%)',
    voltageOut: '220Vac +/-5%',
    frequencyHz: '50/60 Hz',
    batteryType: 'VRLA kín khí 12V',
    runtimeHalfLoadMin: 15,
    runtimeFullLoadMin: 7,
    expandableBattery: false,
    dimensionsMm: '320 x 125 x 220 mm',
    weightKg: 10,
    price: 3300000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Office',
    description: '',
    keyFeatures: ['Tích hợp ổn áp tự động AVR', 'Thời gian chuyển mạch 2ms'],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf',
    imageUrl: undefined
  });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Vui lòng chọn hình ảnh có dung lượng dưới 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setFormData(prev => ({ ...prev, imageUrl: dataUrl }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: undefined }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.model) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-8">
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-4 h-4 text-[#FF8A00]" />
            <span>{isNew ? 'Thêm Sản Phẩm Mới Vào Danh Mục' : `Chỉnh Sửa Sản Phẩm: ${formData.model}`}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
          {/* SECTION: PRODUCT IMAGE (Upload / URL or Default Fallback) */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block font-bold text-slate-800 flex items-center gap-1.5">
                <ImageIcon className="w-4 h-4 text-[#1677FF]" />
                <span>Hình ảnh sản phẩm (Upload hoặc dùng ảnh mặc định):</span>
              </label>
              {formData.imageUrl && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-[11px] text-rose-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Xóa ảnh tải lên (Dùng ảnh mặc định)</span>
                </button>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image Preview Box */}
              <div className="w-28 h-24 bg-slate-900 rounded-lg border border-slate-300 flex items-center justify-center p-2 overflow-hidden shrink-0 shadow-inner">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="text-center p-1">
                    <HardwareSchematic product={formData} size="sm" />
                    <span className="text-[9px] text-emerald-400 font-mono block mt-0.5">Ảnh Mặc Định</span>
                  </div>
                )}
              </div>

              {/* Upload Controls */}
              <div className="flex-1 w-full space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded flex items-center gap-1.5 shadow-sm transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5 text-[#FF8A00]" />
                    <span>Chọn ảnh từ máy tính (Upload)</span>
                  </button>
                </div>

                <div>
                  <span className="text-[10px] text-slate-500 block mb-0.5">Hoặc nhập đường dẫn URL hình ảnh:</span>
                  <input
                    type="text"
                    value={formData.imageUrl || ''}
                    onChange={(e) => {
                      const val = e.target.value.trim();
                      setFormData(prev => ({ ...prev, imageUrl: val ? val : undefined }));
                    }}
                    placeholder="https://example.com/ups-image.png"
                    className="w-full px-2.5 py-1 text-xs border border-slate-300 rounded font-mono"
                  />
                </div>

                <p className="text-[10px] text-slate-500 italic">
                  * Nếu không tải ảnh lên, hệ thống sẽ tự động dùng hình ảnh sơ đồ kỹ thuật công nghiệp chuẩn cho model này.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Mã Model (SKU) (*):</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                placeholder="USL1000, SRT3000..."
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Thương hiệu (*):</label>
              <select
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white font-mono font-bold text-slate-800"
              >
                {brands.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Tên sản phẩm thương mại (*):</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Bộ Lưu Điện Up Selec USL1000 1000VA/600W..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded text-slate-900"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Công suất VA:</label>
              <input
                type="number"
                value={formData.powerVA}
                onChange={(e) => setFormData({ ...formData, powerVA: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Công suất Watts:</label>
              <input
                type="number"
                value={formData.powerWatts}
                onChange={(e) => setFormData({ ...formData, powerWatts: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Giá bán (VND):</label>
              <input
                type="number"
                step="50000"
                value={formData.price || 0}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-bold text-[#FF8A00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Công nghệ UPS:</label>
              <select
                value={formData.topology}
                onChange={(e) => setFormData({ ...formData, topology: e.target.value as UPSTopology })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded bg-white"
              >
                <option value="Line-Interactive">Line-Interactive</option>
                <option value="Online Double Conversion">Online Double Conversion</option>
                <option value="Offline">Offline</option>
                <option value="Modular">Modular</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Thời gian chuyển mạch (ms):</label>
              <input
                type="number"
                value={formData.transferTimeMs}
                onChange={(e) => setFormData({ ...formData, transferTimeMs: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Loại ắc quy:</label>
              <input
                type="text"
                value={formData.batteryType}
                onChange={(e) => setFormData({ ...formData, batteryType: e.target.value })}
                className="w-full px-3 py-1.5 border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-800 mb-1">Kích thước & Trọng lượng:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.dimensionsMm}
                  onChange={(e) => setFormData({ ...formData, dimensionsMm: e.target.value })}
                  placeholder="320x125x220 mm"
                  className="w-2/3 px-3 py-1.5 border border-slate-300 rounded font-mono"
                />
                <input
                  type="number"
                  step="0.5"
                  value={formData.weightKg}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                  placeholder="kg"
                  className="w-1/3 px-2 py-1.5 border border-slate-300 rounded font-mono"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Mô tả tóm tắt sản phẩm:</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-1.5 border border-slate-300 rounded"
            />
          </div>

          <div className="flex items-center gap-4 pt-1">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.inStock}
                onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                className="rounded text-[#1677FF]"
              />
              <span>Sẵn hàng trong kho</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isB2BOnly}
                onChange={(e) => setFormData({ ...formData, isB2BOnly: e.target.checked })}
                className="rounded text-[#1677FF]"
              />
              <span>Dành riêng cho dự án B2B (Yêu cầu báo giá)</span>
            </label>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded shadow-sm"
            >
              Lưu Sản Phẩm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

interface BrandEditModalProps {
  brand: BrandItem | null;
  isNew: boolean;
  onClose: () => void;
  onSave: (brand: BrandItem, oldName?: string) => void;
}

const BrandEditModal: React.FC<BrandEditModalProps> = ({ brand, isNew, onClose, onSave }) => {
  const [name, setName] = useState(brand?.name || '');
  const [country, setCountry] = useState(brand?.country || '');
  const [description, setDescription] = useState(brand?.description || '');
  const [isFeatured, setIsFeatured] = useState(brand?.isFeatured ?? true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const item: BrandItem = {
      id: brand?.id || `brand-${Date.now()}`,
      name: name.trim(),
      country: country.trim(),
      description: description.trim(),
      isFeatured
    };
    onSave(item, brand?.name);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#0F172A] text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF8A00]" />
            <span>{isNew ? 'Thêm Thương Hiệu Mới' : `Chỉnh Sửa Thương Hiệu: ${brand?.name}`}</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">Tên thương hiệu (*):</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: APC, Eaton, Up Selec..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded font-medium focus:border-[#1677FF] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Xuất xứ / Quốc gia:</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Ví dụ: Mỹ (Schneider Electric), Đài Loan, Nhật Bản..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded font-medium focus:border-[#1677FF] outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">Mô tả giới thiệu thương hiệu:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Giới thiệu năng lực, các dòng sản phẩm thế mạnh của hãng..."
              className="w-full px-3 py-1.5 border border-slate-300 rounded focus:border-[#1677FF] outline-none"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="rounded text-[#1677FF]"
            />
            <span className="text-slate-700">Đánh dấu thương hiệu nổi bật trên trang chủ</span>
          </label>

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded shadow-sm"
            >
              {isNew ? 'Thêm Thương Hiệu' : 'Cập Nhật Thương Hiệu'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
