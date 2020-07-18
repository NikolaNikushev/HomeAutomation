export enum DeviceStatus {
  "active" = "active",
  "inactive" = "inactive",
  "attention" = "attention",
}

export interface Device {
  name: string;
  room: Room;
  lastCommunication: Date;
  status?: DeviceStatus;
}

export interface Room {
  name: string;
}
