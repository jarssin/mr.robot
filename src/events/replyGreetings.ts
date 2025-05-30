import { Whatsapp, Message } from 'venom-bot';

import { defaultMsg } from './common/defaultMsg';

import { DefaultIds } from '../models/campaign/model';

import { CreateService } from '../services/people/create';

import { IsAllowedRepository } from '../repositories/people/isAllowed';

import { formatFromWpp, formatToWpp } from '../helpers/formatPhoneNumber';

import logger from '../utils/logger';

export const replyGreetings = async (client: Whatsapp, msg: Message) => {
  const phone = formatFromWpp(msg.from);

  await new CreateService().execute({
    personToCreate: {
      name: msg.notifyName ?? 'Sem nome',
      phone,
    },
    campaignId: DefaultIds.newContacts,
  });

  if (msg.body === 'Sim') {
    await affirmative(client, msg, phone);
  } else {
    await negative(client, msg, phone);
  }
};

const affirmative = async (client: Whatsapp, msg: Message, phone: string) => {
  await new IsAllowedRepository().execute({
    isAllowed: true,
    phone,
    campaignId: DefaultIds.newContacts,
  });

  await defaultMsg(client, msg.from);

  await client
    .sendContactVcard(msg.from, formatToWpp('6899652210'))
    .then((msg) => logger.success('Message sended', msg))
    .catch((error) => logger.error('Error: ', error));
};

const negative = async (client: Whatsapp, msg: Message, phone: string) => {
  await new IsAllowedRepository().execute({
    isAllowed: false,
    phone,
    campaignId: DefaultIds.newContacts,
  });

  await client
    .sendText(msg.from, 'Caso mude de ideia, você ainda pode apertar sim! ;)')
    .then((msg) => logger.success('Message sended', msg))
    .catch((error) => logger.error('Error: ', error));
};
