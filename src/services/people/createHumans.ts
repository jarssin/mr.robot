import { CreateHuman, ToCreateHuman } from "../../models/people/contract";

import logger from "../../utils/logger";

import { createManyPeopleQueue } from "../../helpers/createManyPeopleQueue";
import { DefaultIds } from "../../models/campaign/model";

export class CreateHumansService implements CreateHuman {
  async execute({ humansToCreate }: ToCreateHuman): Promise<void> {
    try {
      logger.log("Creating humans");
      await createManyPeopleQueue({
        peopleToCreate: humansToCreate,
        campaignId: DefaultIds.humans,
      });
      logger.log("Humans inserted on queue...");
    } catch (error) {
      logger.error("Something went wrong: ", error);
    }
  }
}
