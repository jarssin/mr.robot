import { SqliteDB } from "../providers/database";

import { PersonBase } from "../models/people/model";

export const normalizeDatabase = async () => {
  const db = new SqliteDB().connection;
  const people: PersonBase[] | [] = await new Promise((resolve) => {
    const sql = `
        SELECT
          *
        FROM
          people;
      `;
    db.all(sql, (err: any, res: PersonBase[] | []) => {
      if (res) resolve(res);
    });
  });

  people.forEach((person) => {
    let sql: string;

    if (!person.name || person.name === "") {
      sql = `
        UPDATE people
          set name = "sem nome"
        WHERE
          id = ${person.id};
      `;
      db.run(sql);
    }

    if (person.phone.length > 10) {
      const number = person.phone.slice(0, 2).concat(person.phone.slice(3));
      sql = `
        UPDATE people
          set phone = ${number}
        WHERE
          id = ${person.id};
      `;
      db.run(sql);
    }
  });
};

normalizeDatabase();
