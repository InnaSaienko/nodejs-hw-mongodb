import * as path from 'node:path';
import * as fs from 'node:fs';
import { TEMPLATE_DIR } from '../constants/path.js';

export const resetPasswordTemplate = fs
  .readFileSync(path.join(TEMPLATE_DIR, 'reset-password-email-template.html'))
  .toString();