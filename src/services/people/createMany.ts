import { randomBytes } from "crypto";

import { CsvFileDto } from "../../dto/csv/csvFile.dto";

import {
  CreateNumbersByCsv,
  ToCreateNumbers,
} from "../../models/people/contract";

import { CreateCampaignRepository } from "../../repositories/campaign/create";

import logger from "../../utils/logger";

import { createManyPeopleQueue } from "../../helpers/createManyPeopleQueue";

export class CreateManyService implements CreateNumbersByCsv {
  async execute({ file, name }: ToCreateNumbers): Promise<void> {
    try {
      logger.log("Creating people by csv...");
      const peopleToCreate = CsvFileDto.read(file);
      const campaign = await new CreateCampaignRepository().execute({
        name: name ?? randomBytes(20).toString("hex"),
      });

      await createManyPeopleQueue({
        peopleToCreate,
        campaignId: campaign.id,
      });
      logger.log("People inserted on queue...");
    } catch (error) {
      logger.error("Something went wrong: ", error);
    }
  }
}
