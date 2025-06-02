import { SqliteDB } from "../providers/database";

import { PeopleBase } from "../models/people/model";

export const normalizeDatabase = async () => {
  const db = new SqliteDB().connection;
  const people: PeopleBase[] | [] = await new Promise((resolve) => {
    const sql = `
        SELECT
          *
        FROM
          people;
      `;
    db.all(sql, (err: any, res: PeopleBase[] | []) => {
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
