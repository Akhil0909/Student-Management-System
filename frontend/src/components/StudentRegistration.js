import React, { useState } from 'react';
import axios from 'axios';

const StudentRegistration = () => {
  const [student, setStudent] = useState({
    student_id: '',
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    class_name: '',
    section: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/students', student)
      .then(response => {
        alert(response.data.message);
        // Clear form after successful submission
        setStudent({
          student_id: '',
          first_name: '',
          last_name: '',
          dob: '',
          gender: '',
          class_name: '',
          section: ''
        });
      })
      .catch(error => {
        console.error('There was an error registering the student!', error);
      });
  };

  return (
    <div>
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="student_id" value={student.student_id} placeholder="Student ID" onChange={handleChange} required />
        <input type="text" name="first_name" value={student.first_name} placeholder="First Name" onChange={handleChange} required />
        <input type="text" name="last_name" value={student.last_name} placeholder="Last Name" onChange={handleChange} required />
        <input type="date" name="dob" value={student.dob} onChange={handleChange} required />
        <select name="gender" value={student.gender} placeholder="Gender" onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="text" name="class_name" value={student.class_name} placeholder="Class" onChange={handleChange} required />
        <input type="text" name="section" value={student.section} placeholder="Section" onChange={handleChange} required />
        <button type="submit">Register Student</button>
      </form>
    </div>
  );
};

export default StudentRegistration;
