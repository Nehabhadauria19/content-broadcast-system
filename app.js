const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
const authRoutes = require("./src/routes/authRoutes");
const contentRoutes = require("./src/routes/contentRoutes");
const approvalRoutes = require("./src/routes/approvalRoutes");
const publicRoutes = require("./src/routes/publicRoutes");



app.use(cors());

app.use("/auth", authRoutes);
app.use("/content", contentRoutes);
app.use("/approval", approvalRoutes);
app.use("/content", publicRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

module.exports = app;