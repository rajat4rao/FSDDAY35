import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

const ChangeMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMentor, setSelectedMentor] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const mentorResponse = await axios.get(`${api.apiUrl}/mentors`);
      const studentResponse = await axios.get(`${api.apiUrl}/students`);
      setMentors(mentorResponse.data);
      setStudents(studentResponse.data.filter((student) => student.mentor));
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${api.apiUrl}/students/${selectedStudent}/mentor`, {
        mentorId: selectedMentor,
      });
      alert("Mentor changed successfully");
    } catch (error) {
      console.error("Error changing mentor:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
                Change Mentor for Student
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label>Student</label>
                  <select
                    className="form-control"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    required
                  >
                    <option value="">Select Student</option>
                    {students.map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-3">
                  <label>Mentor</label>
                  <select
                    className="form-control"
                    value={selectedMentor}
                    onChange={(e) => setSelectedMentor(e.target.value)}
                    required
                  >
                    <option value="">Select Mentor</option>
                    {mentors.map((mentor) => (
                      <option key={mentor._id} value={mentor._id}>
                        {mentor.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-primary">
                  Change Mentor
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeMentor;
