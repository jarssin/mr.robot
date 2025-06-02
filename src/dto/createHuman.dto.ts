import { array, object, string } from "yup";
import { PeopleToCreate } from "../models/people/model";

const CreateSchema = object({
  humansToCreate: array()
    .min(1)
    .of(
      object({
        phone: string().required(),
        name: string().required(),
      })
    )
    .required(),
});

interface Create {
  humansToCreate: PeopleToCreate[];
}

export class CreateHumanDto {
  constructor(public humansToCreate: PeopleToCreate[]) {}

  static from(data: Create) {
    const { humansToCreate } = CreateSchema.validateSync(data);
    return new CreateHumanDto(humansToCreate);
  }
}
