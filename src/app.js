import express from "express";
import noteRouter from "./routes/note.route.js";
import authRouter from "./routes/auth.route.js";
const app = express();
app.use(express.json());

/* -------- Routes for Authentication --------- */
app.use("/api/auth", authRouter);

/* -------- Routes for Notes --------- */
app.use("/api", noteRouter);

export default app;
