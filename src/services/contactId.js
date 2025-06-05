import { ContactsList } from '../db/contactTemplate.js';

export const getcontactById = async (contactId) => {
  const contact = await ContactsList.findById(contactId);
  return contact;
};