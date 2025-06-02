import { ListCreated } from "../../models/people/contract";
import { CampaignModelBase } from "../../models/campaign/model";

import { ListCampaignRepository } from "../../repositories/campaign/list";

import logger from "../../utils/logger";

export class ListService implements ListCreated {
  async execute(): Promise<CampaignModelBase[]> {
    const campaign = await new ListCampaignRepository().execute();
    logger.success("Found campaigns");
    return campaign;
  }
}
