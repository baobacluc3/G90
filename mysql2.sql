CREATE DATABASE IF NOT EXISTS petcare;
USE petcare;

-- Table: ChucVu (Position)
CREATE TABLE ChucVu (
    ID_ChucVu INT AUTO_INCREMENT PRIMARY KEY,
    TenCV Varchar(100),
    MoTaCV Varchar(255),
    TrangThai Varchar(20)
);
INSERT INTO ChucVu (TenCV, MoTaCV, TrangThai) VALUES
('Admin', 'Quản trị hệ thống', 'Hoạt động'),
('Quản trị viên', 'Quản lý sản phẩm và đơn hàng', 'Hoạt động'),
('Nhân viên', 'Thực hiện công việc liên quan đến chăm sóc khách hàng', 'Hoạt động');

-- Table: TaiKhoan (Account)
CREATE TABLE TaiKhoan (
    ID_TaiKhoan INT AUTO_INCREMENT PRIMARY KEY,
    HoTen Varchar(50),
    NamSinh DateTime,
    GioiTinh INT(11),
    DiaChi Varchar(100),
    DienThoai Varchar(10),
    Gmail Varchar(50),
    ID_ChucVu INT,
    TenDangNhap Varchar(100),
    MatKhau Varchar(255),
    FOREIGN KEY (ID_ChucVu) REFERENCES ChucVu(ID_ChucVu)
);
INSERT INTO TaiKhoan (HoTen, NamSinh, GioiTinh, DiaChi, DienThoai, Gmail, ID_ChucVu, TenDangNhap, MatKhau) VALUES
('Nguyễn Văn Anh', '2000-01-01', 1, 'Đà Nẵng', '0987654321', 'nguyenvana@gmail.com', 1, 'admin', 'password123'),
('Trần Tuấn', '2001-05-05', 0, 'Tam Kỳ', '0901234567', 'trant@gmail.com', 2, 'admin2', 'password456');

-- Table: ThuCung (Pet)
CREATE TABLE ThuCung (
    ID_ThuCung INT AUTO_INCREMENT PRIMARY KEY,
    ID_TaiKhoan INT,
    TenThuCung Varchar(100),
    Loai Varchar(20),
    Giong Varchar(20),
    Tuoi INT(11),
    CanNang Decimal(10,2),
    TrangThai Varchar(20),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: CoSoThucY (Healthcare Facility)
CREATE TABLE CoSoThucY (
    ID_CoSoThucY INT AUTO_INCREMENT PRIMARY KEY,
    TenCoSo Varchar(50),
    DiaChi Varchar(100),
    MoTa Text,
    TrangThai Varchar(20)
);

-- Table: DichVuThucY (Healthcare Service)
CREATE TABLE DichVuThucY (
    ID_DichVu INT AUTO_INCREMENT PRIMARY KEY,
    TenDichVu Varchar(50),
    MoTa Text,
    Gia Decimal(10,2),
    TrangThai Varchar(20)
);

-- Table: DonMucSP (Product Category)
CREATE TABLE DonMucSP (
    ID_DonMuc INT AUTO_INCREMENT PRIMARY KEY,
    TenDonMuc Varchar(50),
    MoTa Text,
    TrangThai Varchar(20)
);

-- Table: SanPham (Product)
CREATE TABLE SanPham (
    ID_SanPham INT AUTO_INCREMENT PRIMARY KEY,
    TenSP Varchar(50),
    MoTa Text,
    Gia Decimal(10,2),
    SoLuong INT(11),
    ID_DonMuc INT,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_DonMuc) REFERENCES DonMucSP(ID_DonMuc)
);

-- Table: DonHang (Order)
CREATE TABLE DonHang (
    ID_DonHang INT AUTO_INCREMENT PRIMARY KEY,
    ID_TaiKhoan INT,
    NgayDatHang DateTime,
    TongTien Decimal(10,2),
    TrangThai Varchar(20),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: HoaDon (Invoice)
CREATE TABLE HoaDon (
    ID_HoaDon INT AUTO_INCREMENT PRIMARY KEY,
    ID_DonHang INT,
    NgayLap DateTime,
    TongTien Decimal(10,2),
    PTTT Varchar(50),
    TrangThai Varchar(20),
    FOREIGN KEY (ID_DonHang) REFERENCES DonHang(ID_DonHang)
);

-- Table: ThanhToanQR (QR Payment)
CREATE TABLE ThanhToanQR (
    ID_ThanhToanQR INT AUTO_INCREMENT PRIMARY KEY,
    ID_HoaDon INT,
    QRCode Varchar(255),
    NgayTao DateTime,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_HoaDon) REFERENCES HoaDon(ID_HoaDon)
);

