const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const sendEmail = require("../utils/emailSender");


// ================= GET ALL JOBS =================
router.get("/", async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});


// ================= CREATE JOB =================
router.post("/create", async (req, res) => {

  const {
    title,
    company,
    location,
    salary,
    type,
    description,
    logo,
    createdBy,
    skills
  } = req.body;

  const job = new Job({
    title,
    company,
    location,
    salary,
    type,
    description,
    logo,
    createdBy,
    skills
  });

  await job.save();

  res.json({ message: "Job created successfully" });

});


// ================= MY JOBS =================
router.get("/my-jobs/:email", async (req, res) => {

  const jobs = await Job.find({
    createdBy: req.params.email
  });

  res.json(jobs);

});


// ================= APPLY =================
router.post("/apply/:id", async (req, res) => {

  const { email } = req.body;

  const job = await Job.findById(req.params.id);

  const exists = job.applicants.find(a => a.email === email);

  if (!exists) {
    job.applicants.push({ email });
    await job.save();
  }

  try {
    await sendEmail(
      email,
      "Application Submitted",
      `You applied for ${job.title} at ${job.company}`
    );
  } catch (err) {
    console.log("Email error:", err.message);
  }

  res.json({ message: "Applied successfully" });

});


// ================= SAVE =================
router.post("/save/:id", async (req, res) => {

  const { email } = req.body;

  const job = await Job.findById(req.params.id);

  if (!job.savedBy.includes(email)) {
    job.savedBy.push(email);
    await job.save();
  }

  res.json({ message: "Saved successfully" });

});


// ================= SAVED JOBS =================
router.get("/saved/:email", async (req, res) => {

  const jobs = await Job.find({
    savedBy: req.params.email
  });

  res.json(jobs);

});


// ================= APPLIED JOBS =================
router.get("/applied/:email", async (req, res) => {

  const jobs = await Job.find({
    "applicants.email": req.params.email
  });

  res.json(jobs);

});


// ================= APPLICANTS =================
router.get("/applicants/:jobId", async (req, res) => {

  const job = await Job.findById(req.params.jobId);

  res.json(job.applicants);

});


// ================= AI SKILL MATCH =================
router.post("/ai-recommend", async (req, res) => {

  const { skills } = req.body;

  if (!skills || skills.length === 0) {
    return res.json([]);
  }

  const jobs = await Job.find();

  const recommended = jobs.filter(job => {

    if (!job.skills || job.skills.length === 0) return false;

    return job.skills.some(skill =>
      skills.includes(skill.toLowerCase())
    );
  });

  res.json(recommended);

});


module.exports = router;