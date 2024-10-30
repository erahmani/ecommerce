const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose');

dotenv.config({path:`${__dirname}\\.env`});

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=> console.log('Connected to MongoDB'))
.catch(err=>console.error('Could not connect to MongoDB', err));

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Week 1 Setup" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
