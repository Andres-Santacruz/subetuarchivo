import express from "express";
import cors from 'cors';
import fileUpload from 'express-fileupload';

import { dbConnect } from "./config/db";
import genOtpRoute from "./routes/genOTP";
import searchFileRoute from "./routes/serachFile";
import uploadFilesRoute from "./routes/uploadFiles";
import { PORT } from "./config/getVariables";

const app = express();

app.use(cors());

app.use(express.json());

/* app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp'
})); */

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
