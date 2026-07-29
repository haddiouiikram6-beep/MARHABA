import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.js";
import "./models/user.model.js";
import logger from "./middlewares/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.json({ message: "Marhaba API is running" });
});

app.use("/api/auth", authRoutes);

app.use(errorHandler);

sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized 🙌");
    app.listen(PORT, () => {
      console.log(`🚀 SERVER RUNNING ON http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("DATABASE CONNECTION FAILED:", error);
  });