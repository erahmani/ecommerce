const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path:`${__dirname}\\.env`});

const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Week 1 Setup" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
