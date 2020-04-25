import { BadInputError } from "../BadInputError";
import { Room } from "./Room";

export enum DeviceStatus {
  "active" = "active",
  "inactive" = "inactive",
  "attention" = "attention",
}

export interface DeviceInput {
  name: string;
  room: Room;
  lastCommunication: Date;
  status?: DeviceStatus;
}

export class Device implements DeviceInput {
  name: string;
  room: Room;
  lastCommunication: Date;
  status?: DeviceStatus;

  constructor() {
    this.lastCommunication = new Date();
  }

  static fromJson(json: DeviceInput) {
    if (!json) {
      throw new BadInputError("No DeviceInput provided");
    }
    const instance = new Device();
    instance.name = json.name;
    instance.room = Room.fromJson(json.room);
    instance.status = json.status;
    return instance;
  }

  validate() {
    if (!this.name) {
      throw new BadInputError("Missing title");
    }
    if (this.status && !(this.status in DeviceStatus)) {
      throw new BadInputError("Invalid status provided.");
    }
    if (!this.room) {
      throw new BadInputError("No room provided.");
    }
    this.room.validate();
  }
}
