const express = require("express");
const router = express.Router();
const mysql = require("mysql");

// Set up database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "jcuser", // Your MySQL username
  password: "jmimgt", // Your MySQL password
  database: "jobcrest_db", // Your database name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

// Route to handle adding employees
router.post("/", (req, res) => {
  const employees = req.body; // Receive the employee data

  // Insert employees into the database
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
