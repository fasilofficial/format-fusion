const express = require("express");
const cors = require("cors");
const path = require("path");
const conversionRoutes = require("./routes/conversionRoutes");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// Routes
app.use("/api/convert", conversionRoutes);

// Serve frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

// Start server
app.listen(port, () => {
  console.log(`FormatFusion service running at http://localhost:${port}`);
});
