const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan=require('morgan');
const authRoutes=require("./routes/authRoute");
const app=express();
dotenv.config();


//middleware
app.use(express.json());
app.use(morgan("dev"));
//routes
app.use('/api/vi/auth',authRoutes);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.Mongo_URL);
    console.log(`Connected to database at ${conn.connection.host}`);
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
  }
};



app.get("/", (req, res) => {
  res.send({
    message: "Welcome to e-commerce",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running successfully on port ${PORT}`);
});
