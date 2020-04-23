import Repository from "./Repository";
import { MongoClient, Collection } from "mongodb";
import { User } from "../../models/User";

export default class UsersRepository extends Repository {
  constructor(client: MongoClient, dbName?: string) {
    super(client, dbName);
    this.table = "users";
  }

  get collection(): Collection<User> {
    return super.collection;
  }
}