-- Table: PhanHoi (Feedback)
CREATE TABLE PhanHoi (
    ID_PhanHoi INT AUTO_INCREMENT PRIMARY KEY,
    ID_TaiKhoan INT,
    NoiDung Varchar(100),
    NgayPhanHoi DateTime,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: LichSu (History)
CREATE TABLE LichSu (
    ID_LichSu INT AUTO_INCREMENT PRIMARY KEY,
    ID_ThuCung INT,
    ID_TaiKhoan INT,
    NgayNhanDon DateTime,
    DienGiai Text,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_ThuCung) REFERENCES ThuCung(ID_ThuCung),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: LichSuDatLich (Appointment)
CREATE TABLE LichSuDatLich (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    HoTen VARCHAR(100),
    SoDienThoai VARCHAR(20),
    DichVu VARCHAR(100),
    ChiNhanh VARCHAR(100),
    TenThuCung VARCHAR(100),
    Ngay DATE,
    Gio TIME,
    GhiChu TEXT,
    TrangThai VARCHAR(50) DEFAULT 'Chờ xác nhận',
    ThoiGianDat DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: TiemPhong (Vaccination)
CREATE TABLE TiemPhong (
    ID_TiemPhong INT AUTO_INCREMENT PRIMARY KEY,
    ID_ThuCung INT,
    NgayTiem DateTime,
    NgayNhac DateTime,
    ID_CoSo INT,
    MoTa Text,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_ThuCung) REFERENCES ThuCung(ID_ThuCung),
    FOREIGN KEY (ID_CoSo) REFERENCES CoSoThucY(ID_CoSoThucY)
);

-- Table: BaoCao (Report)
CREATE TABLE BaoCao (
    ID_BaoCao INT AUTO_INCREMENT PRIMARY KEY,
    LoaiBaoCao Varchar(50),
    NoiDung Text,
    NgayBaoCao DateTime,
    MoTa Text,
    TrangThai Varchar(20)
);

-- Table: PhanQuyen (Permission)
CREATE TABLE PhanQuyen (
    ID_PhanQuyen INT AUTO_INCREMENT PRIMARY KEY,
    ID_TaiKhoan INT,
    ChucNang Varchar(100),
    TrangThai Varchar(20),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: ChatBot
CREATE TABLE ChatBot (
    ID_ChatBot INT AUTO_INCREMENT PRIMARY KEY,
    ID_TaiKhoan INT,
    NoiDungNhan Text,
    NgayGui DateTime,
    DienGiai Varchar(100),
    TrangThai Varchar(20),
    FOREIGN KEY (ID_TaiKhoan) REFERENCES TaiKhoan(ID_TaiKhoan)
);

-- Table: KhoHang (Warehouse)
CREATE TABLE KhoHang (
    ID_KhoHang INT AUTO_INCREMENT PRIMARY KEY,
    SoLuongTon INT(11),
    TrangThai Varchar(20)
);

-- Table: CongViec (Task)
CREATE TABLE CongViec (
    ID_CongViec INT AUTO_INCREMENT PRIMARY KEY,
    NgayGiao DateTime,
    TrangThai Decimal(10,2),
    FOREIGN KEY (ID_CongViec) REFERENCES DonHang(ID_DonHang)
);

-- Table: ChiTietDonHang (Order Detail)
CREATE TABLE ChiTietDonHang (
    ID_ChiTiet INT AUTO_INCREMENT PRIMARY KEY,
    ID_DonHang INT,
    ID_SanPham INT,
    SoLuong INT(11),
    DonGia Decimal(10,2),
    NgayDatMua DateTime,
    NgayNhanDuKien DateTime,
    TrangThai Varchar(20),
    FOREIGN KEY (ID_DonHang) REFERENCES DonHang(ID_DonHang),
    FOREIGN KEY (ID_SanPham) REFERENCES SanPham(ID_SanPham)
);

-- Table: KhuyenMai (Promotion)
CREATE TABLE KhuyenMai (
    ID_KhuyenMai INT AUTO_INCREMENT PRIMARY KEY,
    TenKM Varchar(50),
    MoTa Text,
    PhanTramGiam INT(11),
    NgayBatDau DateTime,
    NgayKetThuc DateTime,
    TrangThai Varchar(20)
);

-- Chèn danh mục "Thức ăn hạt" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Thức ăn hạt');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Thức ăn hạt"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Thức ăn chó Ganador Adult Salmon & Rice', '', 29000, 100, 1, 'Còn hàng'),
('Hạt Pedigree Puppy vị gà và trứng 400g', '', 57000, 100, 1, 'Còn hàng'),
('Thức ăn hạt Dog On Red - Protein 33%', '', 392000, 100, 1, 'Còn hàng'),
('Thức ăn hạt Dog On GREEN 5kg - Protein 24%', '', 370000, 100, 1, 'Còn hàng'),
('Thức ăn hạt Hello Dog 400g dành cho chó', '', 25000, 100, 1, 'Còn hàng'),
('Hạt chó chó AIQ FORMULA Dog Food - 20kg ', '', 805000, 100, 1, 'Còn hàng'),
('Hạt Classic Pets Small Breed Dog Flavour - 2kg', '', 110000, 100, 1, 'Còn hàng'),
('Hạt ZOI Dog thức ăn chó chó 1kg', '', 35000, 100, 1, 'Còn hàng');

-- Chèn danh mục "Sữa cho chó" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Sữa cho chó');

-- Chèn sản phẩm vào bảng SanPham cho danh mục "Sữa cho chó"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Sữa Dr.Kyan Petsure Premium 400g dành cho chó mèo', 'Sữa Dr.Kyan Petsure Premium bổ sung dinh dưỡng cho chó mèo', 207000, 100, 2, 'Còn hàng'),
('Hạt Pedigree Puppy vị gà và trứng 400g', 'Hạt Pedigree Puppy với vị gà và trứng cho chó con', 57000, 100, 1, 'Còn hàng'),
('Sữa Petsure Premium cho chó mèo hộp 110g', 'Sữa Petsure Premium cho chó mèo, bổ sung dưỡng chất', 51000, 100, 2, 'Còn hàng'),
('Sữa Bột Colostrum chó mèo hộp 100g', 'Sữa bột Colostrum hỗ trợ miễn dịch cho chó mèo', 39000, 100, 2, 'Còn hàng'),
('Sữa Goat GOLD Plus cho chó mèo hộp 200g hàng Thái Lan', 'Sữa Goat GOLD Plus nhập khẩu từ Thái Lan cho chó mèo', 135000, 100, 2, 'Còn hàng'),
('Sữa Biomilk cho chó mèo bổ sung dưỡng chất gói 100g', 'Sữa Biomilk giúp bổ sung dưỡng chất cho chó mèo', 39000, 100, 2, 'Còn hàng'),
('Sữa bột AG-Science cho chó mèo hộp 250g', 'Sữa bột AG-Science giúp hỗ trợ dinh dưỡng cho chó mèo', 129000, 100, 2, 'Còn hàng'),
('Sữa Bột Goat Gold cho chó mèo hộp 200g hàng Thái Lan', 'Sữa bột Goat Gold nhập khẩu từ Thái Lan cho chó mèo', 129000, 100, 2, 'Còn hàng');


-- Chèn danh mục "Quần áo chó mèo" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Quần áo chó mèo');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Quần áo chó mèo"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Áo con vịt thời trang chó mèo', '', 35000, 100, 3, 'Còn hàng'),
('Váy dạ hội cao cấp', '', 250000, 100, 3, 'Còn hàng'),
('Áo 2 dây mỏng cho chó mèo', '', 392000, 100, 3, 'Còn hàng'),
('Áo ba lỗ họa tiết mùa hè', '', 50000, 100, 3, 'Còn hàng'),
('Váy hồng sakura cho chó mèo', '', 150000, 100, 3, 'Còn hàng'),
('Yếm cho chó mèo kèm dây dắt', '', 250000, 100, 3, 'Còn hàng'),
('Áo kẻ kèm túi đeo chéo gấu bear', '', 110000, 100, 3, 'Còn hàng'),
('Áo 2 dây caro Baby', '', 55000, 100, 3, 'Còn hàng');

