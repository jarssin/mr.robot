import { greetings } from "../../events/greetings";

import { formatToWpp } from "../../helpers/formatPhoneNumber";

import { MessageContract } from "../../models/message/contract";

import { WhatsappService } from "./base";

import logger from "../../utils/logger";

export class SendMessageService
  extends WhatsappService
  implements MessageContract.SendMessageService
{
  async execute({
    person,
    msg,
    file,
    fileMsg,
  }: MessageContract.Inputs.ToSend): Promise<void> {
    const phone = formatToWpp(person.phone);

    if (!person.isAllowed) {
      if (person.isAllowed == false) {
        logger.error(
          `${person.name} of phone ${person.phone}, didn't allow reciving messeges`
        );
        return;
      }

      // greetings(this.client, phone);
      // throw new Error("Not a accepted contact");
    }

    await this.client
      .sendText(phone, msg)
      .then((msg) => logger.success("message sended: ", msg))
      .catch((error) => logger.error(error));

    if (file)
      await this.client
        .sendImage(phone, file, "image", fileMsg)
        .then((msg) => logger.success("message sended: ", msg))
        .catch((error) => logger.error(error));

    logger.success(`Message sended to ${person.name} of phone ${person.phone}`);
  }
}
