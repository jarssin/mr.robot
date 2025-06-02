import { create, Whatsapp } from "venom-bot";
import os from "os";

export class WhatsappProvider {
  async connect(): Promise<Whatsapp> {
    const isMac = os.platform() === "darwin";
    const browserPathExecutable = isMac
      ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
      : "/usr/bin/chromium-browser";

    const client = await create(
      "mr_robot",
      (base64Qrimg, asciiQR, attempts) => {},
      undefined,
      {
        headless: "new",
        browserPathExecutable,
        browserArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
      }
    );

    return client;
  }
}
