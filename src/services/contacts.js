import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/filter.js';

export const getContacts = async ({
  page = 1,
  perPage,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }
  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async ({ id, userId }) => {
  return await ContactCollection.findOne({ _id: id, userId });
};

export const addContacts = (payload) => {
  return ContactCollection.create(payload);
};

export const updateContact = async ({ _id, userId }, payload, options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(
    { _id, userId },
    payload,
    {
      ...options,
      new: true,
      includeResultMetadata: true,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
  };
};

export const deleteContact = ({ _id, userId }) => {
  return ContactCollection.findOneAndDelete({ _id, userId });
};
