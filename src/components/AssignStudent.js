import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

const AssignStudent = () => {
  const [mentors, setMentors] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState("");
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const mentorResponse = await axios.get(`${api.apiUrl}/mentors`);
      const studentResponse = await axios.get(`${api.apiUrl}/students`);
      setMentors(mentorResponse.data);
      setStudents(studentResponse.data.filter((student) => !student.mentor));
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${api.apiUrl}/mentors/${selectedMentor}/students`, {
        studentIds: selectedStudents,
      });
      alert("Students assigned successfully");
    } catch (error) {
      console.error("Error assigning students:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card ">
            <div className="card-body">
              <h2 className="card-title text-center">
                Assign Student to Mentor
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="student">Select Student</label>
                  <select
                    className="form-control"
                    id="student"
                    value={selectedStudents}
                    onChange={(e) => setSelectedStudents(e.target.value)}
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
                  <label htmlFor="mentor">Select Mentor</label>
                  <select
                    className="form-control"
                    id="mentor"
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
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-block">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignStudent;
