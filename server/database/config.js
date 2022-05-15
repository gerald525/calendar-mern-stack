const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN);
    console.log("MongoDB database connection established successfully!");
  } catch (error) {
    throw new Error("Database initialization error");
  }
};

module.exports = dbConnection;
