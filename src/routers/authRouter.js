import {Router} from "express";
import {loginUserSchema, registerUserSchema} from "../validation/validationSchemaAuth.js";
import {validateBody} from "../validation/validateBody.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {
    loginUserController,
    logoutUserController,
    refreshUserSessionController,
    registerUserController, requestResetPasswordByEmailController,
} from '../controllers/authControllers.js';
import { requestResetPasswordByEmailSchema } from '../db/models/requestResetPasswordByEmailSchema.js';

const authRouter = Router();

authRouter.post(
    '/register',
    validateBody(registerUserSchema),
    ctrlWrapper(registerUserController),
);
authRouter.post('/login', validateBody(loginUserSchema),ctrlWrapper(loginUserController),
);

authRouter.post('/logout', ctrlWrapper(logoutUserController));

authRouter.post('/refresh', ctrlWrapper(refreshUserSessionController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordByEmailSchema),
  ctrlWrapper(requestResetPasswordByEmailController),
);

export default authRouter;