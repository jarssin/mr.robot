import { Response } from 'express';
import { Whatsapp } from 'venom-bot';

import { BaseRequest } from '../../middlewares/makeRequest';

import { SendDto } from '../../dto';

import { SendMessageService } from '../../services/whatsapp/send';

export class SendController {
  constructor(private readonly client: Whatsapp) {
    this.sendMessageService = new SendMessageService(client);
  }

  private readonly sendMessageService: SendMessageService;

  async handler(req: BaseRequest<SendDto>, res: Response) {
    const { body: sendDto } = req;
    sendDto.file = req.file;
    await this.sendMessageService.execute(sendDto);

    return res.status(204).end();
  }
}
