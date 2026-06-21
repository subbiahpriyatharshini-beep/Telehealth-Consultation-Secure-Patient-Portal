const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "telehealth")));

let appointments = [];

// Get appointments
app.get("/api/appointments", (req, res) => {
    res.json(appointments);
});

// Add appointment
app.post("/api/appointments", (req, res) => {
    appointments.push(req.body);

    res.json({
        message: "Appointment booked successfully!"
    });
});

// Open UI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "telehealth", "index.html"));
});

app.listen(5000, () => {
    console.log("Server running on Port 5000");
});