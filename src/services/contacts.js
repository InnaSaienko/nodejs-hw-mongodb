import { ContactsList } from '../db/contactTemplate';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};