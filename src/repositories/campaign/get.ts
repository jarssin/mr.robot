import { CampaignModelBase } from '../../models/campaign/model';
import { BaseRepository } from '../common/baseRepository';

export class GetCampaignRepository extends BaseRepository {
  async execute(id: number) {
    const sql = `
      SELECT
        *
      FROM
        campaign
      WHERE
        id = ?
    `;
    const campaign = await this.get<CampaignModelBase>(sql, [id]);

    return campaign;
  }
}
