import { BadInputError } from "./BadInputError";

export interface NotificationContentInput {
  deviceName: string;
  isActive?: boolean;
  didWhat: string;
  when: Date;
  title: string;
}

export class NotificationContent implements NotificationContentInput {
  deviceName: string;
  isActive?: boolean;
  didWhat: string;
  when: Date;
  title: string;

  constructor(
    deviceName: string,
    isActive: boolean,
    didWhat: string,
    when: Date,
    title: string
  ) {
    this.deviceName = deviceName;
    this.isActive = isActive;
    this.didWhat = didWhat;
    this.when = when;
    this.title = title;
  }

  static fromJson(json: NotificationContentInput) {
    return new NotificationContent(
      json.deviceName,
      json.isActive,
      json.didWhat,
      new Date(json.when),
      json.title
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
  }
}
