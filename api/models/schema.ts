import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
export interface Name extends Document {
  firstName: string;
  lastName: string;
}

export interface Address extends Document {
  state: string;
  district: string;
}

export interface Idonor extends Document {
  name?: Name;
  address?: Address;
  mobileNumber: string;
  age: string;
  gender: string;
  dateOfCovid: string;
  dateOfCure: string;
  bloodGroup: string;
  isActive: boolean;
}

export const newUserSchema = new Schema({
  name: {
    type: {
      firstName: { type: String, lowercase: true, trim: true },
      lastName: { type: String, lowercase: true, trim: true },
    },
    required: true,
    trim: true,
  },
  address: {
    type: {
      state: { type: String, lowercase: true, trim: true, required: true },
      district: { type: String, lowercase: true, trim: true, required: true },
    },
    lowercase: true,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    validate: (value: string) => {
      return validator.isLength(value, { max: 10, min: 10 });
    },
  },

  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dateOfCovid: {
    type: String,
    required: true,
  },
  dateOfCure: {
    type: String,
    required: true,
  },
  bloodGroup: { type: String, required: true },
  isActive: { type: Boolean, default: true },
});

const schema = mongoose.model<Idonor>("mydonorr", newUserSchema);
export default schema;
