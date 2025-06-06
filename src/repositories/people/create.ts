import { mapKeys, camelCase } from "lodash";

import { BaseRepository } from "../common/baseRepository";

import { ToCreatePerson } from "../../models/people/contract";
import { PersonBase } from "../../models/people/model";

export class CreatePersonRepository extends BaseRepository {
  private async getCreated(): Promise<PersonBase> {
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
    let person: any = await this.get<PersonBase>(sql);
    if (!person) throw new Error("Not found");

    person = mapKeys(person, (v, k) => camelCase(k));

    return person;
  }

  async execute({
    personToCreate,
    campaignId,
  }: ToCreatePerson): Promise<PersonBase> {
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
