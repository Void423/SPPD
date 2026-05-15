import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: true,
}))

app.get("/", (req, res) => {
    res.send("Hello World!");
})

export default app;