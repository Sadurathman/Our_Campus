import path from "path";
import express from "express";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use("/users", userRoutes);

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

app.listen(PORT, console.log(`Server running @ port ${PORT}`));
