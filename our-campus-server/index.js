import path from "path";
import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cron from "node-cron";
import cors from "cors";
// import {Server} from "socket.io";

import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import uploadRoutes from "./routes/uploadRoute.js";
import messages from "./routes/messages.js";
import {refreshUsers} from "./controllers/userController.js";

dotenv.config();

connectDB();

cron.schedule('0 0 * * *', ()=>{
  refreshUsers();
  console.log("Refreshed Users")
})

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(cors());

app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/posts", postRoutes);
app.use("/home", homeRoutes);
app.use("/api/upload", uploadRoutes)
app.use("/api/messages", messages)

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/our-campus-client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "our-campus-client", "build", "index.html")
    )
  );
} else {
  app.get("/", (req, res) => {
    res.send("Server Started Successfully!");
  });
}
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  await refreshUsers();
  console.log(`Server running @ port ${PORT}`)
});

// const io = new Server().listen(server);

// app.use((req, res, next)=>{
//   req.io = io;
//   next();
// })