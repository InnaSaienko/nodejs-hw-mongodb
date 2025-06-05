import { ContactsList } from '../db/contactTemplate.js';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};