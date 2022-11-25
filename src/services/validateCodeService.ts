import { codeGenerator } from "../helpers";
import { FileModel } from "../models/file";

export const validateCode = async (): Promise<string> => {
  let init = true;

  let code = codeGenerator();

  while (init) {
    const res = await FileModel.findOne({ code });
    if (!res) {
      init = false;
      } else {
      code = codeGenerator();
    }
  }
  console.log('code -->', code)
  return code;
}
