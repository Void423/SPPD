import express, { Application } from "express";
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  res.status(200).json({
    message: "Hello Worlds",
    status: "success",
  });
});
export default app;
