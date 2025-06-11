import { Router } from "express";
import {
  createContactController,
  getContactsByIdController,
  getContactsController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactsByIdController));

router.post('/', ctrlWrapper(createContactController));

router.patch('/:contactId', ctrlWrapper(patchContactController));

export default router;