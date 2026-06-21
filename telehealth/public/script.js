const API = "http://localhost:5000/api/appointments";

async function book() {

  const patient = document.getElementById("patientName").value;
  const doctor = document.getElementById("doctorName").value;
  const date = document.getElementById("date").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ patient, doctor, date })
  });

  document.getElementById("msg").innerText =
    "Appointment Booked Successfully!";

  load();
}

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  let html = "";

  data.forEach(a => {
    html += `
      <li>
        👤 ${a.patient} <br>
        🩺 Dr. ${a.doctor} <br>
        📆 ${a.date}
      </li>
    `;
  });

  document.getElementById("list").innerHTML = html;
}

load();