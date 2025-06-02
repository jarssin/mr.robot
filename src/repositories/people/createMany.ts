import logger from "../../utils/logger";
import { ToCreatePeople } from "../../models/people/contract";

import { BaseRepository } from "../common/baseRepository";

export class CreateManyPeopleRepository extends BaseRepository {
  async execute({ peopleToCreate, campaignId }: ToCreatePeople): Promise<void> {
    const stmt = this.db.prepare(
      "INSERT INTO people (name, phone, campaign_id) VALUES (?, ?, ?)"
    );
    peopleToCreate.forEach((person) => {
      logger.log(`creating person: `, person);
      stmt.run([person.name, person.phone, campaignId]);
    });
  }
}
