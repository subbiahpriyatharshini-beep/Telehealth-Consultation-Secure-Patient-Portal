import React, { useEffect, useState } from "react";

export default function Appointments({ token }) {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/appointments", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setAppointments(data));
  }, [token]);

  return (
    <div>
      <h2>Appointments</h2>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            👤 {a.patient} <br />
            🩺 Dr. {a.doctor} <br />
            📅 {a.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
