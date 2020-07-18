import { API } from "../Api";
import { User } from "../models/User";

export class NotificationsAPI extends API {
  protected path = "/notification";

  public getUserNotifications(user: User): Promise<User> {
    return this.get(
      `/?deviceId=${user.deviceId}&deviceName=${user.deviceName}`
    );
  }
}
