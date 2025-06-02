import {
  ToSendAllContacts,
  ISendMessageToAllService,
} from "../../models/message/contract";

import { GetCampaignRepository } from "../../repositories/campaign/get";
import { ListPeopleRepository } from "../../repositories/people/list";

import { WhatsappService } from "./base";

import { sendMessegeToAllQueue } from "../../helpers/sendMessegeToAllQueue";

import logger from "../../utils/logger";

export class SendMessageToAllService
  extends WhatsappService
  implements ISendMessageToAllService
{
  async execute({
    campaignId,
    msg,
    file,
    fileMsg,
  }: ToSendAllContacts): Promise<void> {
    const campaign = await new GetCampaignRepository().execute(campaignId);
    if (!campaign)
      throw new Error(`Campaign of campaignId: ${campaignId} does not exist`);

    const people = await new ListPeopleRepository().execute(campaign.id);

    people.forEach(async (person) => {
      try {
        const msgData = {
          person,
          msg,
          file,
          fileMsg,
        };

        await sendMessegeToAllQueue({
          client: this.client,
          msgData,
        });
      } catch (error: any) {
        logger.error(error);
      }
    });
  }
}
