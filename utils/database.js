import mongoose from "mongoose";

// track connection status
let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("mongoDB is connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGIDB_URI, {
      dbName: "prompt_ninja",
      useNewUrlPerser: true,
      useUnifinedTopology: true,
    });

    isConnected = true;
    console.log("MDB connected")
  } catch (error) {}
};
