import { Request, Response } from "express";
import { ListCampaignRepository } from "../../repositories/campaign/list";

export class ListCampaignController {
  static async handler(_: Request, res: Response) {
    const campaigns = await new ListCampaignRepository().execute();
    return res.status(200).send({ body: campaigns });
  }
}
