const express = require("express");
const cors = require("cors");
const app = express();
const employeeRoutes = require("./routes/employeeRoutes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
