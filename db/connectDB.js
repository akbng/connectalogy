import mongoose from "mongoose";

const connection = {};

export default async function connectDB() {
  if (connection.isConnected) return;

  const db = await mongoose.connect(process.env.MONGO_URI);
  connection.isConnected = db.connections[0].readyState;
}
