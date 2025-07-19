import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    ); //mongoose gives a return object
    console.log(
      `mongodb connected || DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("Error connecting to database", error);
    process.exit(1); //this tells node to stop the process with exit code 1
  }
};

export default connectDB;
