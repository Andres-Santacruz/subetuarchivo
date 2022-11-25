import fileUpload, { UploadedFile } from "express-fileupload";
import cloudinary from "../config/cloudinary";

export const uploadFiles = async (files: fileUpload.FileArray) => {
  const resArr: string[] = [];
  const keyArray = Object.keys(files);

  console.log('fileee', files)


  for (let key of keyArray) {
    const oneFile = files[key] as UploadedFile;
    const path = `./temp/${Date.now()}__${oneFile.name}`;
    await oneFile.mv(path);
    // const ext = oneFile.name.split('.').at(-1);
    try {
      const resCloud = await cloudinary.uploader.upload(path, {
        resource_type: "raw",
        folder: "subetuarchivo",
        use_filename: true
      });
      console.log('resCloud -->', resCloud)
      resArr.push(resCloud.secure_url);
      console.log('resArr ANTESSSSS', resArr)
    } catch (error: any) {
      console.log("my err cloudi -->", error.message);
      return []
    }
  }
  console.log('resArr', resArr)
  return resArr;
};
