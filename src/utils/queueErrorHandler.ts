import { errorHandler } from 'fastq';

import { SendMessageService } from '../services/whatsapp/send';

import { FindPeopleRepository } from '../repositories/people/find';

import logger from './logger';

const TWO_HOURS = 7200000;

export const sendMessageError: errorHandler = async (error, task) => {
  if (error?.message === 'Not a accepted contact') {
    await new Promise((resolve) => setTimeout(resolve, TWO_HOURS));

    try {
      const { client, msgData } = task;
      const { phone, campaignId } = msgData.person;
      const { msg, file, fileMsg } = msgData;

      const person = await new FindPeopleRepository().execute(
        phone,
        campaignId
      );
      if (!person) throw new Error('Contact not found');
      // TODO: Fix this issue
      // await new SendMessageService(client).execute({
      //   person,
      //   msg,
      //   file,
      //   fileMsg,
      // });
    } catch (error: any) {
      logger.error(error);
    }
  }
};
