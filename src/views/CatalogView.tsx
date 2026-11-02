import React, { useState, useMemo, useEffect } from 'react';
import { 
  Filter, 
  RotateCcw, 
  Grid, 
  List, 
  Scale, 
  Search, 
  Check, 
  SlidersHorizontal,
  FileText,
  ShoppingCart,
  ArrowUpDown,
  FileDown
} from 'lucide-react';
import { Product, Brand, UPSTopology } from '../types';
import { ProductCard } from '../components/ProductCard';

interface CatalogViewProps {
  products: Product[];
  brands?: { id: string; name: string }[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenRFQ: (product: Product) => void;
  comparedProducts: Product[];
  onToggleCompare: (product: Product) => void;
  onOpenCompareModal: () => void;
  initialTopologyFilter?: string;
  initialBrandFilter?: string;
}

export const CatalogView: React.FC<CatalogViewProps> = ({
  products,
  brands,
  onSelectProduct,
  onAddToCart,
  onOpenRFQ,
  comparedProducts,
  onToggleCompare,
  onOpenCompareModal,
  initialTopologyFilter,
  initialBrandFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<Brand[]>(
    initialBrandFilter ? [initialBrandFilter as Brand] : []
  );
  const [selectedTopologies, setSelectedTopologies] = useState<string[]>(
    initialTopologyFilter ? [initialTopologyFilter] : []
  );
  const [selectedCapacityRange, setSelectedCapacityRange] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [filterEbmOnly, setFilterEbmOnly] = useState(false);
  const [filterInStockOnly, setFilterInStockOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'power-asc' | 'power-desc'>('default');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialBrandFilter) {
      setSelectedBrands([initialBrandFilter as Brand]);
    }
  }, [initialBrandFilter]);

  useEffect(() => {
    if (initialTopologyFilter) {
      setSelectedTopologies([initialTopologyFilter]);
    }
  }, [initialTopologyFilter]);

  const allBrands: string[] = useMemo(() => {
    if (brands && brands.length > 0) {
      return brands.map(b => b.name);
    }
    const defaultList = ['Up Selec', 'APC', 'Eaton', 'Vertiv', 'Santak', 'Delta', 'CyberPower'];
    const fromProducts = Array.from(new Set(products.map(p => p.brand)));
    return Array.from(new Set([...defaultList, ...fromProducts]));
  }, [brands, products]);
  const allTopologies: UPSTopology[] = ['Offline', 'Line-Interactive', 'Online Double Conversion', 'Modular'];

  const handleBrandToggle = (brand: Brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleTopologyToggle = (topo: string) => {
    setSelectedTopologies(prev => 
      prev.includes(topo) ? prev.filter(t => t !== topo) : [...prev, topo]
    );
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedBrands([]);
    setSelectedTopologies([]);
    setSelectedCapacityRange('all');
    setSelectedPhase('all');
    setFilterEbmOnly(false);
    setFilterInStockOnly(false);
    setSortBy('default');
  };

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match = 
          p.name.toLowerCase().includes(q) ||
          p.model.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.topology.toLowerCase().includes(q);
        if (!match) return false;
      }

