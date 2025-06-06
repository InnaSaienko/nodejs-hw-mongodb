import { ContactsList } from '../db/contactModel';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};