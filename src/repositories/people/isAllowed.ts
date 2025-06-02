import { mapKeys, camelCase } from "lodash";

import { BaseRepository } from "../common/baseRepository";

import { ToSetAllow } from "../../models/people/contract";
import { PeopleBase } from "../../models/people/model";

export class IsAllowedRepository extends BaseRepository {
  private async getUpdated(
    phone: string,
    campaignId: number
  ): Promise<PeopleBase> {
    const sql = `
      SELECT 
        *
      FROM
        people
      WHERE
        phone = ?
        and campaign_id = ?
      LIMIT 1
    `;
    let person: any = await this.get<PeopleBase>(sql, [phone, campaignId]);
    if (!person) throw new Error("Not found");

    person = mapKeys(person, (v, k) => camelCase(k));

    return person;
  }

  async execute({
    isAllowed,
    phone,
    campaignId,
  }: ToSetAllow): Promise<PeopleBase> {
    const sql = `
      UPDATE 
        people
        SET is_allowed = ?
      WHERE
        phone = ?
        and campaign_id = ?
    `;
    this.run(sql, [isAllowed, phone, campaignId]);
    const person = await this.getUpdated(phone, campaignId);

    return person;
  }
}
