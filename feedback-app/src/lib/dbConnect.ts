import mongoose from "mongoose";

// return value type after connection, is optional
type ConnectionObject = {
  isConnected?: number;
};
const connection: ConnectionObject = {};




async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already connected to database!");
    return;
  }

  try {

    const db = await mongoose.connect(process.env.MONGODB_URL! || "", {
      dbName: process.env.MONGODB_NAME,
      autoCreate: true,
      autoIndex: true,
    });
    connection.isConnected = db.connections[0].readyState;
    console.log(db)
    console.log(db.connections)
    console.log("Database connected successfully!")
    

  } catch (error) {
    console.log("Database connection failed!", error);
    process.exit(1);
  }
}

export default dbConnect;
