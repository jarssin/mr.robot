import { Response } from 'express';
import { Whatsapp } from 'venom-bot';

import { BaseRequest } from '../../middlewares/makeRequest';

import { SendDto } from '../../dto';

import { SendMessageService } from '../../services/whatsapp/send';

import { FindPeopleRepository } from '../../repositories/people/find';

export class SendController {
  constructor(private readonly client: Whatsapp) {}

  async handler(req: BaseRequest<SendDto>, res: Response) {
    const sendMessageService = new SendMessageService(this.client);

    let person = await new FindPeopleRepository().execute(
      req.body.phone,
      req.body.id
    );
    // bypass to send msg to strangers
    // bypass to send msg to strangers
    person ??= {
      id: 9999,
      name: 'Sem nome',
      phone: req.body.phone,
    };

    await sendMessageService.execute({
      person,
      ...req.body,
      file: req.file?.path,
    });

    return res.status(204).end();
  }
}
