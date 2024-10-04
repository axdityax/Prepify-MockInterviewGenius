import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import aptitudeRouter from "./routes/aptitudeRoute.js";
import coreRouter from "./routes/coreRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();
const port = process.env.PORT || 4000;

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// middleware
app.use(express.json());
app.use(cors());

// db connection
connectDB();

// api endpoints
app.use("/api/aptitude", aptitudeRouter);
app.use("/api/user", userRouter);
app.use("/api/core", coreRouter);

app.get("/", (req, res) => {
	res.send("API Working");
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
