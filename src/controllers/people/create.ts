import { Response } from "express";

import { BaseRequest } from "../../middlewares/makeRequest";

import { CreateDto } from "../../dto";

import { CreateManyService } from "../../services/people/createMany";

export class CreateController {
  static async handler(req: BaseRequest<CreateDto>, res: Response) {
    await new CreateManyService().execute(req.body);
    return res.status(204).json();
  }
}
