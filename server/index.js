import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./Router/eventHandeler.js";
import "./other/Node-Corn.js";
import messages from "./Router/Whatsapp.js";
import guestroom from "./Router/GuestRoom.js";
import foodform from "./Router/Food.js";
import transportform from "./Router/Transport.js";
import endform from "./Router/endform.js";
import path from "path";
import { fileURLToPath } from 'url';
import signupRouter from "./Router/Signups.js";
import common from "./Router/Common.js";
import cors from "cors";
import mediaRouter from "./Router/Media.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use("/api/auth", signupRouter);
app.use("/api/sece", signupRouter); 

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

// ES module workaround for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/sece", signupRouter);
app.use("/api/event", Event);
app.use("/api/messages", messages);
app.use("/api/guestroom", guestroom);
app.use("/api/food", foodform);
app.use("/api/transportform", transportform);
app.use("/api/endform", endform);
app.use("/api/common", common);
app.use("/api/media", mediaRouter);

// Add a simple root route for testing
app.get("/", (req, res) => {
  res.json({ message: "Event Management Backend Server is running", timestamp: new Date().toISOString() });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});