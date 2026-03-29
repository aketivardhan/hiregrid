const mongoose = require("mongoose");
const Job = require("./models/Job");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI);

(async () => {

  await Job.deleteMany();

  const companies = [
    { name: "Google", logo: "images/google.png" },
    { name: "Amazon", logo: "images/amazon.png" },
    { name: "Microsoft", logo: "images/microsoft.png" },
    { name: "Adobe", logo: "images/adobe.png" },
    { name: "Cisco", logo: "images/cisco.png" },
    { name: "Oracle", logo: "images/oracle.png" },
    { name: "IBM", logo: "images/ibm.png" },
    { name: "Infosys", logo: "images/infosys.png" },
    { name: "TCS", logo: "images/tcs.png" },
    { name: "Zoho", logo: "images/zoho.png" }
  ];

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    "Data Analyst",
    "Software Engineer"
  ];

  const roleSkills = {
    "Frontend Developer": ["react","javascript","html","css"],
    "Backend Developer": ["node","express","mongodb","sql"],
    "Full Stack Developer": ["react","node","mongodb","javascript"],
    "DevOps Engineer": ["docker","kubernetes","aws","linux"],
    "Cloud Engineer": ["aws","azure","gcp","devops"],
    "Data Analyst": ["python","sql","excel","powerbi"],
    "Software Engineer": ["java","spring","git","linux"]
  };

  const jobs = [];

  for (let i = 0; i < 40; i++) {

    const company = companies[i % companies.length];
    const role = roles[i % roles.length];

    jobs.push({
      title: role,
      company: company.name,
      location: "India",
      salary: `${6 + i} LPA`,
      type: "Full-time",
      description: `Work as a ${role} at ${company.name}.`,
      logo: company.logo, // ✅ LOCAL PATH
      createdBy: "recruiter@gmail.com",
      skills: roleSkills[role],
      applicants: [],
      savedBy: []
    });

  }

  await Job.insertMany(jobs);

  console.log("✅ 40 jobs inserted with LOCAL logos");
  process.exit();

})();