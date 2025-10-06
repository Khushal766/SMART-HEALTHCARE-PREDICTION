const express = require("express");
const { spawn } = require("child_process");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// Endpoint for prediction
app.post("/predict", (req, res) => {
  const { modelType, inputData } = req.body;

  const python = spawn("python", [
    path.join(__dirname, "predict.py"),
    modelType,
    ...inputData
  ]);

  let result = "";
  python.stdout.on("data", (data) => (result += data.toString()));
  python.stderr.on("data", (data) => console.error(data.toString()));

  python.on("close", () => {
    res.json({ result: result.trim() });
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
