import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true, //searching field enable through optimised way
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      time: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudnary service
      required: true,
      coverimage: {
        type: String, //again cloudnary service
      },
    },
    watchhistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshtoken: {
      type: String,
    },
  },

  {
    timestamps: true,
  }
);

//note this code below will execute every time the user make any change to any field. so we need to check for the password field only. that's why isModified("password") is used

userSchema.pre("save", async function (next) {
  //next is necessary
  if (!this.isModified("password")) return;
  this.password = bcrypt.hash(this.password, 10);
  next();
}); //as a callback function we should not write arrow function since it does not have this access

//brcypt allows us to match the password with that encrypted password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
    _id: this._id,
    emai: this.email,
    username: this.username,
    fullname: this.username,
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
