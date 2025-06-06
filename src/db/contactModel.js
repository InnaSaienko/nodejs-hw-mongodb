import { model, Schema } from 'mongoose';

const contactModel = new Schema({
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: false },
      isFavourite: { type: Boolean, default: false },
      contactType: {
        type: String, enum: ['work', 'home', 'personal'], required: true, default: 'personal',
      },
    },
    { timestamps: true } // add keys and value createdAt and updatedAt
    )
;

export const ContactsList = model('contacts', contactModel);