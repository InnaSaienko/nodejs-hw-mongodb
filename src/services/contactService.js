import { ContactsList } from '../db/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsList.find();
  const contactsCounts = await ContactsList.find().merge(contactsQuery).countDocuments();

  const contacts = await contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec();

  const paginationData = calculatePaginationData(contactsCounts, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
  return await ContactsList.findOneAndDelete({ _id: contactId });
};