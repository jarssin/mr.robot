import { Message, Whatsapp } from 'venom-bot';
import { formatToWpp } from '../helpers/formatPhoneNumber';

import { DefaultIds } from '../models/campaign/model';

import { ListPeopleRepository } from '../repositories/people/list';

import logger from '../utils/logger';
import { PeopleBase } from '../models/people/model';

const getRandomHuman = (people: PeopleBase[]) => {
  return people[Math.floor(Math.random() * people.length)];
};

export const callHuman = (
  client: Whatsapp,
  to: string,
  name: string = 'Sem nome',
  doubtMsgs?: Message[]
) => {
  new ListPeopleRepository()
    .execute(DefaultIds.humans)
    .then((people) => {
      // In case there is no human to pick up
      if (!people.length) {
        return client
          .sendText(
            to,
            'Infelizmente não há humanos cadastrados para atende-lo!'
          )
          .then((msg) => logger.success('Message sended: ', msg))
          .catch((error) => logger.error('Error; ', error));
      }

      const chosen = getRandomHuman(people);
      const chosenPhone = formatToWpp(chosen.phone);

      client
        .sendText(
          chosenPhone,
          `Olá ${chosen.name}, o cliente ${name} possui duvidas que não sou capaz de sanar, você poderia ajudá-lo?`
        )
        .then((msg) => logger.success('Message sended: ', msg))
        .catch((error) => logger.error('Error; ', error));

      client
        .sendContactVcard(chosenPhone, to)
        .then((msg) => logger.success('Message sended: ', msg))
        .catch((error) => logger.error('Error: ', error));

      if (doubtMsgs) {
        let lastestMsgs: string = 'Ultimas mensagens do cidadão:\n';

        lastestMsgs += doubtMsgs.map((msg) => `\n${name}: ${msg.body}`);
        client.sendText(chosenPhone, lastestMsgs);
      }
    })
    .catch((error) => logger.error('Error: ', error));
};
