import { PeopleModel } from '../people/model';

export interface ToSend {
  person: PeopleModel.Base;
  msg: string;
  file?: string;
  fileMsg?: string;
}

export interface ToSendAllContacts {
  campaignId: number;
  msg: string;
  file?: string;
  fileMsg?: string;
}

// Placeholder for future outputs
export type Outputs = Record<string, never>;

export interface SendMessageService {
  execute(input: ToSend): Promise<void>;
}

export interface SendMessageToAllService {
  execute(input: ToSendAllContacts): Promise<void>;
}
