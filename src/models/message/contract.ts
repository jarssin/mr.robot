import { PeopleBase } from "../people/model";

export interface ToSend {
  person: PeopleBase;
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

export interface ISendMessageToAllService {
  execute(input: ToSendAllContacts): Promise<void>;
}
