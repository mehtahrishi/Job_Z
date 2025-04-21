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

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: ["https://job-z.onrender.com"],
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

// API routes
app.use("/api/user", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);

// Deployment Setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (process.env.NODE_ENV === "production") {
  const dirpath = __dirname;
  app.use(express.static("./Frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirpath, "./Frontend/dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
