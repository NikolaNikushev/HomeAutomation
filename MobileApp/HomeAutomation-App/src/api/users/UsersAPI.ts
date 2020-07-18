import { API } from "../Api";
import { User } from "../models/User";

export class UsersAPI extends API {
  protected path = "user";

  public getUser(user: User): Promise<User> {
    return this.get("/", { params: user });
  }

  public register(user: User): Promise<User> {
    return this.post("/register", user);
  }

  public updateToken(user: User): Promise<User> {
    return this.post("/update", user);
  }
}
