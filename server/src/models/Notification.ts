import { NotificationContent } from "./NotificationContent";
import { BadInputError } from "./BadInputError";

export interface NotificationInput {
  title: string;
  body?: string;
  sound: string;
  data: NotificationContent;
}

export class Notification implements NotificationInput {
  title: string;
  body?: string;
  sound: string;
  data: NotificationContent;
  _displayInForeground = false;

  constructor() {
    this.title = "";
    this.data = null;
  }

  prepare(to: string) {
    return {
      to,
      ...this,
    };
  }

  static fromJson(json: NotificationInput) {
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
