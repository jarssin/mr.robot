import { CreatePerson, ToCreatePerson } from "../../models/people/contract";

import { FindPeopleRepository } from "../../repositories/people/find";
import { CreatePersonRepository } from "../../repositories/people/create";

export class CreateService implements CreatePerson {
  async execute({ personToCreate, campaignId }: ToCreatePerson): Promise<void> {
    const checkPerson = await new FindPeopleRepository().execute(
      personToCreate.phone,
      campaignId
    );

    if (checkPerson) return;

    await new CreatePersonRepository().execute({
      personToCreate,
      campaignId,
    });
  }
}
