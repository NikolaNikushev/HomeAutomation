import { BadInputError } from "../BadInputError";

export interface RoomInput {
  name: string;
}

export class Room implements RoomInput {
  name: string;

  static fromJson(json: RoomInput) {
    if (!json) {
      throw new BadInputError("No RoomInput provided");
    }
    const instance = new Room();
    instance.name = json.name;
    return instance;
  }

  validate() {
    if (!this.name) {
      throw new BadInputError("Missing room name");
    }
  }
}
