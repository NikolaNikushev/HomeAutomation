import Repository from "./Repository";
import { Collection, MongoClient } from "mongodb";
import { Device } from "../../models/Device";

export default class DeviceRepository extends Repository {
  constructor(client: MongoClient, dbName?: string) {
    super(client, dbName);
    this.table = "device";
  }

  get collection(): Collection<Device> {
    return super.collection;
  }
}
