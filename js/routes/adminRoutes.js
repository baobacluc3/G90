const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/users', (req, res) => {
  const query = 'SELECT * FROM TaiKhoan ORDER BY ID_TaiKhoan DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy danh sách users:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.post('/users', (req, res) => {
  const { hoTen, gmail, dienThoai, matKhau, chucVu } = req.body;
  const query = 'INSERT INTO TaiKhoan (HoTen, Gmail, DienThoai, MatKhau, ID_ChucVu) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [hoTen, gmail, dienThoai, matKhau, chucVu || 3], (err, result) => {
    if (err) {
      console.error('Lỗi thêm user:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, message: 'Thêm user thành công', id: result.insertId });
  });
});


router.get('/categories', (req, res) => {
  const query = 'SELECT * FROM DonMucSP ORDER BY ID_DonMuc DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy danh mục:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.post('/categories', (req, res) => {
  const { name, description } = req.body;
  const query = 'INSERT INTO DonMucSP (TenDonMuc, MoTa, TrangThai) VALUES (?, ?, "Hoạt động")';
  db.query(query, [name, description], (err, result) => {
    if (err) {
      console.error('Lỗi thêm danh mục:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, message: 'Thêm danh mục thành công', id: result.insertId });
  });
});


router.get('/inventory', (req, res) => {
  const query = `
    SELECT sp.*, dm.TenDonMuc as categoryName 
    FROM SanPham sp 
    LEFT JOIN DonMucSP dm ON sp.ID_DonMuc = dm.ID_DonMuc 
    ORDER BY sp.ID_SanPham DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy sản phẩm:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.post('/inventory', (req, res) => {
  const { name, quantity, price, categoryId, description } = req.body;
  const query = 'INSERT INTO SanPham (TenSP, MoTa, Gia, SoLuong, ID_DonMuc, TrangThai) VALUES (?, ?, ?, ?, ?, "Còn hàng")';
  db.query(query, [name, description || '', price, quantity, categoryId || 1], (err, result) => {
    if (err) {
      console.error('Lỗi thêm sản phẩm:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, message: 'Thêm sản phẩm thành công', id: result.insertId });
  });
});


router.get('/appointments', (req, res) => {
  const query = 'SELECT * FROM LichSuDatLich ORDER BY ThoiGianDat DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy lịch hẹn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.post('/appointments', (req, res) => {
  const { hoTen, soDienThoai, dichVu, chiNhanh, tenThuCung, ngay, gio, ghiChu } = req.body;
  const query = `
    INSERT INTO LichSuDatLich (HoTen, SoDienThoai, DichVu, ChiNhanh, TenThuCung, Ngay, Gio, GhiChu) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [hoTen, soDienThoai, dichVu, chiNhanh, tenThuCung, ngay, gio, ghiChu], (err, result) => {
    if (err) {
      console.error('Lỗi thêm lịch hẹn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, message: 'Đặt lịch thành công', id: result.insertId });
  });
});


router.get('/orders', (req, res) => {
  const query = `
    SELECT dh.*, tk.HoTen as customerName 
    FROM DonHang dh 
    LEFT JOIN TaiKhoan tk ON dh.ID_TaiKhoan = tk.ID_TaiKhoan 
    ORDER BY dh.NgayDatHang DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy đơn hàng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.get('/payments', (req, res) => {
  const query = `
    SELECT hd.*, dh.ID_TaiKhoan 
    FROM HoaDon hd 
    LEFT JOIN DonHang dh ON hd.ID_DonHang = dh.ID_DonHang 
    ORDER BY hd.NgayLap DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy thanh toán:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.get('/reports', (req, res) => {
  const queries = {
    totalUsers: 'SELECT COUNT(*) as count FROM TaiKhoan WHERE ID_ChucVu = 3',
    totalOrders: 'SELECT COUNT(*) as count FROM DonHang',
    totalRevenue: 'SELECT SUM(TongTien) as total FROM DonHang WHERE TrangThai = "Hoàn thành"',
    totalAppointments: 'SELECT COUNT(*) as count FROM LichSuDatLich'
  };

  const results = {};
  let completed = 0;

  Object.keys(queries).forEach(key => {
    db.query(queries[key], (err, result) => {
      if (!err) {
        results[key] = result[0].count || result[0].total || 0;
      } else {
        results[key] = 0;
      }
      completed++;
      
      if (completed === Object.keys(queries).length) {
        res.json({ success: true, data: results });
      }
    });
  });
});


router.get('/customers', (req, res) => {
  const query = `
    SELECT tk.*, COUNT(dh.ID_DonHang) as totalOrders 
    FROM TaiKhoan tk 
    LEFT JOIN DonHang dh ON tk.ID_TaiKhoan = dh.ID_TaiKhoan 
    WHERE tk.ID_ChucVu = 3 
    GROUP BY tk.ID_TaiKhoan 
    ORDER BY tk.ID_TaiKhoan DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy khách hàng:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.get('/promos', (req, res) => {
  const query = 'SELECT * FROM KhuyenMai ORDER BY NgayBatDau DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Lỗi lấy khuyến mãi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, data: results });
  });
});


router.post('/promos', (req, res) => {
  const { name, description, discount, startDate, endDate } = req.body;
  const query = `
    INSERT INTO KhuyenMai (TenKM, MoTa, PhanTramGiam, NgayBatDau, NgayKetThuc, TrangThai) 
    VALUES (?, ?, ?, ?, ?, "Hoạt động")
  `;
  db.query(query, [name, description, discount, startDate, endDate], (err, result) => {
    if (err) {
      console.error('Lỗi thêm khuyến mãi:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }
    res.json({ success: true, message: 'Thêm khuyến mãi thành công', id: result.insertId });
  });
});

module.exports = router;