export interface PersonBase {
  id: number;
  name: string;
  phone: string;
  isAllowed?: boolean;
}

export type PersonToCreate = Omit<PersonBase, 'id'>;

export type PeopleFromCsv = Partial<PersonBase>;
