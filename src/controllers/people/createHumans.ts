import { Response } from "express";

import { BaseRequest } from "../../middlewares/makeRequest";

import { CreateHumanDto } from "../../dto/createHuman.dto";
import { CreateHumansService } from "../../services/people/createHumans";

export class CreateHumansController {
  static async handler(req: BaseRequest<CreateHumanDto>, res: Response) {
    await new CreateHumansService().execute(req.body);
    return res.status(204).json();
  }
}