      // Brand
      if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
        return false;
      }

      // Topology
      if (selectedTopologies.length > 0 && !selectedTopologies.includes(p.topology)) {
        return false;
      }

      // Capacity Range
      if (selectedCapacityRange !== 'all') {
        if (selectedCapacityRange === 'under1k' && p.powerVA >= 1000) return false;
        if (selectedCapacityRange === '1to3k' && (p.powerVA < 1000 || p.powerVA > 3000)) return false;
        if (selectedCapacityRange === '3to10k' && (p.powerVA <= 3000 || p.powerVA > 10000)) return false;
        if (selectedCapacityRange === '10to40k' && (p.powerVA < 10000 || p.powerVA > 40000)) return false;
        if (selectedCapacityRange === 'over40k' && p.powerVA <= 40000) return false;
      }

      // Phase
      if (selectedPhase !== 'all' && p.phase !== selectedPhase) {
        return false;
      }

      // EBM
      if (filterEbmOnly && !p.expandableBattery) {
        return false;
      }

      // In Stock
      if (filterInStockOnly && !p.inStock) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return (a.price || 999999999) - (b.price || 999999999);
      if (sortBy === 'price-desc') return (b.price || 0) - (a.price || 0);
      if (sortBy === 'power-asc') return a.powerVA - b.powerVA;
      if (sortBy === 'power-desc') return b.powerVA - a.powerVA;
      return 0;
    });
  }, [
    searchQuery,
    selectedBrands,
    selectedTopologies,
    selectedCapacityRange,
    selectedPhase,
    filterEbmOnly,
    filterInStockOnly,
    sortBy
  ]);

  const activeFiltersCount = 
    selectedBrands.length + 
    selectedTopologies.length + 
    (selectedCapacityRange !== 'all' ? 1 : 0) + 
    (selectedPhase !== 'all' ? 1 : 0) + 
    (filterEbmOnly ? 1 : 0) + 
    (filterInStockOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  const formatVND = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4">
        <span>Trang chủ</span>
        <span>/</span>
        <span className="text-slate-900 font-semibold">Danh mục thiết bị UPS</span>
        <span>/</span>
        <span className="text-slate-500">Tất cả thương hiệu</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Bộ Lưu Điện UPS Đa Thương Hiệu
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Hiển thị <strong className="text-slate-900 font-mono">{filteredProducts.length}</strong> / {products.length} sản phẩm theo bộ lọc kỹ thuật
          </p>
        </div>

        {/* View Switcher & Sort bar */}
        <div className="flex items-center gap-3">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Bộ Lọc ({activeFiltersCount})</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 border border-slate-300 rounded bg-white text-slate-800 text-xs font-medium focus:border-[#1677FF] outline-none"
            >
              <option value="default">Sắp xếp: Mặc định</option>
              <option value="power-desc">Công suất kVA: Giảm dần</option>
              <option value="power-asc">Công suất kVA: Tăng dần</option>
              <option value="price-asc">Giá bán: Thấp đến cao</option>
              <option value="price-desc">Giá bán: Cao đến thấp</option>
            </select>
          </div>

          {/* Grid vs Table Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 p-0.5 rounded border border-slate-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem thẻ lưới"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded transition-colors ${
                viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Chế độ xem bảng thông số kỹ thuật"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* SIDEBAR: FACETED MULTI-CRITERIA FILTERS */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                <Filter className="w-4 h-4 text-[#FF8A00]" />
                <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Bộ Lọc Kỹ Thuật
                </h3>
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="text-[11px] text-[#1677FF] hover:underline flex items-center gap-1 font-mono"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Xóa lọc</span>
                </button>
              )}
            </div>

            {/* Keyword search input */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-1.5">Từ khóa model hoặc SKU</label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SRT3000, 9SX, C3K..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs border border-slate-300 rounded focus:border-[#1677FF] outline-none"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            {/* Brands Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Thương hiệu</label>
              <div className="space-y-1.5">
                {allBrands.map(brand => {
                  const count = products.filter(p => p.brand === brand).length;
                  const isChecked = selectedBrands.includes(brand);
                  return (
                    <label key={brand} className="flex items-center justify-between text-xs cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleBrandToggle(brand)}
                          className="rounded text-[#1677FF] focus:ring-0"
                        />
                        <span className={isChecked ? 'font-bold text-slate-900' : 'text-slate-600'}>
                          {brand}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Topology Filter */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Công nghệ UPS</label>
              <div className="space-y-1.5">
                {allTopologies.map(topo => {
                  const count = products.filter(p => p.topology === topo).length;
                  const isChecked = selectedTopologies.includes(topo);
                  return (
                    <label key={topo} className="flex items-center justify-between text-xs cursor-pointer hover:text-slate-900">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleTopologyToggle(topo)}
                          className="rounded text-[#1677FF] focus:ring-0"
                        />
                        <span className={isChecked ? 'font-bold text-slate-900' : 'text-slate-600'}>
                          {topo}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">({count})</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Capacity Range Radio */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Dải công suất (kVA)</label>
              <div className="space-y-1.5 text-xs text-slate-600">
                {[
                  { id: 'all', label: 'Tất cả công suất' },
                  { id: 'under1k', label: 'Dưới 1 kVA (PC / SOHO)' },
                  { id: '1to3k', label: '1 kVA – 3 kVA (Server Rack)' },
                  { id: '3to10k', label: '3 kVA – 10 kVA (Phòng Server)' },
                  { id: '10to40k', label: '10 kVA – 40 kVA (Dự Án B2B)' },
                  { id: 'over40k', label: 'Trên 40 kVA (Công Nghiệp / DC)' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="capacityRange"
                      checked={selectedCapacityRange === item.id}
                      onChange={() => setSelectedCapacityRange(item.id)}
                      className="text-[#1677FF]"
                    />
                    <span className={selectedCapacityRange === item.id ? 'font-bold text-slate-900' : ''}>
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Phase Selector */}
            <div>
              <label className="text-xs font-bold text-slate-800 block mb-2">Số pha nguồn điện</label>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {[
                  { id: 'all', label: 'Tất cả' },
                  { id: '1:1', label: '1 Pha (1:1)' },
                  { id: '3:3', label: '3 Pha (3:3)' }
                ].map(p => (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedPhase(p.id)}
                    className={`py-1 px-2 rounded border text-xs font-mono transition-colors ${
                      selectedPhase === p.id
                        ? 'border-[#1677FF] bg-blue-50 text-[#1677FF] font-bold'
                        : 'border-slate-200 text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Specific features */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={filterEbmOnly}
                  onChange={(e) => setFilterEbmOnly(e.target.checked)}
                  className="rounded text-[#1677FF]"
                />
                <span>Hỗ trợ gắn pin ngoài (EBM)</span>
              </label>

              <label className="flex items-center gap-2 text-xs cursor-pointer text-slate-700">
                <input
                  type="checkbox"
                  checked={filterInStockOnly}
                  onChange={(e) => setFilterInStockOnly(e.target.checked)}
                  className="rounded text-[#1677FF]"
                />
                <span>Chỉ hiện sản phẩm sẵn hàng trong kho</span>
              </label>
            </div>
          </div>
        </aside>

        {/* MAIN RESULTS AREA */}
        <main className="lg:col-span-9 space-y-4">
          {/* Active Filter Chips */}
          {activeFiltersCount > 0 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
              <span className="text-slate-500 font-mono text-[11px]">Đang lọc:</span>
              {selectedBrands.map(b => (
                <span key={b} className="bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-800 flex items-center gap-1 font-mono">
                  {b}
                  <button onClick={() => handleBrandToggle(b)} className="text-slate-400 hover:text-slate-700">×</button>
                </span>
              ))}
              {selectedTopologies.map(t => (
                <span key={t} className="bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-800 flex items-center gap-1 font-mono">
                  {t}
                  <button onClick={() => handleTopologyToggle(t)} className="text-slate-400 hover:text-slate-700">×</button>
                </span>
              ))}
              {selectedCapacityRange !== 'all' && (
                <span className="bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-800 flex items-center gap-1 font-mono">
                  Công suất: {selectedCapacityRange}
                  <button onClick={() => setSelectedCapacityRange('all')} className="text-slate-400 hover:text-slate-700">×</button>
                </span>
              )}
              {filterEbmOnly && (
                <span className="bg-white border border-slate-300 px-2 py-0.5 rounded text-slate-800 flex items-center gap-1 font-mono">
                  Có pin EBM
                  <button onClick={() => setFilterEbmOnly(false)} className="text-slate-400 hover:text-slate-700">×</button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-[#FF8A00] font-bold hover:underline ml-auto"
              >
                Xóa tất cả
              </button>
            </div>
          )}

          {/* VIEW: GRID MODE */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full py-16 text-center bg-white border border-slate-200 rounded-xl space-y-3">
                  <Filter className="w-10 h-10 text-slate-300 mx-auto" />
                  <h4 className="font-bold text-slate-800 text-sm">Không tìm thấy sản phẩm phù hợp</h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Hãy thử nới lỏng các tiêu chí lọc thương hiệu, công suất hoặc xóa từ khóa tìm kiếm.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#0F172A] rounded hover:bg-[#1E293B]"
                  >
                    Xóa Toàn Bộ Bộ Lọc
                  </button>
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onAddToCart={onAddToCart}
                    onOpenRFQ={onOpenRFQ}
                    isCompared={comparedProducts.some(p => p.id === product.id)}
                    onToggleCompare={onToggleCompare}
                  />
                ))
              )}
            </div>
          )}

          {/* VIEW: TECHNICAL SPEC TABLE MODE */}
          {viewMode === 'table' && (
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#0F172A] text-white font-mono text-[11px]">
                      <th className="p-3">Model / Hãng</th>
                      <th className="p-3">Công nghệ</th>
                      <th className="p-3">Công suất (VA/W)</th>
                      <th className="p-3">Chuyển mạch</th>
                      <th className="p-3">Sóng / Pha</th>
                      <th className="p-3">Pin EBM</th>
                      <th className="p-3 text-right">Giá / Báo Giá</th>
                      <th className="p-3 text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono">
                    {filteredProducts.map(p => (
                      <tr 
                        key={p.id}
                        onClick={() => onSelectProduct(p)}
                        className="hover:bg-slate-50 cursor-pointer transition-colors"
                      >
                        <td className="p-3">
                          <strong className="text-slate-900 block font-sans text-xs">{p.name}</strong>
                          <span className="text-slate-400 text-[10px]">{p.brand} · SKU: {p.model}</span>
                        </td>
                        <td className="p-3 text-slate-600">{p.topology}</td>
                        <td className="p-3">
                          <strong className="text-slate-900">{p.powerVA}VA</strong> / {p.powerWatts}W
                        </td>
                        <td className="p-3">
                          <span className={p.transferTimeMs === 0 ? 'text-emerald-600 font-bold' : 'text-slate-700'}>
                            {p.transferTimeMs === 0 ? '0 ms' : `${p.transferTimeMs} ms`}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">
                          {p.waveform === 'Pure Sine Wave' ? 'Sin' : 'Vuông'} · {p.phase}
                        </td>
                        <td className="p-3">
                          {p.expandableBattery ? (
                            <span className="text-emerald-600">Có</span>
                          ) : (
                            <span className="text-slate-400">Không</span>
                          )}
                        </td>
                        <td className="p-3 text-right font-bold tabular-nums">
                          {p.isB2BOnly || p.price === null ? (
                            <span className="text-slate-900 text-[11px]">Báo Giá B2B</span>
                          ) : (
                            <span className="text-[#FF8A00]">{formatVND(p.price)}</span>
                          )}
                        </td>
                        <td className="p-3 text-center" onClick={(e) => e.stopPropagation()}>
                          {p.isB2BOnly || p.price === null ? (
                            <button
                              onClick={() => onOpenRFQ(p)}
                              className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#0F172A] hover:bg-[#1E293B] rounded"
                            >
                              Báo Giá
                            </button>
                          ) : (
                            <button
                              onClick={() => onAddToCart(p)}
                              className="px-2.5 py-1 text-[11px] font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded"
                            >
                              + Giỏ
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* FLOATING COMPARE DOCK */}
      {comparedProducts.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#0F172A] text-white px-5 py-3 rounded-xl border border-slate-700 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-[#FF8A00]" />
            <span className="text-xs font-semibold">
              Đang chọn <strong className="text-[#FF8A00] font-mono">{comparedProducts.length}</strong>/4 sản phẩm so sánh
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCompareModal}
              className="px-4 py-1.5 text-xs font-bold text-white bg-[#FF8A00] hover:bg-[#e67c00] rounded transition-colors shadow"
            >
              Xem So Sánh Chi Tiết
            </button>
            <button
              onClick={() => comparedProducts.forEach(p => onToggleCompare(p))}
              className="text-xs text-slate-400 hover:text-white"
            >
              Xóa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
