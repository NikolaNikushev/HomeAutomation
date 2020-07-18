import { API } from "../Api";
import { Device } from "./Device";

export class DevicesAPI extends API {
  protected path = "/device";

  public getAllDevices(): Promise<Device[]> {
    return this.get(`/`);
  }
}
