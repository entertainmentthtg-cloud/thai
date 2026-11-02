# UPS PRO – Nền Tảng Thương Mại Điện Tử & Giải Pháp Nguồn Điện Dự Phòng (UPS)

Website thương mại điện tử chuyên ngành bộ lưu điện (UPS) đa thương hiệu (APC, Eaton, Santak, Vertiv, Delta, CyberPower) phục vụ đồng thời khách hàng cá nhân (B2C) và doanh nghiệp, nhà thầu, trung tâm dữ liệu (B2B).

---

## User Review & Critical Decisions

> [!IMPORTANT]
> **Các quyết định thiết kế đã được người dùng xác nhận trong Phase 1:**
> - **Phong cách giao diện (UI/UX)**: Tối giản kỹ thuật chuẩn công nghiệp (*Industrial Technical Minimalism*), ưu tiên dữ liệu kỹ thuật, bảng thông số minh bạch, hệ thống nhãn và số liệu `tabular-nums` sắc nét, không lạm dụng hiệu ứng thừa hay pill badge màu mè.
> - **Cơ chế báo giá & mua hàng (B2B vs B2C)**: UPS công suất nhỏ/phổ thông (< 10kVA) hỗ trợ giỏ hàng và thanh toán trực tuyến B2C; UPS công suất lớn (≥ 10kVA) hoặc dự án tự động chuyển sang chế độ **"Yêu cầu báo giá B2B" (RFQ)** với form cấu hình tải, thời gian lưu điện và tải tài liệu kỹ thuật.
> - **Công cụ tính toán chọn UPS (UPS Sizing Calculator)**: Thiết kế dạng **Interactive Wizard 3 bước** với danh mục thiết bị mẫu (PC văn phòng, Server 1U/2U, Switch mạng, Camera NVR, Máy siêu âm/y tế, Thiết bị công nghiệp), tự tính tổng công suất Watt/VA và khuyến nghị model UPS + thời gian lưu điện thực tế.
> - **Dữ liệu & Pháp lý**: Toàn bộ thông tin dự án, đánh giá khách hàng, thông số tham khảo được gắn nhãn minh bạch là "Dữ liệu mô phỏng/Demo" theo đúng quy chuẩn nghiệp vụ.

---

## 1. Phân Tích Nghiệp Vụ & Đối Tượng Khách Hàng

### 1.1. Mục Tiêu Kinh Doanh
1. **Định vị độc lập & uy tín đa thương hiệu**: Phân phối và tư vấn khách quan giữa các thương hiệu hàng đầu (APC by Schneider Electric, Eaton, Vertiv Liebert, Santak, Delta, CyberPower), giúp khách hàng chọn đúng sản phẩm theo ngân sách và tải thực tế.
2. **Thương mại điện tử kết hợp tư vấn kỹ thuật B2B (O2O)**: Bán lẻ nhanh cho SOHO/Camera/PC qua giỏ hàng online; chốt hợp đồng dự án B2B qua cơ chế RFQ (Request for Quote) và khảo sát lắp đặt tận nơi.
3. **SEO chuyên ngành sâu**: Tối ưu hóa cấu trúc danh mục theo công nghệ (Offline, Line Interactive, Online Double Conversion, Modular), công suất (1–3kVA, 10–20kVA, 100kVA+), và ứng dụng (Server, Y tế, Nhà máy) để đạt thứ hạng cao trên Google Search.

### 1.2. Phân Tích Nhóm Khách Hàng (Personas)
| Nhóm Khách Hàng | Nhu Cầu & Tải Điển Hình | Thách Thức / Nỗi Đau | Hành Vi Trên Website |
| :--- | :--- | :--- | :--- |
| **Cá nhân / SOHO / Gamer** | PC làm việc, Router Wi-Fi, NAS (300W - 1000W) | Không biết tính công suất, sợ mất điện sập file | Dùng **UPS Calculator Wizard**, tìm theo tầm giá, mua nhanh qua giỏ hàng online |
| **IT Manager / SysAdmin** | Rack Server, Core Switch, Firewall (2kVA - 20kVA) | Cần Online sóng Sin chuẩn, khe cắm SNMP/NMC, pin mở rộng (EBM) | So sánh thông số chi tiết (PF 0.9 - 1.0, thời gian chuyển mạch 0ms), tải datasheet PDF |
| **Nhà Thầu Cơ Điện (M&E) / Tích Hợp Hệ Thống** | Data Center, Tòa nhà, Bệnh viện (30kVA - 500kVA+) | Đấu thầu dự án, cần CO/CQ, bảng so sánh kỹ thuật, giá đại lý | Gửi danh mục thiết bị qua **Form B2B RFQ**, yêu cầu khảo sát hiện trường |
| **Quản Lý Nhà Máy / Công Nghiệp** | Dây chuyền tự động hóa, robot, máy CNC | Môi trường bụi, điện áp dao động, sóng hài cao | Tìm giải pháp UPS công nghiệp chịu tải khắc nghiệt, dịch vụ bảo trì định kỳ 24/7 |

---

## 2. Sitemap Hoàn Chỉnh

