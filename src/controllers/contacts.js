import { getAllContacts, getContactById } from '../services/contactService.js';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();

    res.json({
      status: 200,
      message: 'Successfully found students!',
      data: contacts,
    });
  } catch (e) {
    next(e);
  }

};

export const getContactsByIdController = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await getContactById(contactId);

    if (!contact) {
      next(new Error(`Contact not found`));
      return;
    }
    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });

  } catch (e) {
    next(e);
  }


};