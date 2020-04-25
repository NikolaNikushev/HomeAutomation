import { BadInputError } from "../BadInputError";
import { ObjectId } from "mongodb";

export enum NotificationType {
  "danger" = "danger",
  "warning" = "warning",
  "success" = "success",
}

export interface NotificationContentInput {
  deviceName: string;
  isActive?: boolean;
  didWhat: string;
  when: Date;
  type?: NotificationType;
  title: string;
  id: ObjectId;
}

export class NotificationContent implements NotificationContentInput {
  deviceName: string;
  isActive?: boolean;
  didWhat: string;
  when: Date;
  title: string;
  type: NotificationType;
  id: ObjectId;

  constructor(
    deviceName: string,
    isActive: boolean,
    didWhat: string,
    when: Date,
    title: string,
    type: NotificationType,
    id: ObjectId
  ) {
    this.deviceName = deviceName;
    this.isActive = isActive;
    this.didWhat = didWhat;
    this.when = when;
    this.title = title;
    this.type = type;
    this.id = id;
  }

  static fromJson(json: NotificationContentInput) {
    if (!json) {
      throw new BadInputError("No NotificationContentInput provided");
    }
    return new NotificationContent(
      json.deviceName,
      json.isActive,
      json.didWhat,
      json.when ? new Date(json.when) : new Date(),
      json.title,
      json.type,
      json.id
    );
  }

  validate() {
    if (!this.deviceName) {
      throw new BadInputError("Missing device name");
    }
    if (!this.didWhat) {
      throw new BadInputError("Missing did what");
    }
    if (!this.when) {
      throw new BadInputError("Missing did what");
    }
    if (!this.title) {
      throw new BadInputError("Missing title for data");
    }
    if (this.type && !(this.type in NotificationType)) {
      throw new BadInputError("Invalid type provided.");
    }
  }
}
