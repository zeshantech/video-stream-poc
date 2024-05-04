import mongoose from "mongoose";

export async function connectToDatabase(callback: () => void) {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/video-stream");
    console.log("Connected to database successfully");
    callback();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
