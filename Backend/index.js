import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load env variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS options (adjust the origin if needed)
const corsOptions = {
  origin: ["https://job-z.onrender.com"],
  credentials: true,
};
app.use(cors(corsOptions));

// Port setup
const PORT = process.env.PORT || 5001;

// Connect to DB before starting server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Failed to connect to MongoDB:", err);
  process.exit(1); // Exit app if DB connection fails
});

// API routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Static deployment (for frontend)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./Frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./Frontend/dist", "index.html"));
  });
}
