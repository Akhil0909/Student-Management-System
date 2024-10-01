import React, { useState } from 'react';
import axios from 'axios';

const Attendance = () => {
  const [attendance, setAttendance] = useState({
    student_id: '',
    date: '',
    status: 'Present'
  });

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/attendance', attendance)
      .then(response => {
        alert(response.data.message);
        setAttendance({
          student_id: '',
          date: '',
          status: 'Present'
        });
      })
      .catch(error => {
        console.error('There was an error marking attendance!', error);
      });
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="student_id" value={attendance.student_id} placeholder="Student ID" onChange={handleChange} required />
        <input type="date" name="date" value={attendance.date} onChange={handleChange} required />
        <select name="status" value={attendance.status} onChange={handleChange}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Mark Attendance</button>
      </form>
    </div>
  );
};

export default Attendance;
