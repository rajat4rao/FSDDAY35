const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mentorSchema = new mongoose.Schema({
  name: String,
  email: String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
});

const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
  mentorhistory: [{
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" },
    date: { type: Date, default: Date.now }
  }]
});

const Mentor = mongoose.model("Mentor", mentorSchema);
const Student = mongoose.model("Student", studentSchema);


//const uri = 'mongodb://localhost:27017/mentorstudent';
const uri = 'mongodb+srv://balprao:igUaFOlnYzPl0tFT@productiondb.cgth5.mongodb.net/?retryWrites=true&w=majority&appName=productiondb'

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/api/mentors", async (req, res) => {
  const mentor = new Mentor(req.body);
  await mentor.save();
  res.status(201).send(mentor);
});

app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.status(201).send(student);
});

app.post("/api/mentors/:mentorId/students", async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId);
  const students = await Student.find({ _id: { $in: req.body.studentIds } });
  students.forEach((student) => {
    student.mentor = mentor._id;
    student.mentorhistory.push({
      mentor: mentor._id, 
      date: Date.now() 
    });
    student.save();
  });
  mentor.students = mentor.students.concat(req.body.studentIds);
  await mentor.save();
  res.status(200).send(mentor);
});

app.put("/api/students/:studentId/mentor", async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  const oldMentor = await Mentor.findById(student.mentor);
  const newMentor = await Mentor.findById(req.body.mentorId);

  if (oldMentor) {
    oldMentor.students = oldMentor.students.filter(
      (s) => s.toString() !== student._id.toString()
    );
    await oldMentor.save();
  }

  newMentor.students.push(student._id);
  await newMentor.save();

  student.mentor = req.body.mentorId;
  student.mentorhistory.push({
    mentor: newMentor._id, 
    date: Date.now() 
  });
  await student.save();

  res.status(200).send(student);
});

app.get("/api/mentors", async (req, res) => {
  const mentors = await Mentor.find().populate("students");
  res.status(200).send(mentors);
});

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.status(200).send(students);
});

app.get("/api/mentors/:mentorId", async (req, res) => {
  const mentor = await Mentor.findById(req.params.mentorId).populate(
    "students"
  );
  res.status(200).send(mentor);
});

app.get("/api/students/:studentId", async (req, res) => {
  const student = await Student.findById(req.params.studentId).populate({
    path: "mentorhistory",
    populate: { path: "mentor" }, 
    sort: { date: -1 }
  });
  res.status(200).send(student);
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
