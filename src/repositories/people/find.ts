import { PersonBase } from "../../models/people/model";

import { BaseRepository } from "../common/baseRepository";

import { mapKeys, camelCase } from "lodash";

export class FindPeopleRepository extends BaseRepository {
  async execute(phone: string, campaignId: number): Promise<PersonBase | null> {
    const sql = `
      SELECT
        *
      FROM
        people
      WHERE
        phone = ?
        and campaign_id = ?
    `;

    let people: any = await this.get<PersonBase>(sql, [phone, campaignId]);
    if (people) people = mapKeys(people, (_, k) => camelCase(k));

    return people;
  }
}
