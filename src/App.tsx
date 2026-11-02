/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, CompanyInfo, Order, RFQFormData, BrandItem } from './types';
import { MOCK_PRODUCTS, DEFAULT_COMPANY_INFO, DEFAULT_BRANDS } from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { B2BRfqModal } from './components/B2BRfqModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { ProductCompareModal } from './components/ProductCompareModal';
import { HomeView } from './views/HomeView';
import { CatalogView } from './views/CatalogView';
import { ProductDetailView } from './views/ProductDetailView';
import { SolutionsView } from './views/SolutionsView';
import { ServicesView } from './views/ServicesView';
import { ProjectsView } from './views/ProjectsView';
import { BlogView } from './views/BlogView';
import { ContactView } from './views/ContactView';
import { CheckoutView } from './views/CheckoutView';
import { AdminView } from './views/AdminView';
import { UPSSizingCalculator } from './components/UPSSizingCalculator';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [initialTopologyFilter, setInitialTopologyFilter] = useState<string | undefined>(undefined);
  const [initialBrandFilter, setInitialBrandFilter] = useState<string | undefined>(undefined);

  // Company Information persisted in localStorage
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(() => {
    try {
      const saved = localStorage.getItem('ups_company_info');
      return saved ? JSON.parse(saved) : DEFAULT_COMPANY_INFO;
    } catch {
      return DEFAULT_COMPANY_INFO;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_company_info', JSON.stringify(companyInfo));
    } catch {
      // ignore
    }
  }, [companyInfo]);

  // Brands list state persisted in localStorage
  const [brands, setBrands] = useState<BrandItem[]>(() => {
    try {
      const saved = localStorage.getItem('ups_brands_list');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      return DEFAULT_BRANDS;
    } catch {
      return DEFAULT_BRANDS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_brands_list', JSON.stringify(brands));
    } catch {
      // ignore
    }
  }, [brands]);

  // Product Catalog state persisted in localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('ups_products_catalog');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure Up Selec models exist
        if (parsed && parsed.some((p: Product) => p.brand === 'Up Selec')) {
          return parsed;
        }
      }
      return MOCK_PRODUCTS;
    } catch {
      return MOCK_PRODUCTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_products_catalog', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ups_pro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_pro_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ups_orders_list');
      return saved ? JSON.parse(saved) : [
        {
          id: 'UPS-2026-8812',
          customerName: 'Trần Minh Hoàng',
          phone: '0988776655',
          email: 'hoang.tm@gmail.com',
          address: '124 Đường 3/2, Quận 10',
          city: 'TP. Hồ Chí Minh',
          items: [{ product: MOCK_PRODUCTS[0], quantity: 2 }],
          totalAmount: 4400000,
          paymentMethod: 'qr',
          needVatInvoice: true,
          companyName: 'Công ty TNHH Giải Pháp Số',
          taxId: '0315889922',
          status: 'processing',
          createdAt: '01/11/2026 14:20'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_orders_list', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  // RFQ Leads state
  const [rfqLeads, setRfqLeads] = useState<{ id: string; data: RFQFormData; createdAt: string; status: string }[]>(() => {
    try {
      const saved = localStorage.getItem('ups_rfq_leads');
      return saved ? JSON.parse(saved) : [
        {
          id: 'RFQ-2026-7731',
          data: {
            fullName: 'Lê Quốc Bảo',
            companyName: 'Cơ Điện Lạnh M&E Thăng Long',
            phone: '0918234567',
            email: 'bao.le@melanh.com',
            city: 'TP. Hồ Chí Minh',
            projectRole: 'Nhà thầu M&E / Tích hợp hệ thống',
            requiredPowerKva: '20 - 40 kVA',
            preferredBrands: ['Up Selec', 'APC'],
            targetRuntimeMin: '30 - 45 phút',
            quantity: 2,
            notes: 'Dự án phòng server văn phòng tại TP.HCM, cần hồ sơ CO/CQ và báo giá đại lý.'
          },
          createdAt: '01/11/2026 10:15',
          status: 'Mới tiếp nhận'
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ups_rfq_leads', JSON.stringify(rfqLeads));
    } catch {
      // ignore
    }
  }, [rfqLeads]);

  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRFQOpen, setIsRFQOpen] = useState(false);
  const [rfqTargetProduct, setRfqTargetProduct] = useState<Product | null>(null);
  const [rfqPrefillNotes, setRfqPrefillNotes] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Product comparison state
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Keyboard shortcut ESC closes modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsCartOpen(false);
        setIsRFQOpen(false);
        setIsCompareModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const handleNavigate = (tab: string) => {
    if (tab === 'up-selec') {
      setInitialBrandFilter('Up Selec');
      setInitialTopologyFilter(undefined);
      setCurrentTab('catalog');
      setSelectedProduct(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentTab(tab);
    if (tab !== 'product-detail') {
      setSelectedProduct(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    if (product.isB2BOnly || product.price === null) {
      handleOpenRFQ(product);
      return;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenRFQ = (product?: Product, notes?: string) => {
    setRfqTargetProduct(product || null);
    setRfqPrefillNotes(notes || '');
    setIsRFQOpen(true);
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProducts(prev => {
      if (prev.some(p => p.id === product.id)) {
        return prev.filter(p => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert('Bạn chỉ có thể so sánh tối đa 4 sản phẩm cùng một lúc.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompare = (productId: string) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
  };

  const handleFilterTopologyFromHome = (topology: string) => {
    setInitialTopologyFilter(topology);
    setInitialBrandFilter(undefined);
    setCurrentTab('catalog');
  };

  const handleFilterBrandFromHome = (brand: string) => {
    setInitialBrandFilter(brand);
    setInitialTopologyFilter(undefined);
    setCurrentTab('catalog');
  };

  // Product CRUD Handlers
  const handleUpdateProduct = (updated: Product) => {
    setProducts(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts(prev => [newProd, ...prev]);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleResetCatalog = () => {
    setProducts(MOCK_PRODUCTS);
    setBrands(DEFAULT_BRANDS);
    localStorage.removeItem('ups_products_catalog');
    localStorage.removeItem('ups_brands_list');
  };

  // Brand CRUD Handlers
  const handleAddBrand = (newBrand: BrandItem) => {
    setBrands(prev => [...prev, newBrand]);
  };

  const handleUpdateBrand = (updatedBrand: BrandItem, oldName?: string) => {
    setBrands(prev => prev.map(b => b.id === updatedBrand.id ? updatedBrand : b));
    if (oldName && oldName !== updatedBrand.name) {
      setProducts(prev => prev.map(p => p.brand === oldName ? { ...p, brand: updatedBrand.name } : p));
    }
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrands(prev => prev.filter(b => b.id !== brandId));
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans">
      {/* Global Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cart={cart}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRFQ={() => handleOpenRFQ()}
        onOpenSearch={() => setIsSearchOpen(true)}
        companyInfo={companyInfo}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenRFQ={handleOpenRFQ}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onFilterTopology={handleFilterTopologyFromHome}
            onFilterBrand={handleFilterBrandFromHome}
            companyInfo={companyInfo}
            products={products}
          />
        )}

        {currentTab === 'catalog' && (
          <CatalogView
            products={products}
            brands={brands}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(p) => handleAddToCart(p, 1)}
            onOpenRFQ={handleOpenRFQ}
            comparedProducts={comparedProducts}
            onToggleCompare={handleToggleCompare}
            onOpenCompareModal={() => setIsCompareModalOpen(true)}
            initialTopologyFilter={initialTopologyFilter}
            initialBrandFilter={initialBrandFilter}
          />
        )}

        {currentTab === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            onBack={() => handleNavigate('catalog')}
            onAddToCart={handleAddToCart}
            onOpenRFQ={handleOpenRFQ}
            onSelectProduct={handleSelectProduct}
            isCompared={comparedProducts.some(p => p.id === selectedProduct.id)}
            onToggleCompare={handleToggleCompare}
          />
        )}

        {currentTab === 'calculator' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
            <div className="max-w-3xl space-y-2">
              <span className="text-xs font-mono font-bold text-[#FF8A00] uppercase tracking-wider block">
                CÔNG CỤ TÍNH TOÁN CÔNG SUẤT BỘ LƯU ĐIỆN
              </span>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                UPS Sizing Wizard & Ước Tính Giờ Lưu Điện Thực Tế
              </h1>
              <p className="text-sm text-slate-600 leading-relaxed">
                Được lập trình theo các tiêu chuẩn kỹ thuật điện toán thực tế: áp dụng hệ số dự phòng 1.25x và quy đổi công suất phản kháng cos phi để đưa ra cấu hình UPS chuẩn xác cho IT và doanh nghiệp.
              </p>
            </div>

            <UPSSizingCalculator
              onSelectProduct={handleSelectProduct}
              onAddToCart={(p) => handleAddToCart(p, 1)}
              onOpenRFQ={handleOpenRFQ}
            />
          </div>
        )}

        {currentTab === 'solutions' && (
          <SolutionsView
            onSelectProduct={handleSelectProduct}
            onOpenRFQ={handleOpenRFQ}
          />
        )}

        {currentTab === 'services' && (
          <ServicesView onOpenRFQ={handleOpenRFQ} />
        )}

        {currentTab === 'projects' && (
          <ProjectsView onOpenRFQ={handleOpenRFQ} />
        )}

        {currentTab === 'blog' && (
          <BlogView />
        )}

        {currentTab === 'contact' && (
          <ContactView companyInfo={companyInfo} />
        )}

        {currentTab === 'checkout' && (
          <CheckoutView
            cart={cart}
            onBackToCart={() => {
              setCurrentTab('catalog');
              setIsCartOpen(true);
            }}
            onClearCart={handleClearCart}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentTab === 'admin' && (
          <AdminView
            companyInfo={companyInfo}
            onUpdateCompanyInfo={setCompanyInfo}
            products={products}
            onUpdateProduct={handleUpdateProduct}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onResetCatalog={handleResetCatalog}
            brands={brands}
            onAddBrand={handleAddBrand}
            onUpdateBrand={handleUpdateBrand}
            onDeleteBrand={handleDeleteBrand}
            orders={orders}
            onUpdateOrderStatus={(orderId, status) => {
              setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
            }}
            rfqLeads={rfqLeads}
            onUpdateRfqStatus={(leadId, status) => {
              setRfqLeads(prev => prev.map(l => l.id === leadId ? { ...l, status } : l));
            }}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}
      </main>

      {/* Global Footer (hidden when in admin view for clean dashboard experience) */}
      {currentTab !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenRFQ={() => handleOpenRFQ()}
          companyInfo={companyInfo}
        />
      )}

      {/* Global Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setCurrentTab('checkout');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <B2BRfqModal
        isOpen={isRFQOpen}
        onClose={() => setIsRFQOpen(false)}
        targetProduct={rfqTargetProduct}
        prefilledNotes={rfqPrefillNotes}
      />

      <QuickSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      <ProductCompareModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        products={comparedProducts}
        onRemove={handleRemoveCompare}
        onClear={handleClearCompare}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(p) => handleAddToCart(p, 1)}
        onOpenRFQ={handleOpenRFQ}
      />
    </div>
  );
}
