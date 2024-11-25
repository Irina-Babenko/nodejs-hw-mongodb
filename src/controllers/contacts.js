import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';

// import { contactsAddSchema } from '../validation/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParamse.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseContactsFilterParamse.js';

// import { sortByList } from '../db/models/Contacts.js';
// import { parseContactsFilterParams } from '../utils/parseContactsFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;
  filter.userId = userId;

  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactServices.addContacts({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactServices.getContactsById(id);

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactsController = async (req, res, next) => {
  try {
    const { id: _id } = req.params;
    const result = await contactServices.updateContact(_id, req.body);

    if (!result) {
      throw createHttpError(404, 'Contact not found');
    }

    res.json({
      status: 200,
      message: 'Contact patched successfully',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactsController = async (req, res, next) => {
  try {
    const { id: _id } = req.params;

    const data = await contactServices.deleteContact({ _id });

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
