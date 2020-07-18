import getConfig from "./getConfig";
import Constants from "expo-constants";

export default getConfig(Constants.manifest.releaseChannel || "development");

export interface Config {
  DATA_ENDPOINT: string;
}
