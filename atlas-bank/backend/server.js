const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./src/routes/auth");
const compteRoutes = require("./src/routes/comptes");
const transactionRoutes = require("./src/routes/transactions");
const adminRoutes = require("./src/routes/admin");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/comptes", compteRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "API Atlas Bank" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("API Atlas Bank sur le port " + PORT);
});
