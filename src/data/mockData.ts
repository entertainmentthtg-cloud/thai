import { Product, PresetDevice, ProjectCase, BlogPost, SolutionItem, CompanyInfo, BrandItem } from '../types';

export const DEFAULT_COMPANY_INFO: CompanyInfo = {
  hotline: '0913879570',
  email: 'thai.thtg@gmail.com',
  address: '258/7 Vườn Lài, P. Phú Thọ Hòa, Tp. HCM',
  companyName: 'UPS PRO - Giải Pháp Bộ Lưu Điện Chuyên Nghiệp',
  slogan: 'Phân phối chính hãng Up Selec, APC, Eaton, Vertiv, Santak, Delta, CyberPower',
  zalo: '0913879570'
};

export const DEFAULT_BRANDS: BrandItem[] = [
  {
    id: 'brand-upselec',
    name: 'Up Selec',
    country: 'Taiwan / OEM',
    description: 'Chuyên dòng UPS Line-Interactive USL Series độ trễ 2ms, tích hợp ổn áp A.V.R bảo vệ tối ưu cho máy tính, camera và văn phòng.',
    isFeatured: true
  },
  {
    id: 'brand-apc',
    name: 'APC',
    country: 'Mỹ (Schneider Electric)',
    description: 'Thương hiệu số 1 thế giới về bộ lưu điện cho máy chủ và Data Center với các dòng Back-UPS, Smart-UPS, Symmetra.',
    isFeatured: true
  },
  {
    id: 'brand-eaton',
    name: 'Eaton',
    country: 'Mỹ',
    description: 'Hệ thống lưu điện công nghiệp cao cấp, hiệu suất đỉnh 98%, dải sản phẩm 5E, 5PX, 9E, 9SX, 93PM.',
    isFeatured: true
  },
  {
    id: 'brand-vertiv',
    name: 'Vertiv',
    country: 'Mỹ (Liebert)',
    description: 'Dẫn đầu giải pháp hạ tầng số và phòng máy chủ với dòng Liebert GXT5, ITA2, EXS.',
    isFeatured: true
  },
  {
    id: 'brand-santak',
    name: 'Santak',
    country: 'Châu Á',
    description: 'Thương hiệu quen thuộc, bền bỉ, chi phí tối ưu phổ biến tại thị trường Việt Nam (TG500, Blazer, C1K-C3K).',
    isFeatured: true
  },
  {
    id: 'brand-delta',
    name: 'Delta',
    country: 'Đài Loan',
    description: 'Tập đoàn điện tử công suất lớn, nổi bật với các giải pháp UPS Modular hiệu suất cao Amplon, Ultron.',
    isFeatured: true
  },
  {
    id: 'brand-cyberpower',
    name: 'CyberPower',
    country: 'Mỹ',
    description: 'Dòng sản phẩm Line-Interactive & Online sóng sin thuần khiết chuẩn GreenPower tiết kiệm điện.',
    isFeatured: true
  }
];