```
UPS PRO Web Application Architecture
├── / (Trang chủ)
│   ├── Top Bar (Brand, 5 Nav Links, CTA Báo giá, Mini-Cart Drawer)
│   ├── Hero Campaign (Giải pháp nguồn điện liên tục, Dual CTA, KPI Strip)
│   ├── Quick Selector (Bộ chọn nhanh theo Thiết bị / Công suất / Công nghệ)
│   ├── Danh mục công nghệ nổi bật (Offline, Line-Interactive, Online, Modular, Ắc quy, PDU/ATS)
│   ├── Sản phẩm tiêu biểu & Bán chạy (Tabbed Grid với thông số chuẩn)
│   ├── Công cụ tương tác: UPS Sizing Calculator (Wizard 3 bước)
│   ├── Giải pháp UPS theo ngành (Văn phòng, Server, Y tế, Nhà máy, An ninh)
│   ├── Đối tác thương hiệu (APC, Eaton, Vertiv, Santak, Delta, CyberPower)
│   ├── Dịch vụ kỹ thuật (Khảo sát, Lắp đặt, Bảo trì định kỳ, Thay thế ắc quy)
│   ├── Dự án tiêu biểu & Khách hàng tin cậy (Demo Project Showcase)
│   ├── Kiến thức & Cẩm nang UPS (Bài viết chuyên sâu chuẩn SEO)
│   └── Footer (Thông tin doanh nghiệp, Chứng nhận ISO/CO-CQ demo, Liên hệ, Hotline)
│
├── /san-pham (Danh mục & Bộ lọc nâng cao)
│   ├── Bộ lọc đa tiêu chí (Facet Sidebar: Hãng, Công nghệ, Công suất VA/W, Số pha, Pin mở rộng)
│   ├── Thanh công cụ (Sắp xếp, Chế độ xem Lưới/Bảng thông số, Đếm kết quả)
│   ├── Khay so sánh nổi (So sánh 2–4 sản phẩm đối đầu thông số kỹ thuật)
│   └── Product Grid (Card kỹ thuật, Tag trạng thái, Giá hoặc Báo giá)
│
├── /san-pham/:slug (Chi tiết sản phẩm PDP)
│   ├── Breadcrumb điều hướng
│   ├── Khung ảnh sản phẩm (Gallery nhiều góc, Zoom kỹ thuật)
│   ├── Purchase Module (Tên model, Mã SKU, Hãng, Giá niêm yết/Báo giá B2B, Nút Mua/RFQ, Cam kết)
│   ├── Bảng thông số kỹ thuật chuyên sâu (15+ chỉ số điện học chính xác)
│   ├── Tabs nội dung: Mô tả chi tiết | Thông số | Datasheet PDF | Đánh giá & Hỏi đáp kỹ thuật
│   └── Sản phẩm tương đương & Phụ kiện tương thích (EBM, PDU, Card mạng)
│
├── /cong-cu-tinh-ups (UPS Sizing Calculator độc lập)
│   ├── Bước 1: Chọn thiết bị cần bảo vệ hoặc nhập công suất tùy biến (W)
│   ├── Bước 2: Chọn thời gian lưu điện mong muốn (15p, 30p, 1h, 2h+) & Số pha
│   └── Bước 3: Xem kết quả phân tích hệ số tải, khuyến nghị 3 model tối ưu, xuất PDF / Gửi báo giá
│
├── /giai-phap (Giải pháp chuyên ngành)
│   ├── UPS cho Data Center & Server Room
│   ├── UPS cho Y tế & Thiết bị chẩn đoán hình ảnh
│   ├── UPS cho Nhà máy sản xuất & Tự động hóa
│   └── UPS cho Tòa nhà thông minh, An ninh giám sát
│
├── /dich-vu (Dịch vụ kỹ thuật chuyên nghiệp)
│   ├── Bảo trì & Đo kiểm ắc quy chuyên sâu
│   ├── Khảo sát, thi công lắp đặt tủ phân phối UPS
│   └── Cho thuê UPS sự kiện / dự án tạm thời
│
├── /du-an (Dự án & Năng lực thực tế - Demo)
│   └── Hồ sơ triển khai, ảnh hiện trường, sơ đồ đơn tuyến, cấu hình UPS
│
├── /kien-thuc (Blog / Kiến thức kỹ thuật chuẩn SEO)
│   └── Bài viết so sánh Online vs Line-Interactive, Hướng dẫn tính AH ắc quy, Xử lý mã lỗi
│
├── /gio-hang & /thanh-toan (Luồng mua hàng B2C)
│   ├── Giỏ hàng có kiểm tra tồn kho, tạm tính VAT 10%, mã giảm giá
│   └── Form đặt hàng 1 trang: Thông tin người nhận, xuất hóa đơn VAT công ty, chuyển khoản QR Napas / COD
│
├── /yeu-cau-bao-gia (Luồng RFQ B2B chuyên biệt)
│   └── Form dự án: Công suất kVA, cấu hình N+1 dự phòng, tải file BOQ/bản vẽ, thời hạn bàn giao
│
└── /lien-he (Thông tin liên hệ, bản đồ trung tâm kỹ thuật, Hotline 24/7, kết nối Zalo OA)
```

---

## 3. Design System Kỹ Thuật (Industrial Technical Minimalism)

Tuân thủ nghiêm ngặt **Frontend Design Constitution**: Không dùng gradient tím mờ, không dùng badge pill tròn trịa kẹp chữ, dùng typography có kỷ luật, layout 1440px vững chắc và tương phản WCAG AA cao.

### 3.1. Bảng Màu Thương Hiệu & Trạng Thái (60-30-10 Rule)
- **60% Nền Neutral Canvas**:
  - Light mode: `#FFFFFF` (nền chính) kết hợp `#F8FAFC` (Slate-50, nền phân vùng kỹ thuật).
  - Viền cấu trúc: `#E2E8F0` (Slate-200) hairline border 1px tinh gọn.
- **30% Khối Cấu Trúc & Nội Dung**:
  - Primary Brand Navy: `#0F172A` (Slate-900) & `#102A43` (Deep Industrial Navy) dùng cho tiêu đề chính, header, thanh điều hướng và bảng kỹ thuật.
  - Body Text: `#334155` (Slate-700) tạo độ tương phản cao, dễ đọc trong tài liệu thông số.
  - Muted Text / Nhãn thông số: `#64748B` (Slate-500).
