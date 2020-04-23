import { connect, MongoClient } from "mongodb";

let client: MongoClient;
export const getMongoClient = async (): Promise<MongoClient> => {
  if (client) {
    return client;
  }
  // const uri =
  //   process.env.MONGO_URI ||
  //   `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}${process.env.MONGO_URL}`;
  const uri = "mongodb://192.168.8.140";
  if (!uri) {
    throw new Error("Missing mongo url.");
  }
  client = await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return client;
};