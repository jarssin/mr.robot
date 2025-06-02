import { formatToWpp } from "../../helpers/formatPhoneNumber";

import { WhatsappService } from "./base";

import logger from "../../utils/logger";
import { ToSend } from "../../models/message/contract";

export class SendMessageService
  extends WhatsappService
  implements SendMessageService
{
  async execute({ person, msg, file, fileMsg }: ToSend): Promise<void> {
    const phone = formatToWpp(person.phone);

    if (!person.isAllowed) {
      logger.error(
        `${person.name} of phone ${person.phone}, didn't allow reciving messeges`
      );

      throw new Error("Not a accepted contact");
    }

    if (file) {
      logger.success(
        `Message with file sended to ${person.name} of phone ${person.phone}`
      );

      return await this.client
        .sendImage(phone, file, "image", fileMsg)
        .then((msg) => logger.success("message sended: ", msg))
        .catch((error) => logger.error(error));
    }

    logger.success(`Message sended to ${person.name} of phone ${person.phone}`);
    return await this.client
      .sendText(phone, msg)
      .then((msg) => logger.success("message sended: ", msg))
      .catch((error) => logger.error(error));
  }
}
