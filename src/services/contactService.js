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

export const updateContact = async (contactId, payload, options = {}) => {
  const unprocessedContact = await ContactsList.findOneAndUpdate(
    { '_id': contactId },
    payload,
    {
      new: true, //new: returns the updated document if true
      runValidators: true,
      context: 'query',
      includeResultMetadata: true, // returns a ModifyResult type that contains the found document and metadata.
      ...options,
    },
  );
  if (!unprocessedContact) return null;

  return {
    contact: unprocessedContact,
    isNew: false,
  };
};

export const deleteContactById = async (contactId) => {
  await ContactsList.findOneAndDelete({_id : contactId });
};