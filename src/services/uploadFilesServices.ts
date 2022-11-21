import fileUpload, { UploadedFile } from "express-fileupload";
import cloudinary from "../config/cloudinary";

export const uploadFiles = async (files: fileUpload.FileArray) => {
  const resArr: string[] = [];
  const keyArray = Object.keys(files);

  console.log('fileee', files)

  for (let key of keyArray) {
    const path = (files[key] as UploadedFile).tempFilePath;
    try {
      const resCloud = await cloudinary.uploader.upload(path, {
        resource_type: "raw",
        folder: "subetuarchivo",
      });
      resArr.concat(resCloud.url);
    } catch (error: any) {
      console.log("ERRORRRRR-->", error);
      console.log("my err -->", error.message);
    }
  }

  return resArr;
};
