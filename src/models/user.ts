import {Schema, model} from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 1024,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  emailVerify: {
    type: Boolean,
    default: false
  }
});

userSchema.methods.toJSON = function () {
  let file = this.toObject();
  delete file.password;
  return file;
};

export const UserModel = model("User", userSchema);
