const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all employees
router.get("/", (req, res) => {
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Add new employee
router.post("/", (req, res) => {
  const employee = req.body;
  db.query("INSERT INTO employees SET ?", employee, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee added", id: result.insertId });
  });
});

// Update employee
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  db.query("UPDATE employees SET ? WHERE id = ?", [updatedData, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee updated" });
  });
});

// Delete employee
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Employee deleted" });
  });
});

module.exports = router;
