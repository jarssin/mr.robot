export interface PeopleBase {
  id: number;
  name: string;
  phone: string;
  isAllowed?: boolean;
}

export type PeopleToCreate = Omit<PeopleBase, 'id'>;

export type PeopleFromCsv = Partial<PeopleBase>;
