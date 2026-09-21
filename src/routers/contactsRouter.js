import {Router} from 'express';
import {
    createContactController, deleteContactController,
    getContactsByIdController,
    getContactsController,
    patchContactController, upsertContactController,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';
import {validateBody} from '../validation/validateBody.js';
import {createContactSchema, updateContactSchema} from '../validation/validationSchemaContact.js';
import {isValidId} from '../middlewares/isValidId.js';
import {authenticate} from "../middlewares/authenticate.js";

const routerContacts = Router();

routerContacts.use(authenticate);

routerContacts.get('/', ctrlWrapper(getContactsController));

routerContacts.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

routerContacts.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

routerContacts.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

routerContacts.put('/:contactId', isValidId, validateBody(createContactSchema), ctrlWrapper(upsertContactController));

routerContacts.patch('/:contactId', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));

export default routerContacts;