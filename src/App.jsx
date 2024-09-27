import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import MentorForm from "./components/MentorForm";
import StudentForm from "./components/StudentForm";
import AssignStudent from "./components/AssignStudent";
import ViewMentor from "./components/ViewMentor";
import ChangeMentor from "./components/ChangeMentor";
import Home from "./components/Home";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-mentor" element={<MentorForm />} />
        <Route path="/create-student" element={<StudentForm />} />
        <Route path="/assign-student" element={<AssignStudent />} />
        <Route path="/view-mentor" element={<ViewMentor />} />
        <Route path="/change-mentor" element={<ChangeMentor />} />
      </Routes>
    </Router>
  );
};

export default App;
