import mongoose, { Error } from "mongoose";

async function connectDb() {
  try {
    await mongoose.connect(process.env.DB_URL as string, {
      dbName: process.env.DB_NAME,
    });
  } catch (err) {
    console.log(`Error ${err}`);
    process.exit();
  }
}

export default connectDb;
