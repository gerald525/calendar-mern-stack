const express = require("express");
require("dotenv").config();
const dbConnection = require("./database/config");
const cors = require("cors");
const path = require("path");

// Server
const app = express();

// Database
dbConnection();

// Cors
app.use(cors());

// Public path
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events.js"));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

// Listening PORT
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`SERVER LISTENING ON PORT ${port}`);
});
