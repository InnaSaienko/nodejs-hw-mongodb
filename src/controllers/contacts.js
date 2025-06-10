import { createContact, getAllContacts, getContactById } from '../services/contactService.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: contacts,
    });
  } catch (err) {
    next(err);
  }

};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createHttpError(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

  } catch (err) {
    next(err);
  }
};

export const createContactController = async (req, res, next) => {
    try {
    const contact = await createContact(req.body);
    res.status(201).json({
      status: 201,
      message: `Successfully created a contact!`,
      data: contact,
    });
  } catch (err) {
    next(err);
  }
};