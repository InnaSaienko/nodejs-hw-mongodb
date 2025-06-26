import { ContactsList } from '../db/models/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter = {}, userId }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  console.log("TYPE of userId:", typeof userId, "Value:", userId);

  const queryConditions = { userId };

  if (filter.contactType !== null) {
    queryConditions.contactType = filter.contactType;
  }

  if (filter.isFavourite !== null) {
    queryConditions.isFavourite = filter.isFavourite;
  }

  const contactsQuery = ContactsList.find(queryConditions);

  const [contactsCounts, contacts] = await Promise.all([
    ContactsList.countDocuments(contactsQuery),
    contactsQuery.skip(skip).limit(limit).sort(sortBy ? { [sortBy]: sortOrder } : {}).exec(),
  ]);

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