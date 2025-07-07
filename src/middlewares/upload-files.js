import multer from 'multer';
import crypto from "node:crypto";
import { TEMP_UPLOAD_DIR } from '../constants/path.js';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    cb(null, crypto.randomUUID() + '-' + file.originalname);
  },
});

export const upload = multer({ storage });