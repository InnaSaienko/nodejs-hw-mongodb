import { ContactsList } from '../db/contactModel';

export const getcontactsById = async (contactsId) => {
  const contacts = await ContactsList.findById(contactsId);
  return contacts;
};