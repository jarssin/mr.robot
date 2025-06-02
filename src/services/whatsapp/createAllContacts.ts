import { Whatsapp } from "venom-bot";

import { PeopleToCreate } from "../../models/people/model";

import { createManyPeopleQueue } from "../../helpers/createManyPeopleQueue";

export const saveAllContacts = async (client: Whatsapp) => {
  const contacts = await client.getAllContacts();

  const peopleToCreate: PeopleToCreate[] = contacts.map((contact) => {
    const number = contact.id.user.slice(2);
    return {
      name: contact.name,
      phone: number,
    };
  });

  await createManyPeopleQueue({
    peopleToCreate,
    campaignId: 1,
  });
};
