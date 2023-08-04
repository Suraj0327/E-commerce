const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URL);
    console.log(`Connected to database at ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
  }
};

module.exports = { connectDB };
