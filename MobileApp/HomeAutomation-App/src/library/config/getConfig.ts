import { Config } from "./config";
import developmentConfig from "./developmentConfig";
import stagingConfig from "./stagingConfig";
import productionConfig from "./productionConfig";

export type NodeEnv = "development" | "staging" | "production";
export default (nodeEnv: NodeEnv): Config => {
  if (!nodeEnv) {
    return developmentConfig;
  }
  switch (nodeEnv) {
    case "development":
      return developmentConfig;
    case "staging":
      return stagingConfig;
    case "production":
      return productionConfig;
  }
  return developmentConfig;
};
