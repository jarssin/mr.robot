import { readFileSync } from "fs";

import { PersonToCreate } from "../../models/people/model";

export class CsvFileDto {
  static read(path: string): PersonToCreate[] {
    const file = readFileSync(path, "utf-8");
    const numbers = file.split("\n").map((number): PersonToCreate => {
      const phone = number.trim();
      return {
        phone,
        name: "Sem Nome",
      };
    });

    return numbers;
  }
}
