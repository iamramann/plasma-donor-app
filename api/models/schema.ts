import mongoose from "mongoose";
import validator from "validator";
const newUserSchema = new mongoose.Schema({
  name: {
    type: {
      firstName: { type: String, lowercase: true, trim: true },
      lastName: { type: String, lowercase: true, trim: true },
    },
    required: true,
    trim: true,
  },

  Address: {
    type: {
      state: { type: String, lowercase: true, trim: true, required: true },
      district: { type: String, lowercase: true, trim: true, required: true },
      resident: { type: String, lowercase: true, trim: true, required: true },
    },
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: (value: string) => {
      return validator.isEmail(value);
    },
  },

  mobile: {
    type: String,
    required: true,
    validate: (value: string) => {
      return validator.isLength(value, { max: 10, min: 10 });
    },
  },

  dateOfCovid: {
    type: Date,
    required: true,
  },
  dateOfCure: {
    type: Date,
    required: true,
  },
});

mongoose.model("donors", newUserSchema);
module.exports = mongoose.model("donors");
