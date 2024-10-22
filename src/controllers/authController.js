const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];

const JWT_SECRET = process.env.JWT_SECRET;

exports.register = async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  users.push({ username, password: hashedPassword });

  res.json({ message: "User registered successfullt!" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const user = users.find((x) => x.username === username);

  if (!user) {
    return res.status(400).json({ message: "User not found!" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid password!" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful!", token });
  console.log();
};
