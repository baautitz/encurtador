import * as mongoose from "mongoose";

const connection: any = {};

async function dbConnection() {
  if (connection.isConnected) {
    return;
  }

  const db: any = await mongoose.connect(process.env.MONGODB_APP_URI!);

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnection;