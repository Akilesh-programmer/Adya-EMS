import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import "./other/Node-Corn.js";
import path from "path";
import { fileURLToPath } from 'url';
import cors from "cors";


dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

const mongoURI = process.env.MONGODB_URI;
console.log("MongoDB URI:", mongoURI);
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  res.json({ message: "Event Management Backend Server is running", timestamp: new Date().toISOString() });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});