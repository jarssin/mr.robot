export enum DefaultIds {
  default = 1,
  humans = 2,
  newContacts = 3,
}

export interface CampaignModelBase {
  id: number;
  name: string;
}

export type CampaignModelToCreate = Pick<CampaignModelBase, 'name'>;
