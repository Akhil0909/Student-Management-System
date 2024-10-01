import React, { useState } from 'react';
import axios from 'axios';

const ExamResults = () => {
  const [result, setResult] = useState({
    student_id: '',
    exam_name: '',
    score: ''
  });

  const handleChange = (e) => {
    setResult({ ...result, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:5000/exam-results', result)
      .then(response => {
        alert(response.data.message);
        setResult({
          student_id: '',
          exam_name: '',
          score: ''
        });
      })
      .catch(error => {
        console.error('There was an error adding the exam result!', error);
      });
  };

  return (
    <div>
      <h2>Add Exam Result</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="student_id" value={result.student_id} placeholder="Student ID" onChange={handleChange} required />
        <input type="text" name="exam_name" value={result.exam_name} placeholder="Exam Name" onChange={handleChange} required />
        <input type="number" name="score" value={result.score} placeholder="Score" onChange={handleChange} required />
        <button type="submit">Add Result</button>
      </form>
    </div>
  );
};

export default ExamResults;
