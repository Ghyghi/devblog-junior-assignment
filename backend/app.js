import "dotenv/config";
import express from "express";
import cors from "cors";
import { sequelize } from "./utils/db.js";
import authRouter from "./routes/authRouter.js";
import protectedRouter from "./routes/protectedRouter.js";


const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "localhost";

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api", protectedRouter);

// DB connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(PORT, HOST, () => {
      console.log(`Server running at http://${HOST}:${PORT}`);
    });
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

startServer();