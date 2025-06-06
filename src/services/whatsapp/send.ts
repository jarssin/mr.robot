import { formatToWpp } from "../../helpers/formatPhoneNumber";

import { WhatsappService } from "./base";

import logger from "../../utils/logger";
import { FindPeopleRepository } from "../../repositories/people/find";
import { Whatsapp } from "venom-bot";
import { PersonBase } from "../../models/people/model";
import { SendDto } from "../../dto";

export class SendMessageService
  extends WhatsappService {

  constructor(client: Whatsapp) {
    super(client);
    this.findPeopleRepository = new FindPeopleRepository();
  }

  private readonly findPeopleRepository: FindPeopleRepository;

  async execute(sendDto: SendDto): Promise<void> {
    let person: PersonBase | null;

    if (sendDto.idCampaign) {
      person = await new FindPeopleRepository().execute(
        sendDto.phone,
        sendDto.idCampaign
      );

      if (person && !person.isAllowed) {
        logger.error(
          `${person.name} of phone ${person.phone}, didn't allow reciving messeges`
        );

        return;
      }
    }

    const phone = formatToWpp(sendDto.phone);

    if (sendDto.file) {
      logger.success(
        `Message with file sended to phone ${sendDto.phone}`
      );

      return this.client
        .sendImage(phone, sendDto.file.path, "image", sendDto.msg)
        .then((msg) => logger.success("message sended: ", msg))
        .catch((error) => logger.error(error));
    }

    logger.success(`Message sended to phone ${sendDto.phone}`);
    return this.client
      .sendText(phone, sendDto.msg)
      .then((msg) => logger.success("message sended: ", msg))
      .catch((error) => logger.error(error));
  }
}
