import {Schema, model} from 'mongoose';

const emailUsedSchema = new Schema({
  email: {
    type: String,
    unique: true
  }
}, {
  timestamps: true,
  versionKey: false
});

export const EmailUsedModel =  model('emailUsedModel', emailUsedSchema);
