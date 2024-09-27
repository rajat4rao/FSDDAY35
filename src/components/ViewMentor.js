import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api/api";

const ViewMentor = () => {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);

  useEffect(() => {
    const fetchMentors = async () => {
      const response = await axios.get(`${api.apiUrl}/mentors`);
      setMentors(response.data);
    };
    fetchMentors();
  }, []);

  const handleMentorChange = async (mentorId) => {
    if(mentorId !=='') {
      const response = await axios.get(`${api.apiUrl}/mentors/${mentorId}`);
      setSelectedMentor(response.data);
    } else {
      setSelectedMentor('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">
                View Mentor and Students
              </h2>
              <div className="form-group mb-3">
                <label>Mentor</label>
                <select
                  className="form-control"
                  onChange={(e) => handleMentorChange(e.target.value)}
                >
                  <option value="">Select Mentor</option>
                  {mentors.map((mentor) => (
                    <option key={mentor._id} value={mentor._id}>
                      {mentor.name}
                    </option>
                  ))}
                </select>
              </div>
              {selectedMentor && (
                <div className="mt-4">
                  <h3>{selectedMentor.name}</h3>
                  <ul className="list-group border">
                    {selectedMentor.students.map((student) => (
                      
                      <li key={student._id} className="list-group-item">
                        {student.name}
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

export default ViewMentor;
