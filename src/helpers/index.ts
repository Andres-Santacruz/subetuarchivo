import fileUpload, { UploadedFile } from "express-fileupload";

export const isValidateEmail = (email: string | undefined) => {
  if (!email) return false;
  const match = email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  return Boolean(match);
};

export const isValidCode = (code: string): boolean => {
  if(!code || code.length !== 6)  return false;

  const codeString = code.slice(0,2);
  const codeNumber = code.slice(2);

  const isText = /^[a-zA-Z]+(-[a-zA-Z]+)*$/.test(codeString);
  const isNumber = Number.isInteger(Number(codeNumber));

  return isText && isNumber;
};

export const isExpired = (dateExp: Date): boolean => {

  const last = dateExp.getTime();
  const now = Date.now();

  return now > last;
};

export const codeGenerator = (): string =>{
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const l1 = alphabet[Math.floor(Math.random() * alphabet.length)];
  const l2 = alphabet[Math.floor(Math.random() * alphabet.length)];

  const numbers = `${Math.floor(1000 + Math.random() * 9000)}`;

  return `${l1}${l2}${numbers}`
}

interface IResIsValidSize {
  isValidSize: boolean;
  messageValidSize: string;
};

export const isValidSizes = (files: fileUpload.FileArray, isAuth: boolean): IResIsValidSize => {

  let totalSize = 0;
  const keyArray = Object.keys(files);

  keyArray.forEach(key=>{
    totalSize += (files[key] as UploadedFile).size;
  });

  const size = totalSize/1024;

  console.log('sizes --->', size)

  if(size>5000 && !isAuth){
    return {
      isValidSize: false,
      messageValidSize: `sizes is no allowed, sign in to upload file o files sizes less than 5M`,
    };
  }
  if(size>10000){
    return {
      isValidSize: false,
      messageValidSize: `sizes is no allowed, ${size} > 10M`
    }
  }

  return {
    isValidSize: true,
    messageValidSize: ""
  }

}