import { NotificationContent } from "./NotificationContent";
import { BadInputError } from "../BadInputError";
import { ObjectId } from "mongodb";

export interface NotificationInput {
  title: string;
  body?: string;
  sound: string;
  badge: number;
  data: NotificationContent;
}

export class Notification implements NotificationInput {
  title: string;
  body?: string;
  sound: string;
  data: NotificationContent;
  badge = 1;
  _displayInForeground = false;

  constructor() {
    this.title = "";
    this.data = null;
  }

  prepare(to: string, id: ObjectId) {
    this.data.id = id;
    return {
      to,
      ...this,
    };
  }

  static fromJson(json: NotificationInput) {
    if (!json) {
      throw new BadInputError("No NotificationInput provided");
    }
    const instance = new Notification();
    instance.title = json.title;
    instance.body = json.body;
    instance.sound = json.sound || "default";

    instance.data = NotificationContent.fromJson({
      ...json.data,
      title: json.title,
    });

    return instance;
  }

  validate() {
    if (!this.title) {
      throw new BadInputError("Missing title");
    }
    if (!this.data) {
      throw new BadInputError("Missing data");
    }
    this.data.validate();
  }
}
