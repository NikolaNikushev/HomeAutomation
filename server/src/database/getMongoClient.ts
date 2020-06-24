import { connect, MongoClient } from "mongodb";
import getIp from "./getIp";
let client: MongoClient;
export const getMongoClient = async (): Promise<MongoClient> => {
  if (client) {
    return client;
  }
  const uri = `mongodb://${getIp()}`; // mongodb://192.168.X.XXX
  if (!uri) {
    throw new Error("Missing mongo url.");
  }
  client = await connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000,
  });
  return client;
};
