import crypto from "crypto";
import { UAParser } from "ua-parser-js";
import { DeviceType } from "../schema/chat.model";

export const hashIP = (ip: string): string => {
  // Hash the IP with a secret salt for GDPR/CCPA compliance
  const salt = process.env.IP_HASH_SALT || "default-salt-change-me";
  return crypto.createHmac("sha256", salt).update(ip).digest("hex");
};

export const parseUserAgent = (userAgent: string) => {
  const result = UAParser(userAgent);
  console.log(result);

  let deviceType: DeviceType = "unknown";
  if (result.device.type === "mobile") deviceType = "mobile";
  else if (result.device.type === "tablet") deviceType = "tablet";
  else if (result.device.type === "console" || result.device.type === "smarttv")
    deviceType = "desktop";
  else if (result.os.name) deviceType = "desktop"; // Fallback

  return {
    deviceType,
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
  };
};
