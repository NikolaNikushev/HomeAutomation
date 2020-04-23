import Repository from "./Repository";
import { Collection, MongoClient } from "mongodb";
import { UserNotification } from "../../models/UserNotification";

export default class UserNotificationsRepository extends Repository {
  constructor(client: MongoClient, dbName?: string) {
    super(client, dbName);
    this.table = "user-notification";
  }

  get collection(): Collection<UserNotification> {
    return super.collection;
  }
}
