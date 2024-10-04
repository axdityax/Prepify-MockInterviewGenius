import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

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

app.get("/", (req, res) => {
	res.send("API Working");
});

// Start server
app.listen(port, () => {
	console.log(`Server is running on port http://localhost:${port}`);
});
