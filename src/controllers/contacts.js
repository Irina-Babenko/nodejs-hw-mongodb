import createHttpError from 'http-errors';

import * as contactsServices from '../services/contacts.js';

import { parsePaginationParamse } from '../utils/parsePaginationParamse.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParamse(req.query);
  const data = await contactsServices.getContacts(page, perPage);

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const addContactsController = async (req, res) => {
  const data = await contactsServices.addContacts(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const getContactsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await contactsServices.getContactsById(id);

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
    const result = await contactsServices.updateContact(_id, req.body);

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

    const data = await contactsServices.deleteContact({ _id });

    if (!data) {
      throw createHttpError(404, 'Contact not found');
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
