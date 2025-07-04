import nodemailer from 'nodemailer';
import { getEnvVar} from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/envVar.js';
import createHttpError from 'http-errors';

const transporter = nodemailer.createTransport({
  host: getEnvVar(ENV_VARS.SMTP_HOST),
  port: Number(getEnvVar(ENV_VARS.SMTP_PORT)),
  auth: {
    user: getEnvVar(ENV_VARS.SMTP_USER),
    pass: getEnvVar(ENV_VARS.SMTP_PASSWORD),
  },
});

export const sendEmail = async ({ email, html, subject }) => {
  try {
    console.log(" send email with: ", email, html, subject);
    await transporter.sendMail({
      to: email,
      html,
      subject,
      from: getEnvVar(ENV_VARS.SMTP_FROM),
    });
  } catch (err) {
    console.error(err);
    throw createHttpError(500, 'Failed to send email');
  }
};
