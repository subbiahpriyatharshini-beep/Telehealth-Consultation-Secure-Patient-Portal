const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.static("public"));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// =====================
// MongoDB Connection
// =====================
mongoose.connect('mongodb://127.0.0.1:27017/telehealth')
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));
// =====================
// Models
// =====================
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
}));

const Appointment = mongoose.model('Appointment', new mongoose.Schema({
  patient: String,
  doctor: String,
  date: Date
}));

const Prescription = mongoose.model('Prescription', new mongoose.Schema({
  patient: String,
  doctor: String,
  medicine: String,
  notes: String
}));

// =====================
// Auth Middleware
// =====================
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET || 'secretkey', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// =====================
// Routes
// =====================

// Home
app.get('/', (req, res) => {
  res.send('🏥 Telehealth Server Running Successfully');
});

// Register
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword
    });

    await user.save();

    res.status(201).send('User registered successfully');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) return res.status(400).send('User not found');

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) return res.status(401).send('Invalid credentials');
  const path = require("path");

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});


  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '1h' }
  );

  res.json({ token });
});

// Appointments (Protected)
app.get('/api/appointments', authenticateToken, async (req, res) => {
  const appointments = await Appointment.find();
  res.json(appointments);
});

// Prescriptions (Protected)
app.get('/api/prescriptions', authenticateToken, async (req, res) => {
  const prescriptions = await Prescription.find();
  res.json(prescriptions);
});

// =====================
// Start Server
// =====================
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});