import { ContactsList } from '../db/contactTemplate.js';

export const getcontactById = async (contactId) => {
  const contacts = await ContactsList.findById(contactId);
  return contacts;
};