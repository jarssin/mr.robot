import { mapKeys, camelCase } from "lodash";

import { BaseRepository } from "../common/baseRepository";

import { ToCreatePerson } from "../../models/people/contract";
import { PeopleBase } from "../../models/people/model";

export class CreatePersonRepository extends BaseRepository {
  private async getCreated(): Promise<PeopleBase> {
    const sql = `
      SELECT 
        *
      FROM
        people
      ORDER BY
        id
      DESC
      LIMIT 1
    `;
    let person: any = await this.get<PeopleBase>(sql);
    if (!person) throw new Error("Not found");

    person = mapKeys(person, (v, k) => camelCase(k));

    return person;
  }

  async execute({
    personToCreate,
    campaignId,
  }: ToCreatePerson): Promise<PeopleBase> {
    const sql = `
      INSERT INTO 
        people (name, phone, campaign_id, is_allowed)
        values (?, ?, ?, ?)
    `;
    this.run(sql, [
      personToCreate.name,
      personToCreate.phone,
      campaignId,
      personToCreate.isAllowed,
    ]);
    const person = await this.getCreated();

    return person;
  }
}
