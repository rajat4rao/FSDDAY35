import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/create-mentor">
              Create Mentor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/create-student">
              Create Student
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/assign-student">
              Assign Student
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/view-mentor">
              View Mentor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/change-mentor">
              Change Mentor
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/view-student">
              View Student
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navbar;
