import React, { useEffect, useState } from "react";

export default function Prescriptions({ token }) {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/prescriptions", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setPrescriptions(data));
  }, [token]);

  return (
    <div>
      <h2>Prescriptions</h2>
      <ul>
        {prescriptions.map(p => (
          <li key={p.id}>
            💊 {p.medicine} <br />
            📝 {p.notes} <br />
            👨‍⚕️ Dr. {p.doctor}
          </li>
        ))}
      </ul>
    </div>
  );
}
