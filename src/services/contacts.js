import ContactsCollection from '../db/models/Contact.js';

export const getContacts = () => ContactsCollection.find();

export const getContactsById = (id) => ContactsCollection.findById(id);

export const addContacts = (payload) => ContactsCollection.create(payload);

export const updateContact = async (_id, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    { _id },
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
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteContact = (filter) =>
  ContactsCollection.findOneAndDelete(filter);
