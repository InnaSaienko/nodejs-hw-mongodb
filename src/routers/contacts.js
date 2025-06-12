import { Router } from 'express';
import {
  createContactController, deleteContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../validation/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/validationSchemaContact.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', isValidId, ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactsByIdController));

router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/:contactId', validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;