import { ContactsList } from '../db/contactModel.js';

export const getAllContacts = async () => {
  const contacts = await ContactsList.find();
  return contacts;
};

export const getContactById = async (contactsId) => {
  const contacts = await ContactsList.findById(contactsId);
  return contacts;
};

export const createContact = async (payload) => {
 const contact = await ContactsList.create(payload);
 return contact;
};

export const updateContact = async (payload) => {

};