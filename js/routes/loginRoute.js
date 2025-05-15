const express = require('express');
const router = express.Router();
const db = require('../db');

// POST /api/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Thiếu email hoặc password' });
  }

  const query = 'SELECT * FROM TaiKhoan WHERE Gmail = ? AND MatKhau = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error('Lỗi login:', err);
      return res.status(500).json({ success: false, message: 'Lỗi database' });
    }

    if (results.length > 0) {
      const user = results[0];
      const role = user.ID_ChucVu === 1 ? 'admin' : 'user';
      return res.json({ 
        success: true, 
        user: { ...user, role } 
      });
    } else {
      return res.json({ success: false, message: 'Sai email hoặc password' });
    }
  });
});

module.exports = router;