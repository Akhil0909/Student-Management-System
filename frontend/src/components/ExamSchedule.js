import React, { useState } from 'react';
import axios from 'axios';

const ExamSchedule = () => {
  const [exam, setExam] = useState({
    exam_name: '',
    exam_date: ''
  });

  const handleChange = (e) => {
    setExam({ ...exam, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/exam-schedule', exam)
      .then(response => {
        alert(response.data.message);
        setExam({
          exam_name: '',
          exam_date: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the exam schedule!', error);
      });
  };

  return (
    <div>
      <h2>Add Exam Schedule</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="exam_name" value={exam.exam_name} placeholder="Exam Name" onChange={handleChange} required />
        <input type="date" name="exam_date" value={exam.exam_date} onChange={handleChange} required />
        <button type="submit">Add Schedule</button>
      </form>
    </div>
  );
};

export default ExamSchedule;
