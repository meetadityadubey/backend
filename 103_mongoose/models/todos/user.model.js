import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, //we can also pass an array with a custom message in any of the fields
      min: 6,
    },
  },
  { timestamps: true }  //creates two: created_at and updated_at
); //userSchema is just how the data should be stored

export const User = mongoose.model("User", userSchema); //export because we may need to use this in some other files. here we are creating a user model and how it's data should be stored based on userSchema