-- Chèn danh mục "Đồ chơi chó mèo" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Đồ chơi chó mèo');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Đồ chơi chó mèo"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Cá dây bố', '', 17000, 100, 4, 'Còn hàng'),
('Khúc sương nhựa dẻo cao cấp', '', 40000, 100, 4, 'Còn hàng'),
('Chuột đuôi bi', '', 20000, 100, 4, 'Còn hàng'),
('Cá lông vũ', '', 17000, 100, 4, 'Còn hàng'),
('Vòng cổ trị ve Taobao pet dành cho chó mèo', '', 56000, 100, 4, 'Còn hàng'),
('Bảng 12 vòng cổ nhiều màu', '', 175000, 100, 4, 'Còn hàng'),
('Vòng cổ chuông ngọc Zichen', '', 40000, 100, 4, 'Còn hàng'),
('Vòng cổ đan tay nhiều chuông cho chó mèo', '', 25000, 100, 4, 'Còn hàng');

-- Chèn danh mục "Sữa tắm & Nước hoa" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Sữa tắm & Nước hoa');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Sữa tắm & Nước hoa"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Dầu tắm trị nấm cho mèo fungalmy 200ml', '', 186000, 100, 5, 'Còn hàng'),
('Tinh dầu dưỡng lông SH relax pet Essential 80ml', '', 140000, 100, 5, 'Còn hàng'),
('Nước hoa luxury Seduisant 250ml chó mèo', '', 200000, 100, 5, 'Còn hàng'),
('Nước hoa chó mèo SH cao cấp khử mù hiệu quả', '', 175000, 100, 5, 'Còn hàng'),
('Nước hoa chó mèo Bioline 207ml', '', 156000, 100, 5, 'Còn hàng');

