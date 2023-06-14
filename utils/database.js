import mongoose from "mongoose";

// track connection status
let isConnected = false;

export const connectToDB = async () => {
  console.log("running")
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("mongoDB is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "prompt_ninja",
    });

    isConnected = true;
    console.log("MDB connected");
  } catch (error) {
    console.log(error);
  }
};
