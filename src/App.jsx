import React, { useEffect, useState } from 'react';
import db from './db';
import PatientForm from './PatientForm';
import SQLQuery from './SQLQuery';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';
import RotatingIcons from './RotatingIcons';

import homeImage from './home1.png';
import patientImage from './home.png';
import adminImage from './home2.png';

const channel = new BroadcastChannel("patient-updates");

export default function App() {
  const [view, setView] = useState("home");    // 'home', 'patient', 'admin'
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    try {
      const result = await db.query("SELECT * FROM patients;");
      setPatients(result.rows || []);
    } catch (err) {
      console.error("Failed to load patients:", err);
      setPatients([]);
    }
  };

  useEffect(() => {
    loadPatients();
    channel.onmessage = msg => {
      if (msg.data === "data-updated") loadPatients();
    };
    return () => channel.close();
  }, []);

  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader" />
          <button
            className="start-button"
            onClick={() => setLoading(false)}
          >
            Click to begin
          </button>
        </div>
      )}

      <div className={`app-root ${loading ? "hidden-under-loader" : ""}`}>
        {view === "home" && (
          <div className="home-panel">
            <div className="pane left-pane">
              <h2>Welcome!</h2>
              <p>Register or manage patients effortlessly.</p>
              <img
                className="welcome-image"
                src={homeImage}
                alt="Welcome illustration"
              />
            </div>
            <div className="pane right-pane">
              <h1>Patient Registration Portal</h1>
              <div className="landing-buttons">
                <button onClick={() => setView("patient")}>
                  <i className="fas fa-user" /> <span>Patient</span>
                </button>
                <button onClick={() => setView("admin")}>
                  <i className="fas fa-user-shield" /> <span>Admin</span>
                </button>
              </div>           
              <RotatingIcons setView={setView} />
            </div>
          </div>
        )}

        {view === "patient" && (
          <div className="home-panel">
            <div className="pane left-pane">
              <button
                className="back-button"
                onClick={() => setView("home")}
              >← Back</button>
              <h2>Patient Registration</h2>
              <img
                className="welcome-image"
                src={patientImage}
                alt="Patient illustration"
              />
            </div>
            <div className="pane right-pane">
              <PatientForm onUpdate={loadPatients} />
              <div className="table-container">
                <h3>Registered Patients</h3>
                {patients.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Condition</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patients.map(p => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.age}</td>
                          <td>{p.condition}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No patients registered yet.</p>
                )}
              </div>
            </div>
          </div>
        )}

        {view === "admin" && (
          <div className="home-panel">
            <div className="pane left-pane">
              <button
                className="back-button"
                onClick={() => setView("home")}
              >← Back</button>
              <h2>Admin Panel</h2>
              <img
                className="welcome-image"
                src={adminImage}
                alt="Admin illustration"
              />
            </div>
            <div className="pane right-pane">
              <SQLQuery />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
