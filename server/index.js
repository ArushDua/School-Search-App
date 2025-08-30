import express from "express";
import mysql from "mysql2";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use("/schoolImages", express.static(path.join(__dirname, "schoolImages")));

// MySQL connection (without database initially)
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if needed
  password: "" // change if needed
});

// Create DB if not exists
db.query("CREATE DATABASE IF NOT EXISTS school_app", (err) => {
  if (err) console.error(err);
  else {
    console.log("✅ Database ready");

    // Switch to that DB
    db.changeUser({ database: "school_app" }, (err) => {
      if (err) throw err;

      // Create table if not exists
      db.query(`CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        contact VARCHAR(15),
        image TEXT,
        email_id VARCHAR(100)
      )`, (err) => {
        if (err) console.error(err);
        else console.log("✅ Schools table ready");
      });
    });
  }
});

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "schoolImages/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Add School API
app.post("/addSchool", upload.single("image"), (req, res) => {
  const { name, address, city, state, contact, email_id } = req.body;
  const image = req.file ? req.file.filename : null;

  const sql = "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, address, city, state, contact, email_id, image], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ success: true, id: result.insertId });
  });
});

// Get Schools API
app.get("/schools", (req, res) => {
  db.query("SELECT * FROM schools", (err, rows) => {
    if (err) return res.json({ error: err });
    res.json(rows);
  });
});

// Run server
const PORT = 5001; // use 5001 to avoid conflicts
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
