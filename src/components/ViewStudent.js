import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

const ViewStudent = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const response = await axios.get(`${api.apiUrl}/students`);
      setStudents(response.data);
    };
    fetchStudents();
  }, []);

  const handleStudentChange = async (studentId) => {
    if(studentId !== '') {
    const response = await axios.get(`${api.apiUrl}/students/${studentId}`);
      setSelectedStudent(response.data);
    } else {
      setSelectedStudent('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
                View Student and Mentor History
              </h2>
              <div className="form-group mb-3">
                <label>Mentor</label>
                <select
                  className="form-control"
                  onChange={(e) => handleStudentChange(e.target.value)}
                >
                  <option value="">Select Student</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedStudent && (
                <div className="mt-4">
                  <h3>{selectedStudent.name}</h3>
                  <ul className="list-group border">
                    {selectedStudent.mentorhistory.map((mentor) => (
                      <li key={mentor.mentor._id} className="list-group-item d-flex justify-content-between">
                        <span>{mentor.mentor.name}</span>  
                        <span>{typeof mentor.date === 'string'
                          ? new Date(mentor.date).toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          })
                          : mentor.date ? mentor.date.toLocaleString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: true
                          }) : '-'}</span>          
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudent;
