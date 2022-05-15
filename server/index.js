const express = require("express");
const dbConnection = require("./database/config");
require("dotenv").config();

// Server
const app = express();

// Database
dbConnection();

// Public path
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"))

// Listening PORT 
const port = process.env.PORT || 5000;
app.listen(port, () => { 
  console.log(`SERVER LISTENING ON PORT ${port}`)
})