export const MOCK_PRODUCTS: Product[] = [
  // --- UP SELEC LINE INTERACTIVE SERIES (7 Models từ Catalog PDF tham chiếu) ---
  {
    id: 'upselec-usl500',
    slug: 'bo-luu-dien-up-selec-usl500-500va-300w',
    name: 'Bộ Lưu Điện Up Selec USL500 500VA/300W',
    model: 'USL500',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 500,
    powerWatts: 300,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave', // PWM Simulated Sine wave
    transferTimeMs: 2, // 2ms typical; 5ms max
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1% (45Hz ~ 65Hz dải vào)',
    batteryType: 'VRLA kín khí 12V/7AH x 1 PCE',
    runtimeHalfLoadMin: 15,
    runtimeFullLoadMin: 7,
    expandableBattery: false,
    dimensionsMm: '280 x 95 x 165 mm',
    weightKg: 6.0,
    price: 2200000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Home',
    description: 'Dòng lưu điện Up Selec USL Series tích hợp mạch ổn áp tự động A.V.R., bảo vệ máy tính văn phòng, modem wifi, camera quan sát với thời gian chuyển mạch siêu tốc 2ms.',
    keyFeatures: [
      'Công nghệ Line-Interactive tích hợp ổn áp tự động A.V.R (dải điện áp +/- 25%)',
      'Thời gian chuyển mạch cực nhanh: thông thường 2ms, tối đa không quá 5ms',
      'Sóng mô phỏng hình Sine (PWM Simulated Sine Wave) bảo vệ an toàn cho PC',
      'Ắc quy acid chì kín khí VRLA 12V/7AH nạp nhanh 8h đạt 90% dung lượng',
      'Bộ lọc triệt tiêu nhiễu EMI/RFI và cổng chống sét đường mạng RJ11/RJ45',
      'Chức năng khởi động nguội (Cold Start) không cần điện lưới'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl650',
    slug: 'bo-luu-dien-up-selec-usl650-650va-390w',
    name: 'Bộ Lưu Điện Up Selec USL650 650VA/390W',
    model: 'USL650',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 650,
    powerWatts: 390,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/7AH x 1 PCE',
    runtimeHalfLoadMin: 16,
    runtimeFullLoadMin: 8,
    expandableBattery: false,
    dimensionsMm: '320 x 95 x 165 mm',
    weightKg: 6.0,
    price: 2500000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Home',
    description: 'Up Selec USL650 công suất 650VA/390W, thiết kế thon gọn, 2 ổ cắm chuẩn Universal đa năng, phù hợp góc làm việc văn phòng, bàn thu ngân POS.',
    keyFeatures: [
      'Ổn định điện áp tự động A.V.R chống sụt áp và quá áp',
      'Thời gian chuyển mạch nhanh 2ms, không gây sập nguồn máy tính',
      'Ắc quy chuyên dụng 12V/7AH tự ngắt khi sạc đầy bảo vệ chống chai pin',
      'Độ ồn cực thấp < 35 dBA êm ái cho môi trường văn phòng',
      'Chống sét đường truyền mạng RJ45/RJ11 bảo vệ cổng LAN modem'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl750',
    slug: 'bo-luu-dien-up-selec-usl750-750va-450w',
    name: 'Bộ Lưu Điện Up Selec USL750 750VA/450W',
    model: 'USL750',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 750,
    powerWatts: 450,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/8AH x 1 PCE (Dung lượng lớn)',
    runtimeHalfLoadMin: 18,
    runtimeFullLoadMin: 9,
    expandableBattery: false,
    dimensionsMm: '320 x 95 x 165 mm',
    weightKg: 7.0,
    price: 3000000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Office',
    description: 'Model USL750 nâng cấp bình ắc quy 12V/8AH cho thời gian lưu điện dài hơn, bảo vệ trọn vẹn bộ máy tính đồ họa hoặc 2 máy tính văn phòng làm việc liên tục.',
    keyFeatures: [
      'Bình ắc quy dung lượng nâng cao 12V/8AH cho thời gian lưu dài hơn',
      'Tích hợp tính năng bảo vệ ắc quy 2 giai đoạn không tiêu hao năng lượng sau khi tắt',
      'Đèn LED cảnh báo trạng thái: Lưới xanh, Ắc quy nháy, Đỏ báo lỗi/quá tải',
      'Cầu chì bảo vệ và giới hạn dòng an toàn kép'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl1000',
    slug: 'bo-luu-dien-up-selec-usl1000-1000va-600w',
    name: 'Bộ Lưu Điện Up Selec USL1000 1000VA/600W (2 Bình Ắc Quy)',
    model: 'USL1000',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 1000,
    powerWatts: 600,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/7AH x 2 PCS (Hệ 24VDC)',
    runtimeHalfLoadMin: 20,
    runtimeFullLoadMin: 10,
    expandableBattery: false,
    dimensionsMm: '320 x 125 x 220 mm',
    weightKg: 10.0,
    price: 3300000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Office',
    description: 'Dòng 1000VA trang bị 2 bình ắc quy 12V/7AH mắc nối tiếp hệ 24VDC, công suất thực 600W, trang bị 3 ổ cắm ngõ ra Universal cho cụm PC văn phòng và máy chủ mini.',
    keyFeatures: [
      'Trang bị 2 bình ắc quy 12V/7AH x 2 cung cấp nguồn năng lượng dồi dào',
      'Trang bị 3 ổ cắm loại đa năng Universal cắm được mọi chân phích cắm',
      'Cổng giao tiếp USB/RS232 kèm phần mềm giám sát UPSmart trên PC',
      'Chống sét và sốc điện đường dây điện thoại, Internet Modem ADSL'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl1500',
    slug: 'bo-luu-dien-up-selec-usl1500-1500va-900w',
    name: 'Bộ Lưu Điện Up Selec USL1500 1500VA/900W (2 Bình 8AH)',
    model: 'USL1500',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 1500,
    powerWatts: 900,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/8AH x 2 PCS',
    runtimeHalfLoadMin: 22,
    runtimeFullLoadMin: 11,
    expandableBattery: false,
    dimensionsMm: '320 x 125 x 220 mm',
    weightKg: 11.5,
    price: 3800000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Server',
    description: 'Up Selec USL1500 công suất 1500VA/900W sử dụng 2 bình ắc quy lớn 12V/8AH, lý tưởng cho phòng máy chủ chi nhánh, đầu ghi Camera 32 kênh và thiết bị mạng doanh nghiệp.',
    keyFeatures: [
      'Công suất 1500VA / 900W mạnh mẽ với 2 bình ắc quy 12V/8AH',
      'Mạch ổn áp A.V.R kép thích ứng dải điện rộng không cần chuyển pin',
      'Phần mềm quản trị UPSmart tự động lưu file và tắt máy tính an toàn',
      'Thiết kế tản nhiệt tối ưu, quạt gió làm mát tự động theo nhiệt độ'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl2000',
    slug: 'bo-luu-dien-up-selec-usl2000-2000va-1200w',
    name: 'Bộ Lưu Điện Up Selec USL2000 2000VA/1200W (2 Bình 9AH)',
    model: 'USL2000',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 2000,
    powerWatts: 1200,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/9AH x 2 PCS (Dung lượng cực đại)',
    runtimeHalfLoadMin: 25,
    runtimeFullLoadMin: 12,
    expandableBattery: false,
    dimensionsMm: '135 x 280 x 220 mm',
    weightKg: 14.0,
    price: 4100000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Server',
    description: 'Up Selec USL2000 đạt công suất 2000VA/1200W với 2 bình xả sâu 12V/9AH, chịu tải nặng cho tủ rack thiết bị mạng, máy chủ cơ sở dữ liệu và máy xét nghiệm.',
    keyFeatures: [
      'Công suất cao 2000VA / 1200W chịu tải liên tục bền bỉ',
      '2 bình ắc quy 12V/9AH dung lượng cao nhất trong phân khúc 2 bình',
      'Hệ số đỉnh tải Crest Ratio 3:1 chịu dòng khởi động xuất sắc',
      '3 ổ cắm ngõ ra đa năng Universal kèm cầu chì chống quá tải'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  {
    id: 'upselec-usl2500',
    slug: 'bo-luu-dien-up-selec-usl2500-2500va-1500w-4-binh-ac-quy',
    name: 'Bộ Lưu Điện Up Selec USL2500 2500VA/1500W (4 Bình Ắc Quy)',
    model: 'USL2500',
    brand: 'Up Selec',
    topology: 'Line-Interactive',
    powerVA: 2500,
    powerWatts: 1500,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 2,
    voltageIn: '100/110/120/220/230/240Vac (+/-25%, tích hợp AVR)',
    voltageOut: '220Vac / 230Vac hoặc 240Vac +/-5% 1 phase',
    frequencyHz: '50Hz / 60Hz ± 0.1%',
    batteryType: 'VRLA kín khí 12V/7AH x 4 PCS (Hệ 48VDC)',
    runtimeHalfLoadMin: 35,
    runtimeFullLoadMin: 15,
    expandableBattery: false,
    dimensionsMm: '157 x 452 x 211 mm',
    weightKg: 19.3,
    price: 5500000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Server',
    description: 'Dòng флагман công suất cực đại 2500VA/1500W của Up Selec USL Series trang bị 4 bình ắc quy 12V/7AH (Hệ 48VDC), thời gian lưu điện dài, bảo vệ cụm máy chủ và hệ thống camera quy mô lớn.',
    keyFeatures: [
      'Hệ thống 4 bình ắc quy 12V/7AH x 4 PCS (48VDC) cho thời gian lưu điện vượt trội',
      'Công suất cực đại 2500VA / 1500W cấp nguồn cho nhiều thiết bị đồng thời',
      'Khung vỏ kim loại sơn tĩnh điện chống va đập, bảo vệ tối đa linh kiện bên trong',
      'Độ ồn thấp < 35 dBA dù công suất lớn nhờ biến áp hiệu suất cao'
    ],
    datasheetPdfName: 'USL_Series_Up_Selec_Catalog.pdf'
  },
  // 1. APC Smart-UPS SRT 3000VA (Online)
  {
    id: 'apc-srt-3000xli',
    slug: 'bo-luu-dien-apc-smart-ups-srt-3000va-230v-srt3000xli',
    name: 'Bộ Lưu Điện APC Smart-UPS On-Line SRT 3000VA 230V',
    model: 'SRT3000XLI',
    brand: 'APC',
    topology: 'Online Double Conversion',
    powerVA: 3000,
    powerWatts: 2700,
    powerFactor: 0.9,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '160V - 275V (Dải rộng)',
    voltageOut: '220V / 230V / 240V ± 1%',
    frequencyHz: '50/60 Hz ± 3 Hz',
    batteryType: 'VRLA AGM kín khí chống rò rỉ (Hot-swap)',
    runtimeHalfLoadMin: 18,
    runtimeFullLoadMin: 6,
    expandableBattery: true,
    rackHeightU: 2,
    dimensionsMm: '432 x 85 x 635 mm',
    weightKg: 31.3,
    price: 34500000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Server',
    description: 'Bảo vệ nguồn điện mật độ cao chuẩn Online kép không độ trễ (0ms transfer), phù hợp máy chủ chuyên dụng, switch core mạng và phòng viễn thông quan trọng.',
    keyFeatures: [
      'Công nghệ chuyển đổi kép trực tuyến thời gian chuyển mạch 0ms',
      'Màn hình LCD đồ họa đa chức năng hiển thị trạng thái tải và ắc quy',
      'Hỗ trợ cắm thêm tối đa 10 bộ pin ngoài SRT96BP',
      'Khe cắm mở rộng SmartSlot hỗ trợ card quản trị mạng NMC3',
      'Cổng ngắt khẩn cấp EPO và chế độ ECO tiết kiệm điện'
    ],
    datasheetPdfName: 'Datasheet_APC_SmartUPS_SRT3000XLI.pdf'
  },

  // 2. Santak Online C3K-LCD (Online)
  {
    id: 'santak-c3k-lcd',
    slug: 'bo-luu-dien-santak-true-online-c3k-lcd-3000va-2400w',
    name: 'Bộ Lưu Điện Santak True Online C3K-LCD 3000VA 2400W',
    model: 'C3K-LCD',
    brand: 'Santak',
    topology: 'Online Double Conversion',
    powerVA: 3000,
    powerWatts: 2400,
    powerFactor: 0.8,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '115V - 300V',
    voltageOut: '220V ± 1%',
    frequencyHz: '50/60 Hz ± 0.05 Hz',
    batteryType: '12V VRLA kín khí không cần bảo dưỡng',
    runtimeHalfLoadMin: 15,
    runtimeFullLoadMin: 5,
    expandableBattery: true,
    dimensionsMm: '190 x 318 x 369 mm',
    weightKg: 28.1,
    price: 16800000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Server',
    description: 'Dòng Online tiêu chuẩn phổ biến nhất tại thị trường Việt Nam của hãng Santak, độ bền bỉ cao, thích ứng tốt với lưới điện dao động.',
    keyFeatures: [
      'Bộ vi xử lý kỹ thuật số DSP nâng cao độ tin cậy',
      'Màn hình hiển thị LCD chi tiết thông số điện áp và tần số',
      'Dải điện áp đầu vào cực rộng 115V - 300V',
      'Khả năng tương thích tốt với máy phát điện dân dụng'
    ],
    datasheetPdfName: 'Datasheet_Santak_Online_C3K_LCD.pdf'
  },

  // 3. Eaton 9SX 3000VA Rack/Tower (Online)
  {
    id: 'eaton-9sx-3000ir',
    slug: 'bo-luu-dien-eaton-9sx-3000va-2700w-rack-tower-9sx3000ir',
    name: 'Bộ Lưu Điện Eaton 9SX 3000VA 2700W Rack/Tower',
    model: '9SX3000IR',
    brand: 'Eaton',
    topology: 'Online Double Conversion',
    powerVA: 3000,
    powerWatts: 2700,
    powerFactor: 0.9,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '190V - 276V',
    voltageOut: '200V / 208V / 220V / 230V / 240V ± 2%',
    frequencyHz: '50/60 Hz tự động nhận dạng',
    batteryType: 'VRLA công nghệ sạc ABM tăng 50% tuổi thọ pin',
    runtimeHalfLoadMin: 20,
    runtimeFullLoadMin: 7,
    expandableBattery: true,
    rackHeightU: 2,
    dimensionsMm: '438 x 86.5 x 608 mm',
    weightKg: 26.5,
    price: 32900000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Server',
    description: 'Eaton 9SX cung cấp độ tin cậy hàng đầu cho hạ tầng CNTT, mạng và thiết bị y tế với công nghệ sạc pin thông minh ABM kéo dài tuổi thọ.',
    keyFeatures: [
      'Công nghệ sạc ABM (Active Battery Management) kéo dài tuổi thọ pin thêm 50%',
      'Hiệu suất chuyển đổi lên tới 95% ở chế độ trực tuyến Online',
      'Đo lường năng lượng tiêu thụ trực tiếp trên từng nhóm ổ cắm',
      'Thiết kế đa năng linh hoạt Rack 2U hoặc Tower đứng'
    ],
    datasheetPdfName: 'Datasheet_Eaton_9SX_3000IR.pdf'
  },

  // 4. Vertiv Liebert GXT5 5000VA (Online)
  {
    id: 'vertiv-gxt5-5000mvrt4uxln',
    slug: 'bo-luu-dien-vertiv-liebert-gxt5-5000va-5000w-pf-1-gxt5',
    name: 'Bộ Lưu Điện Vertiv Liebert GXT5 5000VA 5000W PF 1.0',
    model: 'GXT5-5000MVRT4UXLN',
    brand: 'Vertiv',
    topology: 'Online Double Conversion',
    powerVA: 5000,
    powerWatts: 5000,
    powerFactor: 1.0,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '176V - 280V',
    voltageOut: '230V ± 1%',
    frequencyHz: '40 - 70 Hz',
    batteryType: 'VRLA chì-axit kín khí thông minh',
    runtimeHalfLoadMin: 24,
    runtimeFullLoadMin: 8.5,
    expandableBattery: true,
    rackHeightU: 4,
    dimensionsMm: '430 x 173 x 630 mm',
    weightKg: 46.8,
    price: 68500000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Data Center',
    description: 'Dòng UPS cấp cao của Vertiv với hệ số công suất thực đạt PF 1.0 (kVA = kW), hiệu suất tối đa chuẩn Energy Star 2.0 cho trung tâm dữ liệu.',
    keyFeatures: [
      'Hệ số công suất ngõ ra lý tưởng PF 1.0 (5kVA = 5kW)',
      'Chứng nhận chuẩn tiết kiệm năng lượng Energy Star 2.0',
      'Màn hình LCD màu tự xoay theo hướng lắp đặt ngang/dọc',
      'Tích hợp sẵn cổng điều khiển nhóm tải lập trình riêng biệt'
    ],
    datasheetPdfName: 'Datasheet_Vertiv_Liebert_GXT5_5kVA.pdf'
  },

  // 5. APC Smart-UPS Line-Interactive SMT1500IC (SOHO / Office)
  {
    id: 'apc-smt1500ic',
    slug: 'bo-luu-dien-apc-smart-ups-1500va-1000w-lcd-smartconnect-smt1500ic',
    name: 'Bộ Lưu Điện APC Smart-UPS 1500VA LCD SmartConnect 230V',
    model: 'SMT1500IC',
    brand: 'APC',
    topology: 'Line-Interactive',
    powerVA: 1500,
    powerWatts: 1000,
    powerFactor: 0.67,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 6,
    voltageIn: '151V - 302V (Dải điều chỉnh AVR)',
    voltageOut: '230V ± 5%',
    frequencyHz: '50/60 Hz ± 3 Hz',
    batteryType: 'RBC7 Ắc quy chì axit kín khí',
    runtimeHalfLoadMin: 23,
    runtimeFullLoadMin: 7,
    expandableBattery: false,
    dimensionsMm: '219 x 171 x 439 mm',
    weightKg: 24.1,
    price: 15800000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Office',
    description: 'UPS Line-Interactive sóng Sin chuẩn lý tưởng cho máy trạm đồ họa, server mini văn phòng, tích hợp giám sát từ xa qua đám mây SmartConnect.',
    keyFeatures: [
      'Sóng Sin chuẩn thuần khiết bảo vệ an toàn nguồn máy tính Active PFC',
      'Giám sát đám mây bảo mật SmartConnect từ máy tính hoặc điện thoại',
      'Công nghệ ổn áp tự động AVR (Boots & Trim) bảo tồn ắc quy',
      'Màn hình LCD trực quan báo công suất tiêu thụ theo thời gian thực'
    ],
    datasheetPdfName: 'Datasheet_APC_SMT1500IC.pdf'
  },

  // 6. CyberPower CP1500EPFCLCD (PC/Gamer/CCTV)
  {
    id: 'cyberpower-cp1500epfclcd',
    slug: 'bo-luu-dien-cyberpower-cp1500epfclcd-1500va-1000w-pfc-sinewave',
    name: 'Bộ Lưu Điện CyberPower CP1500EPFCLCD 1500VA 1000W Pure Sine',
    model: 'CP1500EPFCLCD',
    brand: 'CyberPower',
    topology: 'Line-Interactive',
    powerVA: 1500,
    powerWatts: 1000,
    powerFactor: 0.67,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 4,
    voltageIn: '170V - 270V',
    voltageOut: '230V ± 5%',
    frequencyHz: '50/60 Hz ± 1%',
    batteryType: 'Ắc quy chì kín khí 12V/8.5Ah x 2',
    runtimeHalfLoadMin: 18,
    runtimeFullLoadMin: 5,
    expandableBattery: false,
    dimensionsMm: '100 x 280 x 355 mm',
    weightKg: 11.4,
    price: 7890000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Home',
    description: 'Sự lựa chọn số 1 cho máy tính Gaming cao cấp, PC thiết kế và hệ thống camera an ninh gia đình với sóng Sin chuẩn và cổng sạc USB Type-C tiện lợi.',
    keyFeatures: [
      'Tương thích hoàn hảo với bộ nguồn Active PFC của máy tính',
      'Trang bị 2 cổng sạc USB (1 Type-A và 1 Type-C PD 30W)',
      'Công nghệ GreenPower UPS tiết kiệm điện năng tới 75%',
      'Màn hình LCD hiển thị công suất W, % tải và thời gian lưu điện'
    ],
    datasheetPdfName: 'Datasheet_CyberPower_CP1500EPFCLCD.pdf'
  },

  // 7. Santak Offline TG500 (Phổ thông B2C)
  {
    id: 'santak-tg500',
    slug: 'bo-luu-dien-santak-offline-tg500-500va-300w',
    name: 'Bộ Lưu Điện Santak Offline TG500 500VA 300W',
    model: 'TG500',
    brand: 'Santak',
    topology: 'Offline',
    powerVA: 500,
    powerWatts: 300,
    powerFactor: 0.6,
    phase: '1:1',
    waveform: 'Stepped Sine Wave',
    transferTimeMs: 8,
    voltageIn: '165V - 265V',
    voltageOut: '220V ± 10%',
    frequencyHz: '50 Hz ± 1 Hz',
    batteryType: '12V / 4.5Ah x 1',
    runtimeHalfLoadMin: 10,
    runtimeFullLoadMin: 3.5,
    expandableBattery: false,
    dimensionsMm: '80 x 176 x 230 mm',
    weightKg: 3.2,
    price: 1150000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 36,
    application: 'Home',
    description: 'Dòng lưu điện nhỏ gọn kinh tế nhất cho máy tính văn phòng đơn lẻ, máy tính tiền POS, modem Wi-Fi và camera quan sát gia đình.',
    keyFeatures: [
      'Kích thước siêu nhỏ gọn, đặt trên bàn làm việc tiện lợi',
      'Khởi động nguội (Cold Start) ngay cả khi không có nguồn điện lưới',
      'Độ bền cực cao với thời hạn bảo hành chính hãng 3 năm'
    ],
    datasheetPdfName: 'Datasheet_Santak_TG500.pdf'
  },

  // 8. Vertiv Liebert ITA2 20kVA (B2B Industrial / Data Center)
  {
    id: 'vertiv-ita2-20kva',
    slug: 'bo-luu-dien-3-pha-vertiv-liebert-ita2-20kva-20kw-ita-20k00ae33',
    name: 'Hệ Thống UPS 3 Pha Vertiv Liebert ITA2 20kVA 20kW',
    model: 'ITA-20k00AE33',
    brand: 'Vertiv',
    topology: 'Online Double Conversion',
    powerVA: 20000,
    powerWatts: 20000,
    powerFactor: 1.0,
    phase: '3:3',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '380V / 400V / 415V (3 Pha + N + G)',
    voltageOut: '380V / 400V / 415V ± 1%',
    frequencyHz: '40 - 70 Hz',
    batteryType: 'Tủ ắc quy ngoài VRLA / Lithium-ion công nghiệp',
    runtimeHalfLoadMin: 45,
    runtimeFullLoadMin: 15,
    expandableBattery: true,
    rackHeightU: 3,
    dimensionsMm: '435 x 130 x 750 mm',
    weightKg: 35.0,
    price: null, // B2B RFQ only
    isB2BOnly: true,
    inStock: true,
    warrantyMonths: 36,
    application: 'Data Center',
    description: 'Hệ thống lưu điện 3 pha công suất cao thế hệ mới, hỗ trợ mở rộng song song song N+X lên đến 4 máy, cấu hình dạng Rack hoặc Tower linh hoạt.',
    keyFeatures: [
      'Thiết kế chuẩn Rack 3U với công suất cực đại 20kW mật độ cao',
      'Hỗ trợ cấu hình ghép nối song song N+1 nâng cao tính sẵn sàng',
      'Hiệu suất vận động lên tới 96.5% ở chế độ Online kép',
      'Có khả năng hoạt động ở nhiệt độ cao lên tới 50°C'
    ],
    datasheetPdfName: 'Datasheet_Vertiv_ITA2_20kVA_3P3P.pdf'
  },

  // 9. APC Galaxy 3L 250kVA (B2B Project Heavy Duty)
  {
    id: 'apc-galaxy-3l-250k',
    slug: 'he-thong-ups-cong-nghiep-apc-galaxy-3l-250kva-250kw-g3l250k',
    name: 'Hệ Thống Bộ Lưu Điện Công Nghiệp APC Galaxy 3L 250kVA 250kW',
    model: 'G3L250K',
    brand: 'APC',
    topology: 'Modular',
    powerVA: 250000,
    powerWatts: 250000,
    powerFactor: 1.0,
    phase: '3:3',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '380V / 400V / 415V 3P+N',
    voltageOut: '380V / 400V / 415V ± 1%',
    frequencyHz: '40 - 70 Hz',
    batteryType: 'Tủ pin tập trung VRLA / Lithium-ion giải pháp dự án',
    runtimeHalfLoadMin: 60,
    runtimeFullLoadMin: 25,
    expandableBattery: true,
    dimensionsMm: '1970 x 1000 x 850 mm',
    weightKg: 680.0,
    price: null, // B2B RFQ only
    isB2BOnly: true,
    inStock: true,
    warrantyMonths: 36,
    application: 'Factory',
    description: 'Giải pháp bảo vệ nguồn điện cấp công nghiệp và Trung tâm dữ liệu quy mô vừa & lớn từ Schneider Electric, giảm thiểu TCO với hiệu suất ECOnversion 99%.',
    keyFeatures: [
      'Chế độ ECOnversion độc quyền đạt hiệu suất kinh ngạc 99%',
      'Cấu trúc dạng khối Modular bảo trì an toàn không cần ngắt điện',
      'Bảo vệ chống dòng ngược tích hợp sẵn (Backfeed Protection)',
      'Hỗ trợ tích hợp nền tảng quản trị thông minh EcoStruxure IT'
    ],
    datasheetPdfName: 'Datasheet_APC_Galaxy_3L_250kVA.pdf'
  },

  // 10. Eaton 93PR 100kVA Modular UPS (B2B Data Center)
  {
    id: 'eaton-93pr-100k',
    slug: 'he-thong-ups-modular-eaton-93pr-100kva-100kw',
    name: 'Hệ Thống UPS Modular Eaton 93PR 100kVA 100kW (Mở rộng đến 200kW)',
    model: '93PR-100kVA-M',
    brand: 'Eaton',
    topology: 'Modular',
    powerVA: 100000,
    powerWatts: 100000,
    powerFactor: 1.0,
    phase: '3:3',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '380V / 400V / 415V',
    voltageOut: '400V ± 1%',
    frequencyHz: '50/60 Hz',
    batteryType: 'Tủ ắc quy công nghiệp gắn ngoài',
    runtimeHalfLoadMin: 50,
    runtimeFullLoadMin: 20,
    expandableBattery: true,
    dimensionsMm: '2000 x 600 x 1050 mm',
    weightKg: 380.0,
    price: null,
    isB2BOnly: true,
    inStock: true,
    warrantyMonths: 36,
    application: 'Data Center',
    description: 'Thiết kế Modular thông minh có thể rút nóng (Hot-swappable module), dễ dàng nâng cấp công suất mà không cần dừng hoạt động của Data Center.',
    keyFeatures: [
      'Công nghệ Hot Sync độc quyền chia sẻ tải không cần cáp giao tiếp liên kết',
      'Hiệu suất chuyển đổi kép 96% và lên đến 99% ở chế độ ESS',
      'Kiến trúc mô-đun hóa dễ dàng thay thế chỉ trong 5 phút',
      'Được thiết kế cho hạ tầng viễn thông và trung tâm dữ liệu Cloud'
    ],
    datasheetPdfName: 'Datasheet_Eaton_93PR_100kVA.pdf'
  },

  // 11. Delta Ultron DPS 200kVA (B2B Industrial Factory)
  {
    id: 'delta-ultron-dps-200k',
    slug: 'bo-luu-dien-cong-nghiep-delta-ultron-dps-200kva',
    name: 'Bộ Lưu Điện Công Nghiệp Delta Ultron DPS 200kVA',
    model: 'DPS-200kVA',
    brand: 'Delta',
    topology: 'Online Double Conversion',
    powerVA: 200000,
    powerWatts: 180000,
    powerFactor: 0.9,
    phase: '3:3',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '380V/400V/415V',
    voltageOut: '380V/400V/415V ± 1%',
    frequencyHz: '50/60 Hz',
    batteryType: 'Tủ VRLA 12V 200Ah cấu hình dự án',
    runtimeHalfLoadMin: 45,
    runtimeFullLoadMin: 18,
    expandableBattery: true,
    dimensionsMm: '1950 x 850 x 950 mm',
    weightKg: 520.0,
    price: null,
    isB2BOnly: true,
    inStock: true,
    warrantyMonths: 36,
    application: 'Factory',
    description: 'Chuyên dụng cho nhà máy bán dẫn, dây chuyền SMT và tự động hóa công nghiệp với khả năng chịu dòng xung đột biến cực đại.',
    keyFeatures: [
      'Khả năng chịu quá tải vượt trội và chống xung áp chuẩn công nghiệp nặng',
      'Tích hợp cuộn lọc sóng hài đầu vào giảm méo THDi < 3%',
      'Cấu trúc quản lý pin thông minh tránh chai phồng bình ắc quy'
    ],
    datasheetPdfName: 'Datasheet_Delta_Ultron_DPS_200kVA.pdf'
  },

  // 12. Ắc quy chuyên dụng UPS Vision 12V-100Ah
  {
    id: 'battery-vision-12v-100ah',
    slug: 'ac-quy-chuyen-dung-ups-vision-12v-100ah-6fm100-x',
    name: 'Ắc Quy Chuyên Dụng UPS Vision 12V 100Ah VRLA AGM',
    model: '6FM100-X',
    brand: 'APC', // accessory partner
    topology: 'Offline',
    powerVA: 1200,
    powerWatts: 1200,
    powerFactor: 1.0,
    phase: '1:1',
    waveform: 'Pure Sine Wave',
    transferTimeMs: 0,
    voltageIn: '12V DC',
    voltageOut: '12V DC danh định',
    frequencyHz: 'DC',
    batteryType: 'AGM VRLA Chì-Axit tái tổ hợp khí',
    runtimeHalfLoadMin: 120,
    runtimeFullLoadMin: 60,
    expandableBattery: true,
    dimensionsMm: '330 x 171 x 215 mm',
    weightKg: 30.5,
    price: 4950000,
    isB2BOnly: false,
    inStock: true,
    warrantyMonths: 24,
    application: 'Server',
    description: 'Ắc quy chuyên dụng xả sâu cho hệ thống UPS Online từ 1kVA đến 100kVA, tuổi thọ thiết kế lên đến 10 năm theo chuẩn Eurobat.',
    keyFeatures: [
      'Thiết kế chu kỳ xả sâu chuyên dụng cho thiết bị viễn thông và UPS',
      'Vỏ bình nhựa ABS chống cháy đạt chuẩn UL94-V0 an toàn cao',
      'Độ tự phóng điện cực thấp dưới 3% mỗi tháng ở nhiệt độ 20°C'
    ],
    datasheetPdfName: 'Datasheet_Vision_Battery_12V100Ah.pdf'
  }
];

export const PRESET_DEVICES: PresetDevice[] = [
  { id: 'pc_office', name: 'Máy tính để bàn văn phòng (kèm màn hình)', category: 'it', defaultWatt: 200, iconName: 'Monitor' },
  { id: 'pc_gaming', name: 'PC Đồ họa / Máy trạm Workstation', category: 'it', defaultWatt: 550, iconName: 'Cpu' },
  { id: 'server_1u', name: 'Máy chủ Server 1U / 2U Rack', category: 'it', defaultWatt: 450, iconName: 'Server' },
  { id: 'nas_storage', name: 'Thiết bị lưu trữ NAS 4-Bay', category: 'it', defaultWatt: 90, iconName: 'HardDrive' },
  { id: 'switch_network', name: 'Switch mạng Core / PoE Switch', category: 'network', defaultWatt: 150, iconName: 'Network' },
  { id: 'router_wifi', name: 'Router Wi-Fi doanh nghiệp & Modem', category: 'network', defaultWatt: 45, iconName: 'Wifi' },
  { id: 'cctv_nvr', name: 'Đầu ghi hình Camera NVR + 8 Cam', category: 'cctv', defaultWatt: 120, iconName: 'Camera' },
  { id: 'cctv_large', name: 'Hệ thống Camera 32 mắt + Màn giám sát', category: 'cctv', defaultWatt: 400, iconName: 'Eye' },
  { id: 'medical_ultrasound', name: 'Máy siêu âm / Thiết bị chẩn đoán y tế', category: 'medical', defaultWatt: 850, iconName: 'Activity' },
  { id: 'industrial_plc', name: 'Tủ điều khiển PLC / Cảm biến công nghiệp', category: 'industrial', defaultWatt: 350, iconName: 'Sliders' }
];

export const MOCK_SOLUTIONS: SolutionItem[] = [
  {
    id: 'solution-datacenter',
    title: 'Giải Pháp Nguồn Cho Data Center & Phòng Server',
    tagline: 'Đảm bảo hoạt động liên tục 99.999% không gián đoạn (Tier III/IV)',
    targetAudience: 'Doanh nghiệp IT, Ngân hàng, Sàn thương mại điện tử, ISP',
    recommendedTopology: 'Online Double Conversion 3:3 / Kiến trúc Modular N+1',
    powerRange: '10kVA - 500kVA+',
    criticalChallenge: 'Sóng hài, quá nhiệt, thời gian chuyển mạch bắt buộc phải bằng 0ms để tránh sập máy chủ.',
    keyBenefits: [
      'Công nghệ Online 0ms loại bỏ hoàn toàn sốc điện cho CPU/RAM',
      'Khả năng mở rộng công suất theo modul không cần tắt nguồn (Hot-swap)',
      'Hỗ trợ tích hợp card quản lý mạng SNMP giám sát nhiệt độ, độ ẩm',
      'Đạt chuẩn tiết kiệm điện năng PUE hiệu suất cao > 96%'
    ],
    suitableModels: ['vertiv-ita2-20kva', 'eaton-93pr-100k', 'apc-galaxy-3l-250k']
  },
  {
    id: 'solution-medical',
    title: 'Giải Pháp Nguồn Điện Dự Phòng Cho Y Tế & Bệnh Viện',
    tagline: 'Bảo vệ thiết bị sinh mệnh: Máy thở, phòng mổ, máy xét nghiệm tự động',
    targetAudience: 'Bệnh viện đa khoa, Phòng khám nha khoa, Trung tâm chẩn đoán hình ảnh',
    recommendedTopology: 'Online Pure Sine Wave có biến áp cách ly y tế',
    powerRange: '3kVA - 80kVA',
    criticalChallenge: 'Yêu cầu dòng điện cực sạch, độ méo hài THD < 2%, chống nhiễu từ trường đến tín hiệu sinh học.',
    keyBenefits: [
      'Biến áp cách ly chống rò rỉ điện giật và triệt tiêu sóng hài',
      'Sóng Sin tinh khiết không làm sai lệch kết quả chẩn đoán',
      'Thời gian lưu điện kéo dài an toàn chờ máy phát điện khởi động',
      'Độ ồn cực thấp (< 45dB) phù hợp môi trường bệnh viện yên tĩnh'
    ],
    suitableModels: ['apc-srt-3000xli', 'vertiv-gxt5-5000mvrt4uxln']
  },
  {
    id: 'solution-factory',
    title: 'Giải Pháp UPS Cho Nhà Máy & Dây Chuyền Tự Động Hóa',
    tagline: 'Chống sụt áp tức thời làm gián đoạn robot, máy ép và dây chuyền SMT',
    targetAudience: 'Khu công nghiệp, Nhà máy chế biến, Doanh nghiệp cơ khí chính xác',
    recommendedTopology: 'UPS Công Nghiệp chịu tải khắc nghiệt 3:3',
    powerRange: '20kVA - 300kVA',
    criticalChallenge: 'Lưới điện công nghiệp biến động dữ dội, bụi bẩn, nhiệt độ cao, tải khởi động của motor.',
    keyBenefits: [
      'Chống chịu sụt áp (Voltage Sag) trong vài chu kỳ mà không ngắt chuyền',
      'Lớp phủ bo mạch chống bụi ẩm và môi trường hóa chất công nghiệp',
      'Khả năng chịu dòng khởi động lên tới 150% tải trong 10 phút',
      'Tích hợp bảo vệ chống sét lan truyền cấp cao SPD Class II'
    ],
    suitableModels: ['delta-ultron-dps-200k', 'apc-galaxy-3l-250k']
  },
  {
    id: 'solution-office',
    title: 'Giải Pháp UPS Cho Văn Phòng & Hệ Thống An Ninh CCTV',
    tagline: 'Duy trì kết nối mạng, tổng đài IP và camera an ninh khi mất điện đột ngột',
    targetAudience: 'Doanh nghiệp vừa và nhỏ, Trụ sở văn phòng, Tòa nhà chung cư',
    recommendedTopology: 'Line-Interactive / Online 1:1 nhỏ gọn',
    powerRange: '1kVA - 6kVA',
    criticalChallenge: 'Cần thiết bị êm ái, chi phí đầu tư hợp lý, dễ vận hành không cần nhân sự IT chuyên trách.',
    keyBenefits: [
      'Cung cấp nguồn dự phòng từ 30 phút đến 4 tiếng cho camera và modem',
      'Tự động khởi động lại thiết bị khi có điện lưới trở lại',
      'Ổn định điện áp tránh chập cháy máy in và máy tính văn phòng',
      'Giá thành hợp lý, lắp đặt bàn giao nhanh trong 24 giờ'
    ],
    suitableModels: ['apc-smt1500ic', 'santak-c3k-lcd', 'cyberpower-cp1500epfclcd']
  }
];

export const MOCK_PROJECTS: ProjectCase[] = [
  {
    id: 'proj-vietinbank-dc',
    title: 'Hệ Thống UPS Trung Tâm Dữ Liệu Dự Phòng Ngân Hàng (Demo)',
    clientType: 'Ngân hàng Thương mại Cổ phần',
    capacity: '2 x 120kVA (Song song dự phòng N+1)',
    location: 'Hà Nội & TP. Hồ Chí Minh',
    brandUsed: 'APC',
    solutionSummary: 'Triển khai cặp UPS Galaxy công suất cao chạy song song chia sẻ tải, đảm bảo hệ thống Core Banking trực tuyến không gián đoạn một giây nào.',
    equipmentList: ['APC Galaxy 3L 120kVA x 2', 'Tủ ắc quy Lithium-ion 30 phút', 'Tủ đóng cắt ATS tự động'],
    redundancyType: '2N Architecture',
    outcome: 'Đạt kiểm định Tier III Uptime Institute, vận hành ổn định 100% trong 2 năm qua.'
  },
  {
    id: 'proj-vinmec-hospital',
    title: 'Nguồn Điện Dự Phòng Phòng Mổ Bệnh Viện Quốc Tế (Demo)',
    clientType: 'Bệnh viện & Chăm sóc sức khỏe',
    capacity: '40kVA Online kèm Biến áp cách ly',
    location: 'Đà Nẵng',
    brandUsed: 'Vertiv',
    solutionSummary: 'Thiết kế hệ thống lưu điện chuyên biệt cho 4 phòng mổ vô trùng, máy chụp cắt lớp CT Scanner và hệ thống nội soi.',
    equipmentList: ['Vertiv Liebert ITA2 40kVA', 'Tủ biến áp cách ly y tế', 'Card giám sát môi trường'],
    redundancyType: 'N+1',
    outcome: 'Đảm bảo an toàn tuyệt đối cho các ca phẫu thuật khi lưới điện thành phố bị sự cố.'
  },
  {
    id: 'proj-samsung-supplier',
    title: 'Bảo Vệ Dây Chuyền SMT Nhà Máy Linh Kiện Điện Tử (Demo)',
    clientType: 'Doanh nghiệp FDI Khu Công Nghiệp',
    capacity: '200kVA 3 Pha',
    location: 'Bắc Ninh',
    brandUsed: 'Eaton',
    solutionSummary: 'Giải quyết triệt để tình trạng sụt áp ngắn hạn (Voltage Dip) làm dừng robot gắp chip trên dây chuyền SMT.',
    equipmentList: ['Eaton 93PR 200kVA Modular', 'Tủ pin ngoài 240V', 'Hệ thống giám sát điện năng'],
    redundancyType: 'Centralized Online',
    outcome: 'Giảm 100% thiệt hại phế phẩm do sự cố điện, tiết kiệm hàng tỷ đồng chi phí hư hỏng board mạch.'
  }
];

export const MOCK_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'phan-biet-ups-offline-line-interactive-online',
    title: 'Phân Biệt Chi Tiết 3 Công Nghệ UPS: Offline, Line-Interactive và Online',
    category: 'Kiến thức kỹ thuật',
    readTime: '6 phút đọc',
    publishedDate: '15/10/2026',
    author: 'Kỹ sư Nguồn Điện UPS PRO',
    summary: 'Hiểu rõ sự khác biệt giữa thời gian chuyển mạch 0ms của Online so với 4-8ms của Line-Interactive để chọn thiết bị chính xác cho doanh nghiệp.',
    content: `Trong thế giới bộ lưu điện (UPS), công nghệ chế tạo quyết định trực tiếp đến mức độ bảo vệ và giá thành thiết bị. Có 3 dòng công nghệ chủ đạo:
    
1. **UPS Offline (Standby)**:
- Nguyên lý: Ở điều kiện bình thường, điện lưới đi thẳng qua công tắc chuyển mạch cấp cho tải. Khi mất điện, biến tần mới khởi động để lấy năng lượng từ ắc quy.
- Thời gian chuyển mạch: Khoảng 4 - 10 mili-giây (ms).
- Dạng sóng: Thường là sóng vuông hoặc mô phỏng sin (Stepped Sine).
- Ứng dụng: Chỉ dùng cho máy tính văn phòng đơn giản, máy in, modem mạng. Không dùng cho máy chủ hoặc thiết bị y tế.

2. **UPS Line-Interactive**:
- Nguyên lý: Bổ sung thêm bộ biến áp tự ngẫu AVR (Automatic Voltage Regulator) để ổn định điện áp mà không cần xả ắc quy khi điện lưới sụt hoặc tăng nhẹ.
- Thời gian chuyển mạch: Rút ngắn xuống còn 2 - 4 ms.
- Dạng sóng: Phần lớn là sóng Sin chuẩn (Pure Sine Wave).
- Ứng dụng: Phù hợp hệ thống máy trạm PC đồ họa, Server nhỏ văn phòng, camera an ninh.

3. **UPS Online Double Conversion (Chuyển Đổi Kép)**:
- Nguyên lý: Nguồn xoay chiều AC được nắn thành một chiều DC sạc cho ắc quy, sau đó biến tần DC-AC chuyển ngược lại thành điện xoay chiều cực sạch cung cấp liên tục cho tải.
- Thời gian chuyển mạch: **Chính xác 0 mili-giây (Zero Transfer Time)**.
- Dạng sóng: Sóng Sin tinh khiết hoàn hảo, lọc sạch 100% sét lan truyền, xung điện, méo hài.
- Ứng dụng: Bắt buộc cho Server Rack, Trung tâm dữ liệu, máy xét nghiệm y tế, robot công nghiệp.`
  },
  {
    id: 'blog-2',
    slug: 'cach-tinh-thoi-gian-luu-dien-va-chon-cong-suat-ups',
    title: 'Cách Tính Thời Gian Lưu Điện Của Ắc Quy Và Chọn Công Suất UPS Chuẩn Xác',
    category: 'Hướng dẫn lựa chọn',
    readTime: '8 phút đọc',
    publishedDate: '22/10/2026',
    author: 'Phòng Kỹ Thuật Dự Án',
    summary: 'Công thức thực tế tính toán công suất W/VA kèm hệ số an toàn 1.25 và cách chọn dung lượng Ah của ắc quy ngoài cho thời gian lưu 1 - 4 giờ.',
    content: `Một trong những sai lầm phổ biến nhất của người mua là nhầm lẫn giữa VA (Volt-Ampe - công suất biểu kiến) và W (Watts - công suất thực).

**Bước 1: Tính tổng công suất thực tế (P_total)**
- Liệt kê toàn bộ thiết bị cần cắm vào UPS: Ví dụ 3 PC (200W x 3 = 600W) + 1 Server (400W) + Switch mạng (100W) = 1100 Watts.
- Nhân với hệ số dự phòng mở rộng và tải khởi động: 1100W x 1.25 = **1375 Watts**.

**Bước 2: Quy đổi sang công suất VA của UPS**
- Mỗi UPS có hệ số công suất (Power Factor - PF), thường từ 0.7 đến 1.0.
- Với UPS có PF = 0.8: Công suất VA tối thiểu = 1375 / 0.8 = **1718 VA**.
- Do đó bạn nên chọn model UPS có công suất từ **2000VA (2kVA)** trở lên.

**Bước 3: Công thức ước tính dung lượng Ắc quy (Ah) khi cần lưu điện lâu:**
- Ah = (Công suất W x Số giờ mong muốn) / (Điện áp bus DC của UPS x Hiệu suất biến tần ~0.85).`
  },
  {
    id: 'blog-3',
    slug: 'cac-loi-ups-thuong-gap-va-cach-xu-ly',
    title: 'Tổng Hợp Các Mã Lỗi UPS Thường Gặp Và Quy Trình Xử Lý Tại Hiện Trường',
    category: 'Bảo trì & Vận hành',
    readTime: '5 phút đọc',
    publishedDate: '28/10/2026',
    author: 'Trưởng Nhóm Dịch Vụ 24/7',
    summary: 'Hướng dẫn nhận biết lỗi quá tải Overload, lỗi chai ắc quy Battery Fault, lỗi quạt Fan Error và cảnh báo Bypass trên các dòng APC, Santak, Eaton.',
    content: `Khi bộ lưu điện phát tiếng kêu tít tít liên tục hoặc đèn LED đỏ sáng, bạn cần bình tĩnh kiểm tra các trường hợp sau:

1. **Lỗi Quá Tải (Overload Warning)**:
- Biểu hiện: Đèn Overload đỏ rực, còi kêu liên tục.
- Nguyên nhân: Cắm thêm thiết bị công suất lớn như ấm đun nước, máy sấy tóc hoặc máy in laser vào ngõ ra của UPS.
- Xử lý: Rút ngay các thiết bị không thiết yếu, tắt UPS và bật lại.

2. **Lỗi Ắc Quy Chai / Không Giữ Điện (Replace Battery)**:
- Biểu hiện: Mất điện lưới là UPS sập nguồn ngay lập tức dù không báo quá tải.
- Nguyên nhân: Ắc quy VRLA đã hết tuổi thọ (thường sau 3 - 5 năm sử dụng).
- Xử lý: Tiến hành đo nội trở và thay thế toàn bộ dàn ắc quy đồng bộ.`
  }
];

export const TECHNICAL_FAQS = [
  {
    q: 'Tại sao máy in laser không được cắm vào bộ lưu điện UPS công suất nhỏ?',
    a: 'Máy in laser sử dụng thanh nhiệt để sấy mực, khi bắt đầu in dòng khởi động tăng đột ngột gấp 3-5 lần công suất định mức (lên tới 1000W - 1500W), sẽ khiến UPS dưới 2kVA bị quá tải lập tức (Overload) và ngắt bảo vệ.'
  },
  {
    q: 'UPS Online khác gì so với UPS Line-Interactive?',
    a: 'Khác biệt lớn nhất là thời gian chuyển mạch. UPS Online có thời gian chuyển mạch bằng 0 mili-giây vì tải luôn được nuôi bằng bộ nghịch lưu, dạng sóng hoàn toàn là Sin chuẩn tinh khiết. Line-Interactive mất 2-6ms để kích hoạt bình ắc quy khi mất điện.'
  },
  {
    q: 'Làm thế nào để tăng thời gian lưu điện từ 10 phút lên 2 - 4 tiếng?',
    a: 'Khách hàng cần chọn dòng UPS có khả năng mở rộng pin (Expandable Battery), sau đó lắp thêm các bộ pin mở rộng chính hãng (EBM) hoặc kết nối tủ ắc quy dung lượng lớn (100Ah, 150Ah) cùng bộ sạc dòng lớn (Long Run).'
  },
  {
    q: 'UPS PRO có hỗ trợ khảo sát và cung cấp hồ sơ CO/CQ dự án không?',
    a: 'Có. Đội ngũ kỹ sư UPS PRO hỗ trợ khảo sát hiện trường miễn phí, cung cấp đầy đủ giấy chứng nhận xuất xứ (CO), chất lượng (CQ), thư hỗ trợ dự án từ hãng (MAF) và hóa đơn GTGT 10% hợp lệ.'
  }
];
