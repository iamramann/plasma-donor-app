import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
export interface Name extends Document {
  firstName: string;
  lastName: string;
}

export interface Address extends Document {
  state: string;
  district: string;
  address: string;
}

export interface Idonor extends Document {
  name?: Name;
  address?: Address;
  mobile: string;
  age: string;
  gender: string;
  dateOfCovid: string;
  dateOfCure: string;
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
      resident: { type: String, lowercase: true, trim: true, required: true },
    },
    lowercase: true,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    validate: (value: string) => {
      return validator.isLength(value, { max: 10, min: 10 });
    },
  },

  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfCovid: {
    type: String,
    required: true,
  },
  dateOfCure: {
    type: String,
    required: true,
  },
});

const schema = mongoose.model<Idonor>("donors", newUserSchema);
export default schema;
