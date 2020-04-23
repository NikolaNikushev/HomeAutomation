import { BadInputError } from "./BadInputError";

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
}

export class NotificationContent implements NotificationContentInput {
  deviceName: string;
  isActive?: boolean;
  didWhat: string;
  when: Date;
  title: string;
  type: NotificationType;

  constructor(
    deviceName: string,
    isActive: boolean,
    didWhat: string,
    when: Date,
    title: string,
    type: NotificationType
  ) {
    this.deviceName = deviceName;
    this.isActive = isActive;
    this.didWhat = didWhat;
    this.when = when;
    this.title = title;
    this.type = type;
  }

  static fromJson(json: NotificationContentInput) {
    return new NotificationContent(
      json.deviceName,
      json.isActive,
      json.didWhat,
      json.when ? new Date(json.when) : new Date(),
      json.title,
      json.type
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
