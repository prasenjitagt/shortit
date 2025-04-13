import { UAParser } from "ua-parser-js";

export function getDeviceInfo(userAgent: string) {
    const parser = new UAParser(userAgent); // ✅ create an instance

    const browser = parser.getBrowser();
    const cpu = parser.getCPU();
    const device = parser.getDevice();
    const engine = parser.getEngine();
    const os = parser.getOS();
    const ua = parser.getUA();

    return {
        browserName: browser.name || "Unknown",
        browserVersion: browser.version || "Unknown",
        cpuArchitecture: cpu.architecture || "Unknown",
        deviceType: device.type || "Unknown",
        deviceModel: device.model || "Unknown",
        deviceVendor: device.vendor || "Unknown",
        engineName: engine.name || "Unknown",
        engineVersion: engine.version || "Unknown",
        osName: os.name || "Unknown",
        osVersion: os.version || "Unknown",
        userAgent: ua || "Unknown",
    };
}
