import { Schema, model/*  , Model, Document, FlatRecord */ } from "mongoose";
import {compareSync, hashSync, genSaltSync} from 'bcryptjs';

/* interface IFile extends Document {
  code: string;
  email: string;
  urls: string[];
  protected: boolean;
  password: string | null;
  expiration: Date;
}

interface IFileMethods {
  comparePassword(this: Document<unknown, any, FlatRecord<{
        urls: string[];
        protected: boolean;
        expiration: Date;
        code?: string | undefined; 
        email?: string | undefined;
        password?: string | undefined;
    }>> & FlatRecord<{}> & {}, password: string): boolean;
}

type FileModel = Model<IFile, {}, IFileMethods> */

// const fileSchema = new Schema<IFile, FileModel, IFileMethods>(
const fileSchema = new Schema(
  {
    code: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
    },
    urls: {
      type: [String],
      require: true,
    },
    protected: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
    },
    expiration: {
      type: Date,
      default: new Date(Date.now() + 1000 * 60 * 60 * 24),
    },
    public_id: {
      type: [String],
      require: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    methods: {
      comparePassword: function (password: string): boolean {
        if (!this.password) return false;
        return compareSync(password, this.password);
      },
    },
  }
);

fileSchema.methods.toJSON = function(){
  let file = this.toObject();
  delete file.password;
  return file;
}

fileSchema.pre('save', async function (next){
  const file = this;

  if(!file.isModified("password") || !file.password) return next();

  const salt = genSaltSync(10);
  const hashedPassword = hashSync(file.password, salt);
  file.password = hashedPassword;

  next();

});

export const FileModel = model("file", fileSchema);
