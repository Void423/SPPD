import { toNodeHandler } from "better-auth/node";
import express, { Application } from "express";
import { auth } from "./lib/auth";
import cors from "cors";
import router from "./route/index.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

// ROUTE
app.use("/api", router);
app.get("/", (req, res) => {
  res.send("Hello World");
});
export default app;
