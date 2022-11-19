import express from "express";
import * as dotevn from "dotenv";
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { dbConnect } from "./config/db";
import genOtpRoute from "./routes/genOTP";
import searchFileRoute from "./routes/serachFile";
import uploadFilesRoute from "./routes/uploadFiles";

dotevn.config();
const app = express();

app.use(cors());

app.use(express.json());

/* app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp'
})); */

const PORT = process.env.PORT || 4000;

app.get("/", (_req, res) => {
  res.send("hello work");
});

app.use("/api", genOtpRoute);
app.use("/api", searchFileRoute);
app.use(
  "/api",
  fileUpload({
    useTempFiles: true,
    safeFileNames: true,
    tempFileDir: "./temp",
    preserveExtension: true,
  }),
  uploadFilesRoute
);

dbConnect().then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("server ready on port:", PORT);
  });
});
