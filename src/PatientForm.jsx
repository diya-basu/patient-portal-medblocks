import React, { useState } from 'react';
import db from './db';

const channel = new BroadcastChannel("patient-updates");

export default function PatientForm({ onUpdate }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    age: '',
    condition: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmission = async (e) => {
    e.preventDefault();

    try {
      await db.query(
        `INSERT INTO patients (id, name, age, condition) VALUES ($1, $2, $3, $4);`,
        [formData.id, formData.name, formData.age, formData.condition]
      );

      channel.postMessage("data-updated");
      onUpdate();
      setFormData({ id: '', name: '', age: '', condition: '' });
    } catch (error) {
      console.error("Error inserting patient:", error);
    }
  };

  return (
    <form className="patient-form" onSubmit={handleFormSubmission}>
      <h4 style={{ width: '100%', textAlign: 'left', alignSelf: 'flex-start', marginBottom: '1rem' }}>Fill the form to register</h4>
      <input name="id" value={formData.id} onChange={handleChange} placeholder="Patient ID" required />
      <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
      <input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" min="1" max="99" required />
      <input name="condition" value={formData.condition} onChange={handleChange} placeholder="Condition" required />
      <button type="submit">Submit</button>
    </form>
  );
}