-- Chèn danh mục "Bỉm & Tã & Khay vệ sinh" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Bỉm & Tã & Khay vệ sinh');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Bỉm & Tã & Khay vệ sinh"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Tấm lót chuồng loại tốt dành cho thú cưng', '', 29000, 100, 6, 'Còn hàng'),
('Bỉm quần đực Soft Pet-XS', '', 57000, 100, 6, 'Còn hàng'),
('Bỉm quần DOOg & CAAT', '', 32000, 100, 6, 'Còn hàng'),
('Tả Dono pad For pet', '', 37000, 100, 6, 'Còn hàng'),
('Tả than hoạt tính Dono size L', '', 25000, 100, 6, 'Còn hàng'),
('Kẹp dọn phân chó kiểu dáng bò sữa', '', 25000, 100, 6, 'Còn hàng'),
('Khay vệ sinh hình chữ nhật cao thành 53*45*15cm', '', 30000, 100, 6, 'Còn hàng');

-- Chèn danh mục "Chuồng & Nhà cho chó mèo" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Chuồng & Nhà cho chó mèo');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Chuồng & Nhà cho chó mèo"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Chuồng cho chó mèo bằng nhựa', '', 2000000, 100, 7, 'Còn hàng'),
('Quây cho chó bằng nhựa nan nhỏ', '', 1500000, 100, 7, 'Còn hàng'),
('Chuồng gỗ cho chó mèo 2 tầng', '', 3500000, 100, 7, 'Còn hàng'),
('Chuồng cho chó mèo bằng sắt sàn nhựa', '', 4000000, 100, 7, 'Còn hàng'),
('Chuồng sắt mạ kẽm cho chó mèo', '', 3000000, 100, 7, 'Còn hàng');

-- Chèn danh mục "Balo & Túi vận chuyển" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Balo & Túi vận chuyển');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Balo & Túi vận chuyển"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Balo vuông nhựa dẻo', '', 210000, 100, 8, 'Còn hàng'),
('Set túi lưới 3 size', '', 520000, 100, 8, 'Còn hàng'),
('Giỏ xách hàng không', '', 280000, 100, 8, 'Còn hàng'),
('Túi xách gấp gọn tiện lợi', '', 620000, 100, 8, 'Còn hàng'),
('Túi vải họa tiết size M', '', 150000, 100, 8, 'Còn hàng');

-- Chèn danh mục "Thuốc thú y" vào bảng DonMucSP
INSERT INTO DonMucSP (TenDonMuc) VALUES ('Thuốc thú y');
-- Chèn sản phẩm vào bảng SanPham cho danh mục "Thuốc thú y"
INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES
('Thuốc sát khuẩn Virkon', '', 21000, 100, 9, 'Còn hàng'),
('Thuốc sổ giun cho chó Endogard', '', 120000, 100, 9, 'Còn hàng'),
('Trị viêm tai và rận tai Dexxoryl 10g cho chó mèo', '', 280000, 100, 9, 'Còn hàng'),
('Alkin Omnix nhỏ mắt', '', 120000, 100, 9, 'Còn hàng'),
('Thuốc phòng và trị ve ,ghẻ bọ, chét NetGard', '', 156000, 100, 9, 'Còn hàng');



