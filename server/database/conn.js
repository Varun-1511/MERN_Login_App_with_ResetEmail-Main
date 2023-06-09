import mongoose from "mongoose";

import { MongoMemoryServer } from "mongodb-memory-server";
import ENV from "../config.js";

// mongoose.connect("mongodb+srv://<vasanthakumar>:<vkappx>@vkappx.16dbf8a.mongodb.net/?retryWrites=true&w=majority")
async function connect() {
  const mongod = await MongoMemoryServer.create();
  const getUri = mongod.getUri();

  mongoose.set("strictQuery", true);
  // const db = await mongoose.connect(getUri);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Database Connected");
  return db;
}

export default connect;
