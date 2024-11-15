import { Schema, model } from 'mongoose';

import { contactTypeList } from '../../constants/contacts.js';

import { handlerSaveError, setUpdateSettings } from './hooks.js';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: contactTypeList,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

contactsSchema.post('save', handlerSaveError);

contactsSchema.pre('findoneAndUpdate', setUpdateSettings);

contactsSchema.post('findoneAndUpdate', handlerSaveError);

export const sortByList = ['name', 'phoneNumber', 'contactType'];

const ContactsCollection = model('contacts', contactsSchema);

export default ContactsCollection;
