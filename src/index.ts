import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";

import { dbConnect } from "./config/db";
import loginRoute from "./routes/loginUser";
import registerRoute from "./routes/registerUser";
import genOtpRoute from "./routes/genOTP";
import searchFileRoute from "./routes/serachFile";
import uploadFilesRoute from "./routes/uploadFiles";
import getFileRoute from "./routes/getFile";
import genLinkPasswordRoute from "./routes/getLinkResetPass";

import { PORT } from "./config/getVariables";
import resetPasswordRoute from "./routes/resetPassword";

const app = express();

app.use(cors());

app.use(express.json());

/* app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './temp'
})); */

app.use("/api", loginRoute);
app.use("/api", registerRoute);
app.use("/api", genOtpRoute);
app.use("/api", getFileRoute);
app.use("/api", searchFileRoute);
app.use("/api", genLinkPasswordRoute);
app.use("/api", resetPasswordRoute);

app.use(
  "/api",
  fileUpload({
    createParentPath: true,
  }),
  uploadFilesRoute
);

dbConnect().then(() => {
  console.log("db connected");
  app.listen(PORT, () => {
    console.log("server ready on port:", PORT);
  });
});
