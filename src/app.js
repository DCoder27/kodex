import express from "express";
import cookieParser from "cookie-parser";
import noteRouter from "./routes/note.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());
/* -------- Routes for Authentication --------- */
app.use("/api/auth", authRouter);

/* -------- Routes for Notes --------- */
app.use("/api", noteRouter);

export default app;
