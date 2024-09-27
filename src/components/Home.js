import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="container mt-5">
  <div className="jumbotron text-center">
    <h1 className="display-9">Mentor Student Management</h1>
    <hr className="my-4" />
    <ul className="nav justify-content-center">
      <li className="nav-item">
        <Link className="nav-link" to="/create-mentor">
          Create Mentor
          <small className="d-block text-muted">Add new mentors to the system.</small>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/create-student">
          Create Student
          <small className="d-block text-muted">Add new students to the system.</small>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/assign-student">
          Assign Student
          <small className="d-block text-muted">Assign students to mentors.</small>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/view-mentor">
          View Mentor
          <small className="d-block text-muted">View information about existing mentors.</small>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/change-mentor">
          Change Mentor
          <small className="d-block text-muted">Modify mentor assignments for students.</small>
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/view-student">
          View Student
          <small className="d-block text-muted">View information about existing students.</small>
        </Link>
      </li>
    </ul>
  </div>
</div>
  );
};

export default Home;
