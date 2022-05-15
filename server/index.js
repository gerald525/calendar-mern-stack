const express = require("express")
require("dotenv").config();

// Server
const app = express();

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