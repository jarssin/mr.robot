import { CampaignModelBase } from "../campaign/model";
import { PersonToCreate } from "./model";

export interface ToCreateNumbers {
  file: string;
  name?: string;
}

export interface ToCreatePeople {
  peopleToCreate: PersonToCreate[];
  campaignId: number;
}

export interface ToCreatePerson {
  personToCreate: PersonToCreate;
  campaignId: number;
}

export interface ToCreateHuman {
  humansToCreate: PersonToCreate[];
}

export interface ToSetAllow {
  isAllowed: boolean;
  phone: string;
  campaignId: number;
}

// Outputs namespace was empty, so it can be omitted.

export interface CreateNumbersByCsv {
  execute(input: ToCreateNumbers): Promise<void>;
}

export interface ListCreated {
  execute(): Promise<CampaignModelBase[]>;
}

export interface CreatePerson {
  execute(input: ToCreatePerson): Promise<void>;
}

export interface CreateHuman {
  execute(input: ToCreateHuman): Promise<void>;
}
