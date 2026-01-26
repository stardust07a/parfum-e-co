const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// ✅ REGISTER (müşteri)
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res.status(400).json({ message: "Tüm alanlar zorunludur." });
    }

    const hashed = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, email, phone, password)
       VALUES (?, ?, ?, ?)`,
      [username, email, phone, hashed],
      function (err) {
        if (err) {
          // username/email UNIQUE olabilir
          return res.status(400).json({ message: err.message });
        }
        return res.json({ message: "REGISTER OK", id: this.lastID });
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

// ✅ LOGIN (admin + müşteri)
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // ✅ Admin sabit
  if (username === "admin" && password === "admin123") {
    return res.json({
      message: "LOGIN OK",
      role: "admin",
      user: { username: "admin" },
    });
  }

  // ✅ Customer
  db.get(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, user) => {
      if (err) return res.status(500).json({ message: err.message });
      if (!user) return res.status(401).json({ message: "Kullanıcı bulunamadı." });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: "Şifre yanlış." });

      return res.json({
        message: "LOGIN OK",
        role: "customer",
        user: { id: user.id, username: user.username, email: user.email },
      });
    }
  );
});

module.exports = router;
