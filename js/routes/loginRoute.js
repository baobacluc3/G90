const express = require('express');
const router = express.Router();
const db = require('../db'); // Kết nối MySQL

// API POST /api/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Thiếu thông tin' });
  }

  const query = 'SELECT * FROM taikhoan WHERE gmail = ? AND matkhau = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Lỗi truy vấn:', err);
      return res.status(500).json({ success: false, message: 'Lỗi máy chủ' });
    }

    if (results.length > 0) {
      return res.json({ success: true, user: results[0] });
    } else {
      return res.json({ success: false, message: 'Sai email hoặc mật khẩu' });
    }
  });
});

module.exports = router;
