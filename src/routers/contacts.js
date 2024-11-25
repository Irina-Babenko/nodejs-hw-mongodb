import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidid.js';
import { authenticate } from '../middlewares/authenticate.js';

import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';

import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(contactsControllers.addContactsController),
);

contactsRouter.patch(
  '/:id',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(contactsControllers.patchContactsController),
);

contactsRouter.delete(
  '/:id',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactsController),
);

export default contactsRouter;
