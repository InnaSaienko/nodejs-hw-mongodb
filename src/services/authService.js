import { UsersCollection } from '../db/models/userSchema.js';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import createHttpError from 'http-errors';
import { SessionsCollection } from '../db/models/sessionSchema.js';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/timeConstants.js';
import jwt from 'jsonwebtoken';
import { getEnvVar } from '../utils/getEnvVar.js';
import { ENV_VARS } from '../constants/envVar.js';
import { sendEmail } from '../utils/sendMail.js';
import Handlebars from 'handlebars';
import * as path from 'node:path';
import fs from 'fs/promises';
import { TEMPLATE_DIR } from '../constants/path.js';

const createSession = () => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  };
};

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({ email: payload.email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Password doesn\'t match');
  }

  await SessionsCollection.deleteOne({ userId: user._id });
  const session = await SessionsCollection.create({ userId: user._id, ...createSession() });

  return session;
};

export const logoutUser = async (sessionId, refreshToken) => {
  await SessionsCollection.findOneAndDelete({ _id: sessionId, refreshToken });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionsCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await SessionsCollection.deleteOne({ _id: sessionId, refreshToken });

  return await SessionsCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const requestResetPasswordByEmail = async (email) => {
  const user = await UsersCollection.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Can\'t reset password for this user');
  }

  const token = jwt.sign(
    {
      sub: user._id,
      email: user.email,
      role: user.role,
    },
    getEnvVar(ENV_VARS.JWT_SECRET),
    {
      expiresIn: '15m',
    },
  );
  const filePath = path.join(TEMPLATE_DIR, 'resetPasswordByEmailTemplate.html');
  const fileContent = await fs.readFile(filePath, 'utf-8');

  const template = Handlebars.compile(fileContent);
  const html = template({
    name: user.name,
    link: `${getEnvVar(ENV_VARS.APP_DOMAIN)}/reset-password?token=${token}`,
  });
  await sendEmail({ email, html, subject: 'Reset your password!' });
};