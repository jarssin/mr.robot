import { promise } from "fastq";
import { Whatsapp } from "venom-bot";

import { ToSend } from "../models/message/contract";

import { SendMessageService } from "../services/whatsapp/send";
import { sendMessageError } from "../utils/queueErrorHandler";

type Data = {
  client: Whatsapp;
  msgData: ToSend;
};

export const sendMessegeToAllQueue = async (data: Data) => {
  const queue = promise(worker, 1);
  queue.error(sendMessageError);
  await queue.push(data);
};

const worker = async (data: Data) => {
  const sendMessegeService = new SendMessageService(data.client);
  await sendMessegeService.execute(data.msgData);
};
