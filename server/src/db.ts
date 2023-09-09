import mongoose from "mongoose";
import { config } from "./config/config";
const { host, name, port } = config.database;

async function connectDB() {
  const db = await mongoose.connect(`mongodb://${host}:${port}/${name}`);
  console.log(`MongoDB connected: ${db.connection.name}`);
}

export default connectDB;
