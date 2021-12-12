import express from "express";
import morgan from "morgan";


const app = express();

if(process.env.NODE_ENV === "development"){
  app.use(morgan("dev"));
}

app.use(express.json());

app.get("/", (req, res)=>{
  res.send("Server Started Successfully!");
});

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running @ port ${PORT}`)
);