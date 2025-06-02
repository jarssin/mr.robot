import {
  CampaignModelBase,
  CampaignModelToCreate,
} from "../../models/campaign/model";

import { BaseRepository } from "../common/baseRepository";

export class CreateCampaignRepository extends BaseRepository {
  private async getCreated(): Promise<CampaignModelBase> {
    const sql = `
      SELECT 
        *
      FROM
        campaign
      ORDER BY
        id
      DESC
    `;
    const campaign = await this.get<CampaignModelBase>(sql);
    if (!campaign) throw new Error("Not found");

    return campaign;
  }

  async execute({ name }: CampaignModelToCreate): Promise<CampaignModelBase> {
    const sql = `
      INSERT INTO 
        campaign (name)
        values(?)
    `;
    this.run(sql, [name]);
    const campaign = await this.getCreated();

    return campaign;
  }
}
