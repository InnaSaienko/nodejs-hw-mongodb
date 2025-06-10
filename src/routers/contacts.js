import { Router } from "express";
import { getContactsByIdController, getContactsController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../middlewares/errorHandler.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactsId', ctrlWrapper(getContactsByIdController));

export default router;