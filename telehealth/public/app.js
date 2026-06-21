import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Appointments from "./components/Appointments";
import Prescriptions from "./components/Prescriptions";

function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return (
      <div>
        <h1>Telehealth Portal</h1>
        <Register setToken={setToken} />
        <Login setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to Telehealth</h1>
      <Appointments token={token} />
      <Prescriptions token={token} />
    </div>
  );
}

export default App;
