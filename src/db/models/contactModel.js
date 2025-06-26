import mongoose from 'mongoose';

const contactModel = new mongoose.Schema({
      name: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      email: { type: String, required: false },
      isFavourite: { type: Boolean, default: false },
      contactType: {
        type: String, enum: ['work', 'home', 'personal'], required: true, default: 'personal',
      },
      userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { timestamps: true }, // add keys and value createdAt and updatedAt
  )
;

export const ContactsList = mongoose.model('contacts', contactModel);