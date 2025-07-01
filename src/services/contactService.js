import { ContactsList } from '../db/models/contactModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import createHttpError from 'http-errors';

export const getAllContacts = async ({ page, perPage, sortBy, sortOrder, filter = {}, userId }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

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

export const getContactById = async (contactId) => {
  const contact = await ContactsList.findById(contactId);
  if (!contact) {
    throw createHttpError(404, 'Student not found!');
  }
  return contact;
};

export const createContact = async (payload) => {
  const contact = await ContactsList.create(payload);
  return contact;
};

export const updateContact = async (contactId, payload) => {

  const contact = await ContactsList.findOneAndUpdate(
    { '_id': contactId }, payload,{
      new: true,
    },
  );

  if (!contact) throw createHttpError(404, 'Contact not found!');

  return contact;
};

export const deleteContactById = async (contactId) => {
  return await ContactsList.findByIdAndDelete({ _id: contactId });
};