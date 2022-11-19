import { Router } from "express";
import { uploadFiles } from "../services/uploadFilesServices";
// import {fileModel} from "../models/file";

const router = Router();

router.post('/upload', async (req, res)=>{
  const {files} = req
  if(!files) return res.status(400).json({not: "NOT FILE"})
  // console.log('files', files);
  await uploadFiles(files);
  return res.json({hi: 'hi'})
})

export default router;
