import { Collection, Db, MongoClient } from "mongodb";

export default class Repository {
  protected table: string;
  protected db: Db;

  constructor(client: MongoClient, dbName = "homeautomation") {
    this.table = "";
    this.db = client.db(dbName);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get collection(): Collection<any> {
    if (!this.table) {
      throw new Error(`[${this.constructor.name}] - No table specified.`);
    }
    return this.db.collection(this.table);
  }
}
