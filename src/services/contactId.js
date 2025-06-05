import { ContactsList } from '../db/contactTemplate';

export const getcontactsById = async (contactsId) => {
  const contacts = await ContactsList.findById(contactsId);
  return contacts;
};