from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Configure MySQL connection
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:Luffy%400505@localhost/student_management'  # Update with your MySQL credentials
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Database Models

class Student(db.Model):
    __tablename__ = 'students'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), unique=True, nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    dob = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    class_name = db.Column(db.String(50), nullable=False)
    section = db.Column(db.String(50), nullable=False)

class Attendance(db.Model):
    __tablename__ = 'attendance'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('students.student_id'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(10), nullable=False)  # Present or Absent

class ExamSchedule(db.Model):
    __tablename__ = 'exam_schedule'
    id = db.Column(db.Integer, primary_key=True)
    exam_name = db.Column(db.String(100), nullable=False)
    exam_date = db.Column(db.Date, nullable=False)

class ExamResult(db.Model):
    __tablename__ = 'exam_results'
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.String(50), db.ForeignKey('students.student_id'), nullable=False)
    exam_name = db.Column(db.String(100), nullable=False)
    score = db.Column(db.Float, nullable=False)

# Routes

@app.route('/')
def index():
    return "Welcome to the Student Management System API"

# Student Registration Route
@app.route('/students', methods=['POST'])
def register_student():
    data = request.json
    print(data)
    try:
        new_student = Student(
            student_id=data['student_id'],
            first_name=data['first_name'],
            last_name=data['last_name'],
            dob=datetime.strptime(data['dob'], '%Y-%m-%d'),
            gender=data['gender'],
            class_name=data['class_name'],
            section=data['section']
        )
        db.session.add(new_student)
        db.session.commit()
        return jsonify({'message': 'Student registered successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error registering student: {str(e)}'}), 500

# Attendance Route
@app.route('/attendance', methods=['POST'])
def mark_attendance():
    data = request.json
    try:
        new_attendance = Attendance(
            student_id=data['student_id'],
            date=datetime.strptime(data['date'], '%Y-%m-%d'),
            status=data['status']
        )
        db.session.add(new_attendance)
        db.session.commit()
        return jsonify({'message': 'Attendance marked successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error marking attendance: {str(e)}'}), 500

# Exam Schedule Route
@app.route('/exam-schedule', methods=['POST'])
def add_exam_schedule():
    data = request.json
    try:
        new_exam = ExamSchedule(
            exam_name=data['exam_name'],
            exam_date=datetime.strptime(data['exam_date'], '%Y-%m-%d')
        )
        db.session.add(new_exam)
        db.session.commit()
        return jsonify({'message': 'Exam schedule added successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding exam schedule: {str(e)}'}), 500

# Exam Result Route
@app.route('/exam-results', methods=['POST'])
def add_exam_result():
    data = request.json
    try:
        new_result = ExamResult(
            student_id=data['student_id'],
            exam_name=data['exam_name'],
            score=float(data['score'])
        )
        db.session.add(new_result)
        db.session.commit()
        return jsonify({'message': 'Exam result added successfully!'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error adding exam result: {str(e)}'}), 500

# Get All Students Route (Optional for Testing)
@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    result = []
    for student in students:
        student_data = {
            'student_id': student.student_id,
            'first_name': student.first_name,
            'last_name': student.last_name,
            'dob': student.dob.strftime('%Y-%m-%d'),
            'gender': student.gender,
            'class_name': student.class_name,
            'section': student.section
        }
        result.append(student_data)
    return jsonify(result), 200

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
