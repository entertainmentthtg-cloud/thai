export type Brand = 'Up Selec' | 'APC' | 'Eaton' | 'Vertiv' | 'Santak' | 'Delta' | 'CyberPower' | string;

export interface BrandItem {
  id: string;
  name: string;
  country?: string;
  description?: string;
  logoUrl?: string;
  isFeatured?: boolean;
}

export type UPSTopology = 
  | 'Offline' 
  | 'Line-Interactive' 
  | 'Online Double Conversion' 
  | 'Modular';

export type ElectricalPhase = '1:1' | '3:1' | '3:3';

export interface CompanyInfo {
  hotline: string;
  email: string;
  address: string;
  companyName: string;
  slogan: string;
  zalo: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  items: CartItem[];
  totalAmount: number;
  paymentMethod: 'qr' | 'cod';
  needVatInvoice: boolean;
  companyName?: string;
  taxId?: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  model: string;
  brand: Brand;
  topology: UPSTopology;
  powerVA: number;
  powerWatts: number;
  powerFactor: number;
  phase: ElectricalPhase;
  waveform: 'Pure Sine Wave' | 'Stepped Sine Wave';
  transferTimeMs: number; // 0 for pure online, 4-8 for line interactive
  voltageIn: string; // e.g. "160V - 280V"
  voltageOut: string; // e.g. "220V / 230V / 240V ± 1%"
  frequencyHz: string; // "50/60 Hz ± 3Hz"
  batteryType: string; // "VRLA AGM kín khí" | "Lithium-ion"
  runtimeHalfLoadMin: number;
  runtimeFullLoadMin: number;
  expandableBattery: boolean;
  rackHeightU?: number; // 1U, 2U, 3U or tower
  dimensionsMm: string; // "432 x 85 x 635 mm"
  weightKg: number;
  price: number | null; // null if B2B project quote only
  isB2BOnly: boolean; // >= 10kVA or project modular
  inStock: boolean;
  warrantyMonths: number;
  application: 'Office' | 'Server' | 'Data Center' | 'Medical' | 'Factory' | 'Home';
  description: string;
  keyFeatures: string[];
  datasheetPdfName: string;
  imageUrl?: string; // Custom uploaded or linked product image; if empty, uses default schematic
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RFQFormData {
  fullName: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  projectRole: string;
  requiredPowerKva: string;
  preferredBrands: string[];
  targetRuntimeMin: string;
  quantity: number;
  notes: string;
  fileName?: string;
}

export interface PresetDevice {
  id: string;
  name: string;
  category: 'it' | 'network' | 'cctv' | 'medical' | 'industrial';
  defaultWatt: number;
  iconName: string;
}

export interface ProjectCase {
  id: string;
  title: string;
  clientType: string;
  capacity: string;
  location: string;
  brandUsed: Brand;
  solutionSummary: string;
  equipmentList: string[];
  redundancyType: string;
  outcome: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  publishedDate: string;
  author: string;
  content: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  targetAudience: string;
  recommendedTopology: string;
  powerRange: string;
  criticalChallenge: string;
  keyBenefits: string[];
  suitableModels: string[];
}