- **10% Điểm Nhấn Hành Động (Accents)**:
  - Electric Tech Blue: `#1677FF` (Tương tác nút phụ, liên kết kỹ thuật, tab kích hoạt, focus ring).
  - Industrial Power Orange: `#FF8A00` / `#EA580C` (Màu giá bán, nút CTA Mua Ngay / Yêu Cầu Báo Giá, cờ ưu đãi dự án).
  - Functional Status: Emerald `#16A34A` (Sẵn hàng), Amber `#D97706` (Đặt trước 7 ngày), Rose `#DC2626` (Tạm hết hàng).

### 3.2. Hệ Thống Typography (Display + Body + Tabular Numerals)
- **Display & Section Headings**: `Plus Jakarta Sans` (font sans hình học vững chãi, trọng lượng Bold 700 / SemiBold 600, `text-wrap: balance`).
- **Body & Specification Labels**: `Plus Jakarta Sans` / `Inter` (Regular 400 & Medium 500, line-height 1.6).
- **Technical Metrics & Numbers**: `font-mono tabular-nums` (`IBM Plex Mono` / `JetBrains Mono` / CSS tabular-nums) cho toàn bộ bảng thông số kVA, Watt, Volts, Hz, Giá tiền VND và thời gian chuyển mạch ms.

### 3.3. Quy Chuẩn Thành Phần (Component Tokens)
- **Button Tokens**:
  - `Btn-Primary` (Cam hành động): `bg-[#FF8A00] hover:bg-[#E67C00] text-white font-semibold py-2.5 px-5 rounded-md transition-colors shadow-sm`
  - `Btn-B2B-RFQ` (Navy uy tín): `bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold py-2.5 px-5 rounded-md transition-colors`
  - `Btn-Secondary` (Viền hairline): `border border-slate-300 hover:border-slate-400 bg-white text-slate-800 py-2.5 px-4 rounded-md`
- **Card Tokens**:
  - Nền trắng `bg-white`, viền mảnh `border border-slate-200`, bo góc vừa phải `rounded-lg` (radius 8px), bóng mờ tối giản `hover:shadow-md transition-shadow`. Tuyệt đối không dùng bóng đổ quá lớn hoặc thẻ lồng trong thẻ rườm rà.
- **Zero-Pill Metadata**:
  - Trạng thái công nghệ hoặc thương hiệu hiển thị dạng text thuần kèm dấu phân cách: `APC · Online Double Conversion · 3kVA/2.7kW · Có sẵn`.

---

## 4. Chi Tiết Wireframe Cho Các Phân Hệ Cốt Lõi

