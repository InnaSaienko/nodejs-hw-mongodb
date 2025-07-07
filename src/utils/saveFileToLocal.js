import path from 'node:path';
import fs from 'node:fs';
import { getEnvVar } from './getEnvVar.js';
import { ENV_VARS } from '../constants/envVar.js';
import createHttpError from 'http-errors';
import { PERMANENT_UPLOAD_DIR } from '../constants/path.js';

export const saveFileToLocal = async (file) => {
  try {
    const newPath = path.join(PERMANENT_UPLOAD_DIR, file.filename);
    await fs.rename(file.path, newPath);

    const url = `${getEnvVar(ENV_VARS.BACKEND_DOMAIN)}/uploads/${file.filename}`;

    return url;
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to upload image to local');
  }
};