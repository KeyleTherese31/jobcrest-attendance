const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
require("dotenv").config();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // This parses incoming JSON requests

// Routes
app.use("/api/employees", employeeRoutes);

// Set up database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "jcuser", // Your MySQL username
  password: "jmimgt", // Your MySQL password
  database: "jobcrest_db", // Your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Route to handle saving employees (post data from frontend)
app.post("/api/employees", (req, res) => {
  const employees = req.body; // Receive employee data from the frontend

  // Prepare SQL query for inserting multiple employees
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

  // Insert employees into the database
  db.query(insertEmployee, [values], (err, result) => {
    if (err) {
      console.error("Error inserting employees:", err);
      return res.status(500).json({ message: "Failed to save employees" });
    }
    res.status(200).json({ message: "Employees saved successfully", result });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
