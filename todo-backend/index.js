const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoViewRoutes = require("./routers/todoViewRoutes");
const todoUpdateRoutes = require("./routers/todoUpdateRoutes");
const todoDeleteRoutes = require("./routers/todoDeleteRoutes");
const todoRoutes = require("./routers/todoRoutes");

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/todo-backend";

app.use(express.json());
app.use(cors());

async function startServer() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("연결 성공");

    app.get("/", (req, res) => {
      res.send("Todo backend is running");
    });

    app.use("/todos", todoViewRoutes);
    app.use("/todos", todoUpdateRoutes);
    app.use("/todos", todoDeleteRoutes);
    app.use("/todos", todoRoutes);

    app.listen(PORT, () => {
      console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
    });
  } catch (error) {
    console.error("MongoDB 연결 실패:", error.message);
    process.exit(1);
  }
}

startServer();
