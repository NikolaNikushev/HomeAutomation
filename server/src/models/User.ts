import { BadInputError } from "./BadInputError";

export interface UserInput {
  deviceName: string;
  deviceId: string;
  pushToken?: string;
}

export class User implements UserInput {
  deviceName: string;
  deviceId: string;
  pushToken?: string;

  constructor(deviceName: string, deviceId: string, pushToken?: string) {
    this.deviceName = deviceName;
    this.deviceId = deviceId;
    this.pushToken = pushToken;
  }

  static fromJson(json: UserInput) {
    return new User(json.deviceName, json.deviceId, json.pushToken);
  }

  validate() {
    if (!this.deviceName) {
      throw new BadInputError("Missing device name");
    }
    if (!this.deviceId) {
      throw new BadInputError("Missing device ID");
    }
  }
}
