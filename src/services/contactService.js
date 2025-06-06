import { ContactsList } from '../db/contactModel';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};

export const getContactById = async (contactsId) => {
  const contacts = await ContactsList.findById(contactsId);
  return contacts;
};