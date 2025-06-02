import { readFileSync } from "fs";

import { PeopleToCreate } from "../../models/people/model";

export class CsvFileDto {
  static read(path: string): PeopleToCreate[] {
    const file = readFileSync(path, "utf-8");
    const numbers = file.split("\n").map((number): PeopleToCreate => {
      const phone = number.trim();
      return {
        phone,
        name: "Sem Nome",
      };
    });

    return numbers;
  }
}
