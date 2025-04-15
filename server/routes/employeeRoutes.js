// server/routes/employeeRoutes.js
const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Set up database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "jcuser",
  password: "jmimgt",
  database: "jobcrest_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database (from employeeRoutes)!");
});

// ✅ GET all employees
router.get("/", (req, res) => {
  const query = "SELECT * FROM employees";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching employees:", err);
      return res.status(500).json({ message: "Failed to fetch employees" });
    }
    res.status(200).json(results);
  });
});

// ✅ POST to add employees
router.post("/", (req, res) => {
  const employees = req.body;

  const insertEmployee =
    "INSERT INTO employees (employeeNo, name, status, processCertification, supervisor, dateHired, tenure, plant, shift) VALUES ?";
  const values = employees.map((emp) => [
    emp.employeeNo,
    emp.name,
    emp.status,
    emp.processCertification,
    emp.supervisor,
    emp.dateHired,
    emp.tenure,
    emp.plant,
    emp.shift,
  ]);

  db.query(insertEmployee, [values], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to save employees" });
    }
    res.status(200).json({ message: "Employees saved successfully", result });
  });
});

module.exports = router;
