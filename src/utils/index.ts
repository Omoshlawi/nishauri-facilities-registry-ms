import config from "config";
import path from "path";
export const BASE_DIR = process.cwd();
export const MEDIA_ROOT = path.join(BASE_DIR, "media");
export const MEDIA_URL = "media";
export const FACILITY_MEDIA_URL = "uploads";
export const configuration = {
  version: require("./../../package.json").version,
  name: require("./../../package.json").name,
  nameAliase: config.get("name"),
  db: config.get("db") as string | undefined | null,
  port: config.get("port") as string | undefined | null,
  registry: {
    url: config.get("registry.url") as string,
    version: config.get("registry.version") as string,
  },
};
export {
  expressMulterFileToFile,
  formartError,
  generateExpiryTime,
  generateOTP,
  getUpdateFileAsync,
  isValidURL,
  objectToFormData,
  parseMessage,
  registry,
  sendSms,
} from "./helpers";

export { default as dbHelpers } from "./dbHelpers";