### 4.1. Wireframe: Trang Chủ (Homepage Layout)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [Logo: UPS PRO]    [Sản phẩm ▾]  [Giải pháp]  [Dịch vụ]  [Công cụ tính]  [Dự án]        │
│          [🔍 Tìm kiếm model, kVA...]    [Hotline: 090x.xxx.xxx]   [🛒 Giỏ (2)]  [Yêu Cầu Báo Giá] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ HERO SECTION:                                                                                    │
│ ┌───────────────────────────────────────────────┬──────────────────────────────────────────────┐ │
│ │ GIẢI PHÁP NGUỒN ĐIỆN LIÊN TỤC CHUYÊN NGHIỆP   │ [Hình ảnh thực tế: Tủ UPS Datacenter &       │ │
│ │ Phân phối bộ lưu điện đa thương hiệu APC,     │  hệ thống nguồn công nghiệp chuẩn 16:9]      │ │
│ │ Eaton, Vertiv, Santak cho Doanh nghiệp & IT.  │                                              │ │
│ │                                               │ ┌──────────────────────────────────────────┐ │ │
│ │ [Khám Phá Danh Mục]  [Tính Công Suất UPS ⚡]   │ │ Demo KPI: 500+ Dự Án · 24/7 Hỗ Trợ Kỹ Thuật│ │ │
│ └───────────────────────────────────────────────┴──────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ BỘ CHỌN NHANH THEO CÔNG NGHỆ (Interactive 6 Cards):                                              │
│ [UPS Offline]   [UPS Line-Interactive]   [UPS Online 1:1]   [UPS Online 3:3]   [Ắc Quy UPS]  [PDU] │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ SẢN PHẨM BÁN CHẠY & NỔI BẬT: (Tab: Tất cả | Dưới 3kVA (B2C) | 10kVA - 40kVA (B2B) | Modular)    │
│ ┌─────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────────┐             │
│ │ [Ảnh sản phẩm 4:3]      │ │ [Ảnh sản phẩm 4:3]      │ │ [Ảnh sản phẩm 4:3]      │             │
│ │ APC Smart-UPS SRT 3000VA│ │ Santak Online C3K-LCD   │ │ Vertiv Liebert ITA2 20k │             │
│ │ SKU: SRT3000XLI         │ │ SKU: C3K-LCD            │ │ SKU: ITA-20k00AE33      │             │
│ │ Công suất: 3000VA / 2700W│ │ Công suất: 3000VA / 2400W│ │ Công suất: 20kVA / 20kW │             │
│ │ Công nghệ: Online 0ms   │ │ Công nghệ: Online 0ms   │ │ Công nghệ: 3 Pha Online │             │
│ │ 34.500.000 đ (VAT)      │ │ 16.800.000 đ (VAT)      │ │ LIÊN HỆ BÁO GIÁ DỰ ÁN   │             │
│ │ [Thêm vào giỏ] [Xem]    │ │ [Thêm vào giỏ] [Xem]    │ │ [Yêu Cầu Báo Giá B2B]   │             │
│ └─────────────────────────┘ └─────────────────────────┘ └─────────────────────────┘             │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ WIDGET TƯƠNG TÁC: CÔNG CỤ TÍNH CÔNG SUẤT VÀ THỜI GIAN LƯU ĐIỆN                                   │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ 1. Chọn thiết bị tải  ->  2. Thiết lập thời gian lưu  ->  3. Xem khuyến nghị & Báo giá       │ │
│ │ [PC: 250W (x2)]  [Server 2U: 500W (x1)]  [Switch: 80W (x2)] -> Tổng: 1160W (Khuyến nghị 2kVA)│ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ GIẢI PHÁP THEO LĨNH VỰC: [Data Center] [Văn Phòng CNTT] [Bệnh Viện & Y Tế] [Nhà Máy Sản Xuất]   │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ DỊCH VỤ KỸ THUẬT: [Tư vấn & Đo kiểm] [Lắp đặt tận nơi] [Bảo trì định kỳ] [Thay thế ắc quy]     │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ ĐỐI TÁC THƯƠNG HIỆU: [APC by Schneider]  [EATON]  [VERTIV]  [SANTAK]  [DELTA]  [CYBERPOWER]      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ CTA CUỐI TRANG: "CẦN TƯ VẤN THIẾT KẾ GIẢI PHÁP NGUỒN DỰ PHÒNG?" -> [Hotline 24/7] [Gửi Bản Vẽ/BOQ│
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.2. Wireframe: Trang Danh Mục & Bộ Lọc Nâng Cao (/san-pham)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Trang chủ / Danh mục / Bộ lưu điện UPS Online                                        │
│ TIÊU ĐỀ: BỘ LƯU ĐIỆN UPS ONLINE DOUBLE CONVERSION (Hiển thị 24 sản phẩm)                         │
├───────────────────────────────┬──────────────────────────────────────────────────────────────────┤
│ BỘ LỌC ĐA TIÊU CHÍ (SIDEBAR)  │ THANH ĐIỀU HƯỚNG: Sắp xếp theo [Mới nhất ▾] | Chế độ [Lưới/Bảng] │
│                               ├──────────────────────────────────────────────────────────────────┤
│ Thương hiệu:                  │ SO SÁNH (Đang chọn 2/4 sản phẩm) -> [Bật Bảng So Sánh Kỹ Thuật]  │
│ [ ] APC (8)                   ├──────────────────────────────────────────────────────────────────┤
│ [ ] Eaton (6)                 │ GRID KẾT QUẢ SẢN PHẨM:                                           │
│ [ ] Vertiv (5)                │ ┌─────────────────────────┐ ┌─────────────────────────┐          │
│ [ ] Santak (5)                │ │ APC Smart-UPS On-Line   │ │ Eaton 9SX 3000VA Rack   │          │
│                               │ │ Model: SRT2200XLI       │ │ Model: 9SX3000IR        │          │
│ Dải công suất:                │ │ 2200VA / 1980W · Online │ │ 3000VA / 2700W · Online │          │
│ ( ) Dưới 1 kVA                │ │ 230V · Chuyển mạch 0ms  │ │ 230V · PF 0.9 · Sóng Sin│          │
│ ( ) 1 kVA – 3 kVA             │ │ Có sẵn hàng             │ │ Có sẵn hàng             │          │
│ ( ) 3 kVA – 10 kVA            │ │ 28.900.000 đ            │ │ 32.100.000 đ            │          │
│ ( ) 10 kVA – 40 kVA           │ │ [So sánh] [+ Giỏ hàng]  │ │ [So sánh] [+ Giỏ hàng]  │          │
│ ( ) Trên 40 kVA               │ └─────────────────────────┘ └─────────────────────────┘          │
│                               │ ┌─────────────────────────┐ ┌─────────────────────────┐          │
│ Số pha:                       │ │ Vertiv Liebert GXT5     │ │ APC Galaxy 3L 250kVA    │          │
│ [ ] 1 Pha Vào / 1 Pha Ra      │ │ Model: GXT5-10KMVRT6UXLN│ │ Model: G3L250K          │          │
│ [ ] 3 Pha Vào / 1 Pha Ra      │ │ 10kVA / 10kW · PF 1.0   │ │ 250kVA / 250kW · 3P/3P  │          │
│ [ ] 3 Pha Vào / 3 Pha Ra      │ │ Dành cho Rack Server    │ │ Hệ thống Modular Công   │          │
│                               │ │ LIÊN HỆ BÁO GIÁ DỰ ÁN   │ │ LIÊN HỆ BÁO GIÁ DỰ ÁN   │          │
│ Tính năng mở rộng:            │ │ [So sánh] [Yêu cầu RFQ] │ │ [So sánh] [Yêu cầu RFQ] │          │
│ [ ] Hỗ trợ tủ pin ngoài (EBM) └─────────────────────────┘ └─────────────────────────┘          │
│ [ ] Có sẵn Card SNMP/Web      │ Phân trang: [1]  [2]  [3]  ... [Trang tiếp >]                    │
└───────────────────────────────┴──────────────────────────────────────────────────────────────────┘
```

---

### 4.3. Wireframe: Chi Tiết Sản Phẩm (Product Detail Page - PDP)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Breadcrumb: Trang chủ / UPS Online / APC / APC Smart-UPS SRT 3000VA 230V                         │
├────────────────────────────────────────┬─────────────────────────────────────────────────────────┤
│ KHUNG HÌNH ẢNH & TÀI LIỆU (Trái)       │ MODULE MUA HÀNG & THÔNG SỐ CƠ BẢN (Phải)               │
│ ┌────────────────────────────────────┐ │ Thương hiệu: APC by Schneider Electric · SKU: SRT3000XLI│
│ │ [Ảnh chính độ phân giải cao]       │ │ TÊN: BỘ LƯU ĐIỆN APC SMART-UPS SRT 3000VA 230V         │
│ │ Góc nghiêng hiển thị mặt trước LCD │ │ Trạng thái: Còn hàng trong kho · Bảo hành: 36 tháng   │
│ │ và các cổng cắm phía sau           │ │                                                         │
│ └────────────────────────────────────┘ │ GIÁ BÁN LẺ NIÊM YẾT:                                   │
│ Thumbnail: [Mặt trước] [Mặt sau] [LCD]│ │ 34.500.000 đ (Đã bao gồm VAT 10%)                     │
│                                        │ │ Giá dự án B2B: Chiết khấu tốt theo số lượng           │
│ ┌────────────────────────────────────┐ │                                                         │
│ │ TÀI LIỆU TẢI VỀ:                   │ │ THÔNG SỐ CHÍNH NHANH:                                  │
│ │ 📄 Datasheet kỹ thuật (PDF - 2.1MB)│ │ · Công suất: 3000VA / 2700 Watts (Hệ số công suất 0.9) │
│ │ 📄 Hướng dẫn sử dụng & lắp đặt (PDF│ │ · Công nghệ: Online Double Conversion (0ms chuyển mạch)│
│ │ 📄 Chứng nhận xuất xưởng CO/CQ mẫu │ │ · Điện áp: 220V/230V/240V · Dạng sóng: Sin chuẩn        │
│ └────────────────────────────────────┘ │                                                         │
│                                        │ Số lượng: [-] [ 1 ] [+]                                 │
│                                        │ [THÊM VÀO GIỎ HÀNG]        [MUA NGAY - GIAO 24H]        │
│                                        │ [NHẬN BÁO GIÁ DỰ ÁN CHO ĐẠI LÝ / DOANH NGHIỆP]          │
│                                        │                                                         │
│                                        │ 🛡️ Cam kết: Hàng chính hãng 100% · Đầy đủ CO/CQ         │
│                                        │ 🚚 Giao hàng & hỗ trợ đấu nối kỹ thuật miễn phí nội thành│
├────────────────────────────────────────┴─────────────────────────────────────────────────────────┤
│ TABS THÔNG TIN CHI TIẾT:                                                                        │
│ [BẢNG THÔNG SỐ KỸ THUẬT]  |  [MÔ TẢ GIẢI PHÁP]  |  [HƯỚNG DẪN LẮP ĐẶT]  |  [HỎI ĐÁP & HỖ TRỢ]    │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ BẢNG THÔNG SỐ CHÍNH XÁC:                                                                     │ │
│ │ • Công suất đầu ra: 3000 VA / 2700 Watts                                                     │ │
│ │ • Điện áp danh định vào: 220V / 230V / 240V (Dải điện áp 160V - 275V)                       │ │
│ │ • Tần số vào/ra: 50/60 Hz +/- 3 Hz (Tự động thích ứng)                                       │ │
│ │ • Dạng sóng ngõ ra: Sóng Sin chuẩn hoàn toàn (Pure Sine Wave, THD < 2%)                      │ │
│ │ • Thời gian chuyển mạch: 0 ms (Zero transfer time)                                           │ │
│ │ • Loại ắc quy: Kín khí không cần bảo dưỡng (VRLA), 12VDC, có hỗ trợ rút nóng (Hot-swappable) │ │
│ │ • Khả năng mở rộng pin: Hỗ trợ kết nối tối đa 10 bộ pin ngoài SRT96BP                        │ │
│ │ • Cổng kết nối & Quản trị: RJ-45 10/100 Base-T, SmartSlot (Gắn card mạng NMC), USB           │ │
│ │ • Kích thước (CxRxS) & Trọng lượng: 432 x 85 x 635 mm · 31.3 kg (Dạng Rack/Tower 2U)        │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ PHỤ KIỆN TƯƠNG THÍCH KHUYÊN DÙNG:                                                               │
│ [Bộ pin mở rộng SRT96BP]     [Card quản lý mạng NMC3 AP9641]     [Thanh phân phối nguồn PDU 16A] │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.4. Wireframe: Công Cụ Tính & Tư Vấn Chọn UPS (UPS Sizing Calculator Wizard)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ CÔNG CỤ TÍNH CÔNG SUẤT VÀ TƯ VẤN BỘ LƯU ĐIỆN PHÙ HỢP (UPS SIZING CALCULATOR)                     │
│ Dành cho kỹ sư IT, quản trị viên hệ thống và người dùng cá nhân tính toán thời gian lưu điện.     │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ TIẾN TRÌNH: [Bước 1: Chọn Tải & Công Suất] ────> [Bước 2: Thời Gian Lưu] ────> [Bước 3: Kết Quả]  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ BƯỚC 1: CHỌN THIẾT BỊ HOẶC NHẬP TỔNG CÔNG SUẤT (WATT)                                            │
│ Danh sách thiết bị mẫu thông dụng:                                                               │
│ [ ] Máy tính văn phòng (200W)    SL: [ 2 ] = 400W                                                │
│ [ ] PC Gaming / Đồ họa (500W)    SL: [ 0 ] = 0W                                                  │
│ [ ] Server 1U/2U (450W)          SL: [ 1 ] = 450W                                                │
│ [ ] Switch mạng Core (150W)      SL: [ 2 ] = 300W                                                │
│ [ ] Đầu ghi Camera NVR (100W)    SL: [ 1 ] = 100W                                                │
│ Hoặc nhập trực tiếp tải đặc thù: [ 1250 ] Watts | Hệ số an toàn khuyến nghị: 125% (+25% dự phòng)│
│ -> TỔNG TẢI TÍNH TOÁN: 1250W × 1.25 = 1562.5 Watts (Yêu cầu UPS tối thiểu: ~2000VA / 2kVA)      │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ BƯỚC 2: THỜI GIAN LƯU ĐIỆN YÊU CẦU:                                                              │
│ ( ) 10 - 15 phút (Đủ tắt máy an toàn và lưu dữ liệu)                                             │
│ ( ) 30 - 45 phút (Duy trì mạng chờ máy phát điện khởi động)                                      │
│ ( ) 1 - 2 giờ (Yêu cầu thêm Module Ắc Quy Mở Rộng - EBM)                                         │
│ ( ) 4+ giờ (Hệ thống UPS công nghiệp + Tủ ắc quy chuyên dụng)                                    │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ BƯỚC 3: KẾT QUẢ PHÂN TÍCH & MODEL ĐỀ XUẤT TỐI ƯU:                                                │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Khuyến nghị kỹ thuật: Sử dụng công nghệ Online Double Conversion để chống nhiễu và sụt áp.   │ │
│ ├────────────────────────────────┬───────────────────────────────┬─────────────────────────────┤ │
│ │ Lựa chọn 1 (Tối ưu ngân sách)  │ Lựa chọn 2 (Tiêu chuẩn khuyên)│ Lựa chọn 3 (Mở rộng dài hạn)│ │
│ │ Santak Online C2K-LCD          │ APC Smart-UPS SRT 2200VA      │ Eaton 9SX 3000VA + 1 EBM    │ │
│ │ 2000VA / 1600W · Lưu ~12 phút  │ 2200VA / 1980W · Lưu ~18 phút │ 3000VA / 2700W · Lưu ~65 p  │ │
│ │ Giá: 11.800.000 đ              │ Giá: 28.900.000 đ             │ Giá: 42.500.000 đ           │ │
│ │ [Xem chi tiết] [Chọn cấu hình] │ [Xem chi tiết] [Chọn cấu hình]│ [Xem chi tiết] [Yêu cầu RFQ]│ │
│ └────────────────────────────────┴───────────────────────────────┴─────────────────────────────┘ │
│ [Xuất Báo Cáo Kỹ Thuật PDF]   [Gửi Bảng Tính Này Cho Kỹ Sư UPS PRO Tư Vấn Miễn Phí]              │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.5. Wireframe: Luồng Yêu Cầu Báo Giá Dự Án B2B (RFQ Modal / Page)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ YÊU CẦU BÁO GIÁ DỰ ÁN & ĐẠI LÝ B2B (REQUEST FOR QUOTATION)                                       │
│ Phản hồi nhanh trong 15 - 30 phút · Hỗ trợ hồ sơ thầu, CO/CQ, chiết khấu dự án                  │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ THÔNG TIN DOANH NGHIỆP / NGƯỜI YÊU CẦU:                                                          │
│ Họ và tên (*): [Nguyễn Văn A               ]    Số điện thoại (*): [0912.xxx.xxx             ]    │
│ Email công vụ (*): [a.nguyen@company.com.vn]    Tên công ty / Dự án: [Công ty Cơ Điện M&E ABC]    │
│ Tỉnh / Thành phố: [Hà Nội                 ▾]    Vai trò: [Nhà thầu M&E / Tích hợp hệ thống  ▾]    │
├──────────────────────────────────────────────────────────────────────────────────────────────────┤
│ YÊU CẦU KỸ THUẬT & DỰ ÁN:                                                                        │
│ Dòng sản phẩm / Giải pháp quan tâm: [UPS 3 Pha Công Nghiệp 40kVA - 120kVA                     ▾] │
│ Thương hiệu ưu tiên: [x] APC   [x] Vertiv   [ ] Eaton   [ ] Tùy chọn đề xuất của kỹ sư          │
│ Tổng công suất dự kiến: [ 60 kVA ]   Thời gian lưu điện mong muốn: [ 30 phút full tải ]          │
│ Số lượng: [ 2 bộ chạy song song N+1 ]                                                            │
│ Ghi chú yêu cầu kỹ thuật đặc biệt:                                                               │
│ [Cần hỗ trợ khảo sát mặt bằng phòng server và cung cấp tủ ATS đồng bộ, tiến độ tháng 12/2026]     │
│ Đính kèm file BOQ / Bản vẽ kỹ thuật (PDF, DWG, XLSX, tối đa 20MB): [Chọn file 📄 ...]             │
│                                                                                                  │
│ [X] Tôi đồng ý chính sách bảo mật thông tin và nhận hỗ trợ kỹ thuật từ UPS PRO                   │
│ [GỬI YÊU CẦU BÁO GIÁ DỰ ÁN]    (Cam kết không spam, kỹ sư phụ trách liên hệ trực tiếp)           │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 4.6. Wireframe: Giỏ Hàng & Thanh Toán B2C (/gio-hang & /thanh-toan)

```
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│ GIỎ HÀNG CỦA BẠN (2 Sản phẩm)                                                                    │
├──────────────────────────────────────────────────────────────────┬───────────────────────────────┤
│ DANH SÁCH THIẾT BỊ                                               │ TỔNG KẾT ĐƠN HÀNG             │
│ ┌──────────────────────────────────────────────────────────────┐ │ Tạm tính:       51.300.000 đ │
│ │ [Ảnh] APC Smart-UPS SRT 3000VA (SRT3000XLI)                  │ │ Thuế VAT (10%):  5.130.000 đ │
│ │       Giá: 34.500.000 đ  |  Số lượng: [-] [ 1 ] [+]  [Xóa]   │ │ Phí vận chuyển:    Miễn phí  │
│ └──────────────────────────────────────────────────────────────┘ │ ───────────────────────────── │
│ ┌──────────────────────────────────────────────────────────────┐ │ TỔNG CỘNG:      56.430.000 đ │
│ │ [Ảnh] Santak Online C3K-LCD (C3K-LCD)                        │ │                               │
│ │       Giá: 16.800.000 đ  |  Số lượng: [-] [ 1 ] [+]  [Xóa]   │ │ [TIẾN HÀNH ĐẶT HÀNG]          │
│ └──────────────────────────────────────────────────────────────┘ │ Hoặc [Yêu Cầu Báo Giá Hóa Đơn]│
├──────────────────────────────────────────────────────────────────┴───────────────────────────────┤
│ THÔNG TIN GIAO HÀNG & XUẤT HÓA ĐƠN VAT:                                                          │
│ [ ] Xuất hóa đơn VAT cho Công ty (Nhập Mã Số Thuế -> Tự động tra cứu tên & địa chỉ công ty)      │
│ Phương thức thanh toán:                                                                          │
│ (•) Chuyển khoản ngân hàng qua mã QR VietQR / Napas247 (Tự động kích hoạt đơn)                  │
│ ( ) Thanh toán khi nhận hàng (COD) áp dụng cho đơn dưới 20 triệu tại Hà Nội & TP.HCM             │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Mục Đích & Vai Trò Nghiệp Vụ Của Từng Section

| Section | Mục Đích Kinh Doanh | Mục Đích Kỹ Thuật & Trải Nghiệm (UX) |
| :--- | :--- | :--- |
| **Top Bar & Search** | Giữ tỷ lệ chuyển đổi cao, hotline hỗ trợ kỹ thuật ngay lập tức | Tìm kiếm tức thì theo model SKU, kVA; giỏ hàng trượt mượt mà |
| **Hero Campaign** | Định vị ngay thương hiệu UPS PRO phân phối đa hãng, tạo niềm tin | Không dùng khẩu hiệu sáo rỗng; 2 CTA rõ ràng cho 2 đối tượng B2C/B2B |
| **Category Matrix** | Điều hướng khách hàng vào đúng nhánh công nghệ | Tránh nhầm lẫn giữa UPS Offline, Line-Interactive và Online 0ms |
| **Sizing Calculator** | Giải quyết rào cản lớn nhất của khách hàng: "Mua bao nhiêu kVA?" | Tăng thời gian on-site, chuyển đổi trực tiếp thành Lead chất lượng cao |
| **Featured Products** | Trưng bày sản phẩm bán chạy có sẵn hàng trong kho | Card chuẩn công nghiệp, bảng thông số rút gọn, phân hóa nút Mua / RFQ |
| **Solutions & Case Studies** | Chứng minh năng lực triển khai thực tế cho dự án lớn | Tăng độ uy tín với nhà thầu cơ điện và cơ quan nhà nước |
| **Technical Blog (SEO)** | Thu hút organic traffic từ Google với từ khóa chuyên ngành | Xây dựng hình ảnh chuyên gia giải pháp điện liên tục |

---

## 6. Luồng Người Dùng: B2C vs B2B Project RFQ

```
LUỒNG B2C (Cá nhân, SOHO, Mua lẻ dưới 10kVA):
[Khách vào web] ──> [Dùng UPS Calculator hoặc Tìm kiếm model] ──> [Trang PDP: Kiểm tra công suất/giá]
       │
       ▼
[Nhấn "Thêm vào giỏ" / "Mua ngay"] ──> [Drawer Giỏ hàng & Nhập Mã giảm giá]
       │
       ▼
[Trang Checkout 1 bước: Tên, SĐT, Địa chỉ, Tùy chọn VAT Công ty]
       │
       ▼
[Quét mã VietQR chuyển khoản hoặc chọn COD] ──> [Nhận mã đơn hàng #UPS-xxxx & Email xác nhận]

─────────────────────────────────────────────────────────────────────────────────────────────

LUỒNG B2B (Dự án, Doanh nghiệp, Đấu thầu, Thiết bị trên 10kVA):
[Nhà thầu / Doanh nghiệp] ──> [Xem Trang Giải pháp hoặc Sản phẩm công suất lớn]
       │
       ▼
[Nhấn nút "Yêu Cầu Báo Giá Dự Án (RFQ)"] ──> [Mở Modal / Form B2B chuyên dụng]
       │
       ▼
[Điền: Công suất kVA, Hãng ưu tiên, Cấu hình N+1, Đính kèm File BOQ/Bản vẽ kỹ thuật]
       │
       ▼
[Hệ thống ghi nhận Lead B2B & Phân bổ ngay cho Kỹ sư giải pháp]
       │
       ▼
[Kỹ sư liên hệ trong 15-30 phút gửi: Báo giá chiết khấu, Sơ đồ đơn tuyến, Hồ sơ CO/CQ]
```

---

## 7. Kiến Trúc Phần Mềm & Chiến Lược Dữ Liệu

### 7.1. Kiến Trúc Thành Phần (ASCII Component Diagram)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   CLIENT LAYER (React 19)                              │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │ Navigation & TopBar (Brand, Faceted Search Modal, Mini-Cart Drawer, B2B CTA)      │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────┴─────────────────────────────────────────┐  │
│  │ VIEW ROUTER (Trang chủ / Danh mục / Chi tiết PDP / Calculator / RFQ / Giỏ hàng)  │  │
│  └────────────────────────────────────────┬─────────────────────────────────────────┘  │
│                                           │                                            │
│  ┌─────────────────────────┬──────────────┴──────────────┬──────────────────────────┐  │
│  │ Catalog & Filter Engine │ UPS Sizing Calculator State │ Cart & RFQ Lead Pipeline │  │
│  │ (Multi-criteria Facets: │ (Preset device Wattage,     │ (B2C Checkout, VietQR,   │  │
│  │  Brand, kVA, Tech, Phase│  Battery backup runtime,    │  B2B Project RFQ Quote   │  │
│  │  Specification Compare) │  VA/W Power Factor formula) │  Management, LocalStore) │  │
│  └─────────────────────────┴─────────────────────────────┴──────────────────────────┘  │
│                                           │                                            │
│  ┌────────────────────────────────────────┴─────────────────────────────────────────┐  │
│  │ Product Catalog Database (Realistic technical specs of APC, Eaton, Vertiv,       │  │
│  │ Santak, CyberPower with full electrical attributes: VA, W, V_in, V_out, ms, etc.) │  │
│  └──────────────────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 7.2. Cấu Trúc Dữ Liệu Thực Thể (TypeScript Interfaces)

- **`Product`**:
  - `id`: Chuỗi định danh duy nhất (ví dụ: `"apc-srt-3000xli"`).
  - `name`: Tên thương mại đầy đủ (ví dụ: `"Bộ lưu điện APC Smart-UPS SRT 3000VA 230V"`).
  - `model`: Mã model nhà sản xuất (`"SRT3000XLI"`).
  - `brand`: Thương hiệu (`'APC' | 'Eaton' | 'Vertiv' | 'Santak' | 'Delta' | 'CyberPower'`).
  - `topology`: Công nghệ (`'Offline' | 'Line-Interactive' | 'Online Double Conversion' | 'Modular'`).
  - `powerVA`: Công suất biểu kiến (VA) (ví dụ: `3000`).
  - `powerWatts`: Công suất thực (Watts) (ví dụ: `2700`).
  - `powerFactor`: Hệ số công suất (ví dụ: `0.9` hoặc `1.0`).
  - `phase`: Cấu hình pha (`'1:1' | '3:1' | '3:3'`).
  - `waveform`: Dạng sóng ra (`'Pure Sine Wave' | 'Stepped Sine Wave'`).
  - `transferTimeMs`: Thời gian chuyển mạch mili-giây (`0` cho Online, `4-8` cho Line-Interactive).
  - `price`: Giá niêm yết (số nguyên VND), hoặc `null` nếu là hàng dự án B2B cần báo giá.
  - `isB2BOnly`: Cờ đánh dấu sản phẩm chỉ bán qua kênh dự án B2B (từ 10kVA trở lên).
  - `batteryType`: Loại ắc quy (VRLA kín khí, Lithium-ion).
  - `expandableBattery`: Hỗ trợ tủ pin ngoài (EBM) hay không.
  - `datasheetUrl`: Đường dẫn tài liệu kỹ thuật demo.
  - `inStock`: Trạng thái kho hàng.
- **`CartItem`**: Sản phẩm, số lượng, tùy chọn xuất hóa đơn VAT.
- **`RFQLead`**: Họ tên, email, công ty, điện thoại, danh sách sản phẩm hoặc công suất kVA, file đính kèm, ghi chú.

### 7.3. Chiến Lược SEO & Structured Data (Tuân thủ `applet-seo`)
- Cấu trúc URL thân thiện: `/san-pham/ups-online-apc-srt3000xli`, `/danh-muc/ups-online-double-conversion`.
- Schema.org JSON-LD:
  - `Product` Schema cho từng sản phẩm: `name`, `model`, `offers`, `aggregateRating`, `brand`.
  - `Organization` Schema: Tên thương hiệu UPS PRO, thông tin liên hệ, lĩnh vực hoạt động.
  - `BreadcrumbList` Schema cho điều hướng phân cấp.
- OpenGraph & Twitter Cards: Ảnh preview chuyên nghiệp tỷ lệ 16:9 khi chia sẻ trên Zalo/Facebook/LinkedIn.

---

## 8. Kế Hoạch Triển Khai Tiếp Theo (Sau Khi Phê Duyệt Giai Đoạn 1)

1. **Giai đoạn 2 (Xây dựng giao diện ứng dụng)**:
   - Khởi tạo hệ thống Theme Tailwind CSS kỹ thuật và các Tokens màu sắc, typography `Plus Jakarta Sans`.
   - Sinh ảnh đại diện cho Hero banner và các giải pháp UPS công nghiệp bằng công cụ `generate_image`.
   - Lập trình Header Top Bar chuẩn 3-zone, Mega Menu danh mục, thanh tìm kiếm tức thời và Mini-Cart.
   - Xây dựng Homepage hoàn chỉnh theo wireframe (Hero, Danh mục công nghệ, Sản phẩm bán chạy, Showcase giải pháp).
2. **Giai đoạn 3 (Chức năng kỹ thuật & B2B/B2C)**:
   - Phát triển bộ lọc sản phẩm đa tiêu chí với khả năng so sánh 2–4 model đối đầu trực quan.
   - Lập trình PDP hoàn chỉnh với bảng thông số 15 chỉ số điện học và nút chuyển đổi Giỏ hàng/Báo giá tự động theo công suất.
   - Hoàn thiện Công cụ tính toán UPS Sizing Calculator Wizard 3 bước.
   - Tích hợp Giỏ hàng B2C (tính VAT, VietQR demo) và Form yêu cầu báo giá dự án B2B (RFQ Lead).
3. **Giai đoạn 4 (Kiểm thử, SEO & Tối ưu)**:
   - Kiểm thử hiển thị responsive hoàn hảo trên Desktop (1440px), Tablet và Mobile.
   - Xác thực schema JSON-LD, thẻ meta title/description và kiểm tra biên dịch không có lỗi.
