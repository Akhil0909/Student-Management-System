// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StudentRegistration from './components/StudentRegistration';
import Attendance from './components/Attendance';
import ExamSchedule from './components/ExamSchedule';
import ExamResults from './components/ExamResults';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Student Registration</Link></li>
            <li><Link to="/attendance">Attendance</Link></li>
            <li><Link to="/schedule">Exam Schedule</Link></li>
            <li><Link to="/results">Exam Results</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" element={<StudentRegistration />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/schedule" element={<ExamSchedule />} />
          <Route path="/results" element={<ExamResults />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => (
  <div className="home">
    <h2>Welcome to the Student Management System</h2>
    <p>Select an option from the menu to get started.</p>
  </div>
);


export default App;
