import { AsyncStorage } from "react-native";

export enum LocalVariablesKeys {
  NOTIFICATIONS = "NOTIFICATIONS",
  DEVICE_NAME = "deviceName",
  FIRST_TIME = "firstTime",
  DEVICE_ID = "deviceId",
  PUSH_TOKEN = "PUSH_TOKEN",
}

export abstract class LocalStorage {
  public static keys = LocalVariablesKeys;

  static async clearStorage(): Promise<void> {
    await AsyncStorage.clear();
    await AsyncStorage.setItem(this.keys.FIRST_TIME, "true");
  }

  static async setItem(key: LocalVariablesKeys, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  static async getItem(key: LocalVariablesKeys): Promise<string> {
    return await AsyncStorage.getItem(key);
  }
}
